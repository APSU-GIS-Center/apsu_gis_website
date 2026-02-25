---
title: "Astro, Sitemaps, SEO, and Best Practices"
source: "https://www.datocms.com/blog/astro-seo-and-datocms"
published: 2025-01-10
created: 2026-02-25
description: "In this episode, let's dive into the SEO implementation behind the new website, our approach to handling the sitemap, and some big refactors in the CMS setup that were definitely worth it!"
tags:
  - "clippings"
author:
  - "DatoCMS"
---
Posted on January 10th, 2025 by Stefano Verna

This is episode 3 of the great move-to-Astro saga for our website. This also means we're reaching the point where it's probably better to be dropping a simpler TOC for you to jump between articles if you'd like, so here's everything so far!

- Chapter 1: [Why we switched to Astro (and why it might interest you)](https://www.datocms.com/blog/why-we-switched-to-astro)
- Chapter 2: [Astro, GraphQL and DatoCMS Cache Tags: how we built the killer combo](https://www.datocms.com/blog/astro-typescript-graphql-and-datocms-cache-tags)
- Chapter 3: Astro, Sitemaps, SEO, and Best Practices
- Chapter 4: *Cooking*

In this episode, let's talk about the SEO behind the website - how we approached the sitemap, how we're dynamically generating OG images, what refactors we did to maintain internal link hygiene, and how we centralize our URL generation logic.

### Sitemaps with Glob Imports

As [we’ve mentioned in earlier articles](https://www.datocms.com/blog/why-we-switched-to-astro#the-new-stack), our Astro site uses the Node adapter, meaning the final output of a build is a Node.js server generating server-side responses. As a result, existing solutions like [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/), which are designed for statically generated routes, weren’t a fit for our needs. Yet, we wanted a solution that was as simple, intuitive, and easy to maintain.

Specifically, we aimed for a pattern where adding a new section to the site would require minimal effort — ideally just copying an existing section, tweaking it, and letting the sitemap generation logic take care of the rest.

We chose to build our sitemap as a custom endpoint using Vite's [glob imports](https://vite.dev/guide/features#glob-import). By using `import.meta.glob`, we can easily scan the project, and discover/import all the Astro routes defined.

Routes without params (ie. `/company/about/index.astro`) can be added directly to the sitemap, while for dynamic routes containing placeholders (like `/blog/[slug]/index.astro`), we used a convention: each of those route must define a `buildSitemapUrls()` function, very similar in nature to the Astro's [`getStaticPaths()`](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths) function.

[Here's an example](https://github.com/datocms/astro-website/blob/main/src/pages/blog/%5Bslug%5D/_graphql.ts#L134-L150) of such function for our blog posts, querying DatoCMS for the relevant entries and generating the corresponding URLs:

```typescript
export const buildSitemapUrls: BuildSitemapUrlsFn = async (executeQueryOptions) => {
  const { entries } = await executeQueryOutsideAstro(
    graphql(
      /* GraphQL */ \`
        query BuildSitemapUrls {
          entries: allBlogPosts(first: 500) {
            ...BlogPostUrlFragment
          }
        }
      \`,
      [BlogPostUrlFragment],
    ),
    executeQueryOptions,
  );

  return entries.map(buildUrlForBlogPost);
};
```

This setup makes adding new sections a breeze. Just implement a similar `buildSitemapUrls()` function for the new route, and the sitemap will update automatically. It’s scalable, efficient, and fits perfectly with Astro’s modular nature.

Plus, [the code for the actual sitemap endpoint](https://github.com/datocms/astro-website/blob/main/src/pages/sitemap.xml.ts) is less than 100 lines of code!

### SEO Page Metadata

DatoCMS simplifies much of the SEO metadata generation for your website, [offering built-in tools to streamline the process](https://www.datocms.com/docs/astro/seo-management). By adding an SEO field to your models and querying the `_seoMetaTags` field through GraphQL, you can access a structured set of metadata that corresponds to SEO tags. Using the [`@datocms/astro` `<Seo />` component](https://github.com/datocms/astro-datocms/tree/main/src/Seo), you can effortlessly render these tags in your Astro pages.

However, some scenarios require additional customization:

- **Pages without associated DatoCMS records:** You must manually create the metadata.
- **Overriding metadata coming from DatoCMS:** Certain pages might need custom social sharing images or specially crafted titles/descriptions. Instead of asking content editors to provide these manually, you can generate them programmatically. It's the case of pages like our [Agency Partner profiles](https://www.datocms.com/partners/november-five).

To address these needs, we developed [a set of utility functions](https://github.com/datocms/astro-website/blob/main/src/lib/datocms/seo.ts) allowing to modify metadata fetched from DatoCMS, or even build metadata from scratch for pages without associated records. This ensures a consistent approach across the site. This snippet is taken from the [code of our Agency Partner profile component](https://github.com/datocms/astro-website/blob/main/src/pages/partners/%5BpartnerSlug%5D/index.astro#L47-L58) and shows how we use them:

```jsx
---

const query = graphql(
  /* GraphQL */ \`
    query PartnerQuery($partnerSlug: String!) {
      page: partner(filter: { slug: { eq: $partnerSlug } }) {
        _seoMetaTags {
          ...TagFragment
        }
        # other data required for the page
      }
    }
  \`,
  [TagFragment]
);

const { page } = await executeQuery(Astro, query, { variables: { partnerSlug: Astro.params.partnerSlug! } });

if (!page) {
  return notFoundResponse();
}

---

<Layout
  seo={overrideSeo(
    // start from SEO metadata coming from the record...
    page._seoMetaTags,
    // and then override some SEO tags:
    seoPageTitle(page.name, 'DatoCMS Partners'),
    seoDescription(page.shortDescription),
    seoGeneratedCard(Astro, {
      kicker: \`DatoCMS Agency Partners: ${page.name}\`,
      excerpt: page.shortDescription,
      pills: [\`${page.projects.length} showcased projects\`],
      logoPngUrl: page.logo.pngUrl,
    }),
  )}
>
  {/* Page content */}
</Layout>;
```

### Dynamic OG Card Images

You might have spotted an interesting `seoGeneratedCard()` function in the snippet above — one of the coolest features we've implemented is a dynamic OG card generator. We created an [Astro endpoint](https://github.com/datocms/astro-website/blob/main/src/pages/og-card/index.png.ts) that accepts configuration parameters through a base64-encoded JSON string and returns custom Open Graph images:

```plaintext
https://www.datocms.com/og-card.png?data=<base64(JSON.stringify(configuration))>
```

The configuration object supports several parameters that let us create rich, dynamic preview cards. Here's a real example we use for our partner pages:

```json
{
  "kicker": "DatoCMS Agency Partners: November Five",
  "excerpt": "MADE TO MOVE\\n\\nDigital solution partner for experience minded leaders.",
  "pills": ["2 showcased projects"],
  "logoPngUrl": "https://www.datocms-assets.com/205/1694523317-logo_n5.svg"
}
```

And this are a couple of examples of the final result:

![](https://www.datocms-assets.com/205/1736430242-ogcards.png?auto=format&dpr=0.25&w=1000)

Under the hood, we're using Vercel's fantastic [`satori`](https://github.com/vercel/satori) library combined with [`sharp`](https://github.com/lovell/sharp) for image processing. Satori is a game-changer — without having to spin up heavy headless browsers, it can convert HTML and CSS into SVG files which we then transform into stunning PNG images. 💫

The best part? Since these images are generated on-demand, they're always perfectly synchronized with your content. No more outdated social previews!

### Keeping Links at Bay

If you’ve managed a medium-to-large website, you know the struggle: invalid links cropping up over time, breaking the user experience and tanking your SEO efforts. Like many others, we had accumulated [hundreds of scary redirect rules](https://github.com/datocms/new-website/blob/master/redirects.js) over the years to patch the issue.

With this site rewrite, we decided to eliminate the problem at its source, leveraging DatoCMS’s built-in tools and a bit of automation.

##### The power of Referential Integrity in DatoCMS

DatoCMS’s ["Link to records" functionality in Structured Text fields](https://www.datocms.com/docs/content-modelling/structured-text#linking-records) is a game-changer. Instead of relying on fragile hardcoded URLs, we now link directly to records within the CMS.

This approach, which we call **Content Referential Integrity**, ensures that relationships between content pieces are always valid and consistent.

Here’s why this is so powerful:

1. **Validity of References:** Links between records are validated automatically. If a record is deleted or becomes inaccessible, DatoCMS ensures that no dangling references remain.
2. **Error Prevention:** Records with dependencies cannot be deleted without resolving those dependencies first. For example, if a blog post links to another record, you’ll be prompted to update or remove the reference before deletion.
3. **Data Consistency:** Changes to a referenced record — like its URL or identifier — are immediately reflected in all associated content. This eliminates the need to manually track and update links across the site.

##### Automation to ensure link accuracy

We took this one step further by building [a bot powered by DatoCMS webhooks](https://github.com/datocms/astro-website/blob/main/src/pages/api/normalize-structured-text/index.ts). This bot listens for changes to Structured Text fields and automatically replaces internal textual links with direct references to records when possible. It also prevents editors from adding links to non-existent internal pages, enforcing continued integrity of our content:

What you're seeing in the video is the Structured Text field being updated by adding an internal URL to a datocms.com page and being saved. Right after, the bot does its thing and converts it into an in-line link matching the corresponding record to ensure future integrity if and when the slug were to change.

##### Centralized URL generation

Another key to maintaining long-term consistency was centralizing the logic for URL generation. Instead of scattering hardcoded URLs across components, we built a reusable system for deriving URLs from records.

Here’s an example of how we handle [blog post URLs](https://github.com/datocms/astro-website/blob/main/src/lib/datocms/gqlUrlBuilder/blogPost.ts):

```typescript
// GraphQL fragment for retrieving the required data
export const BlogPostUrlFragment = graphql(/* GraphQL */ \`
  fragment BlogPostUrlFragment on BlogPostRecord {
    slug
  }
\`);

// Helper function for building URLs
export function buildUrlForBlogPost(blogPost: FragmentOf<typeof BlogPostUrlFragment>) {
  const data = readFragment(BlogPostUrlFragment, blogPost);
  return \`/blog/${data.slug}\`;
}
```

This centralized approach ensures consistency, even as the data model evolves. Need to change the structure of blog post URLs? Update it in one place, and the change propagates across the entire codebase.

##### The Results

Setting up this system required some initial effort, but the benefits have been substantial. By eliminating hardcoded links, automating referential checks, and centralizing URL logic, we’ve ensured that our site remains resilient, maintainable, and SEO-friendly over time.

And that's it for this one! Stay tuned for when the next episode drops ✌️

## Want more?

Check out other recent stories we've written on our blog[![](https://www.datocms-assets.com/205/1734449299-cover.png?auto=format&dpr=0.25&fit=crop&h=400&w=600)](https://www.datocms.com/blog/a-look-back-at-2024)

[

A look back at 2024

December 18th, 2024

](https://www.datocms.com/blog/a-look-back-at-2024)[

![](https://www.datocms-assets.com/205/1745391209-headless.png?auto=format&dpr=0.25&fit=crop&h=400&w=600)

The ol' Headless vs. WP Debate. A '25 refresher.

April 26th, 2025

](https://www.datocms.com/blog/datocms-vs-wordpress-2025)