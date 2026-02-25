---
title: "What is Astro js framework: a practical guide"
source: "https://bejamas.com/hub/tutorials/practical-guide-to-astro-js-framework"
published:
created: 2026-02-25
description: "Learn Astro js by creating a blog using this modern JavaScript framework and static site generator. Find the benefits of using Astro in web development."
tags:
  - "clippings"
author:
  - "Bejamas"
---
November 18, 2024

16 min

## What is Astro JS Framework: A Practical Guide To Building Faster Websites

MS

Mojtaba Seyedi Content Writer

In this practical guide to Astro, I will walk you through the setup process and show you how to structure your files. You'll learn how to add pages, interactive components, and even markdown posts. I'll also show you how to fetch data from a server, create layouts, and add interactivity using vanilla JavaScript and other frameworks. And get ready for some hands-on fun because we're going to create a small instance of Bejamas website together. We'll be building a multi-page website, including a blog.

By the end of this post, you'll have a good understanding of how Astro works and how you can use it to create efficient websites faster. Let's go!

## What is Astro JS?

As developers, we know that creating a great user experience is key when building a website. And what do users love more than anything? Fast websites that don't waste their time. With Astro, we can achieve that by shipping less code to the browser.

We all have our favorite UI frameworks that make our lives easier, but they can come at the cost of a heavy website. But with Astro, we can have the best of both worlds. It allows us to build our website with our favorite framework and even multiple frameworks at the same time, but it renders them to static HTML at build time. Therefore, we can create a fast website for our users without sacrificing the modern developer experience.

But Astro doesn't just stop there. It also allows us to opt-in to dynamic, client-side JavaScript as needed, meaning we can have interactive components on our website, but only when necessary. In other words, Astro allows you to start simple and add complexity where needed.

In short, Astro is a powerful framework that supports both static site generation (SSG) and server-side rendering (SSR) to help us build fast, content-based websites while keeping the developer experience in mind. It's lightweight, efficient, and flexible, making it a suitable option for creating content-rich websites like blogs, portfolios, documentation, and some e-commerce sites. If you want to create a complex web application with a lot of interactivity, Astro might not be the right option for you. Instead, you can consider other tools like [Next.js](https://bejamas.io/discovery/static-site-generators/nextjs/).

Want to learn more about what Astro is? We have a post about [Astro](https://bejamas.io/discovery/static-site-generators/astro/) on our [Discovery hub](https://bejamas.io/discovery/).

Great, now that we have a good understanding of what Astro is and what it can do, let's dive in and see what we can build together!

## Getting Started with Astro Web Framework

First, let’s install Astro and create the project’s seed. Make sure you have Node.js version 16.12.0 or higher installed on your machine.

```
npm create astro@latest
```

If you use Yarn:

```
yarn create astro@latest
```

The CLI will ask you about the project name and whether you want to use Typescript. In addition, it will give you a few options on how you would like to set up your project. For the tutorial, I’m choosing the “an empty project” option.

Here is my mini-chat with Astro CLI:

![](https://cdn.sanity.io/images/34ent8ly/production/70d4c222074474ea0cfb7ca449b019d66b2a79a7-1200x687.jpg?w=960&h=550&fit=min&auto=format)

Once you open your project in your editor you can install Astro’s extension. Since Astro has its own file extension and syntax, you might want to install its extension for your editor. Here is the link to the [Astro extension for VSCode](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) which does much more than just highlight the syntax for you!

Now you can run your project with the following command. No need to install any dependencies.

```
npm run dev
```

Open your browser and go `http://localhost:3000` and enjoy your first view of your almost empty project.

## Astor Project Structure

Astro’s file structure is fairly straightforward.

- `src`: Your source code (components, pages, styles, etc.)
- `public`: Your assets (fonts, icons, etc.)

In the `src/pages` directory, Astro creates an `index.astro` file which you can think of as your `index.html`.

![](https://cdn.sanity.io/images/34ent8ly/production/14588f1ef4b903dd41ab0e77493aca5231d2209b-417x555.jpg?w=960&h=1278&fit=min&auto=format)

It’s important to note that, the `src/content/` is a reserved directory in Astro. [Astro v2.0](https://docs.astro.build/en/guides/upgrade-to/v2/#reserved-srccontent) introduced the Collections API for organizing your Markdown and MDX files into content collections. This API reserves `src/content/` as a special folder.

## Astro Pages

Alright, let's talk about pages in Astro. Astro pages handle routing, data loading, and overall page layout for every page on your website. They are files with different extensions that live in the `src/pages/` subdirectory.

In Astro, we have different types of pages, including.astro,.md,.mdx,.html and even.js/.ts. Each of these file types serves a different purpose and can be used in different ways to create your pages.

Astro uses a routing strategy called file-based routing, which means that each file in your `src/pages/` directory becomes an endpoint on your site based on its file path. This allows for flexibility and easy organization of your pages.

In this tutorial, we will mostly create pages with `.astro` and ` .md` files. Note that if you use.html pages some key Astro features are not supported in HTML components.

Now let’s create the second page to see how it works. All you need to do is create a file next to `index.astro` in the `src/pages` directory.

I’m going to name it `about.astro` and write a very simple markup inside of it:

```
<html lang="en">

  <head>

    <meta charset="utf-8" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <meta name="viewport" content="width=device-width" />

    <title>About</title>

  </head>

  <body>

    <h1>About</h1>

    <p>Jamstack development agency.</p>

  </body>

</html>
```

Now you can visit `localhost:3000/about` to see this page in your browser. As you can see the `/about` route works out of the box here as soon as you add the file to the pages folder.

You can update the content or even add your own internal style and Astro will take care of the live preview for you. So no need to install any live-reload NPM packages or those sorts of things.

To be able to navigate easily between pages I’m going to add navigation to my `index.astro` and `about.astro` files:

But you don’t want to have to update all of your pages every time you add a link to your navigation, right?

This is where the **components** come into play and help you not to repeat yourself.

## Astro Components

Astro components are the basic building blocks of any Astro project. They have two main parts:

- Component Script
- Component Template

Here is what an Astro component looks like:

```
---

// Component Script (JavaScript)

---

<!-- Component Template (HTML + JS Expressions) -->
```

Let’s add our first component to the project.

I’m going to create an `src/components` directory and add a `header.astro` file inside of it. Then, I'm moving my navigation markup into the Header component. For now, the script part of our component can stay empty.

The next step is to add the component to our pages. In order to do this, we need to import the component. So open your about.astro file and add the following import to the top of your file:

Now that the header component is imported, we can use it like this:

Do the same thing for the home page which is your index.astro file in your pages directory.

Now if you check these pages in your browser, you should see your header being just fine.

Finally, I’ll add our logo and some semantic markup to our header along with a container so I can add some styles later:

This is what’s so awesome about Astro. So far, we have made pages and added components to them without writing almost anything other than HTML.

## Adding Script to Code Fences

Code fences are the script part of your Astro component. You can use a fence to write any JavaScript you need to render your template. You can even write TypeScript!

```
---

// The code fence area

---
```

For instance, in the previous section, I added an import line to my code fence to add the Header component to my page. We will get to what else we can do in a code fence as we continue in this post.

The reason it's called code fence is that whatever JavaScript code you write in it is “fenced in” and can’t escape into the browser and get to your user's hands. Everything you write here is just there to help your components template.

Let’s get back to our pages and add a variable to the code fences of the pages for storing the page title:

As you can see in the snippet above, you can define local JavaScript variables inside the code fence and then inject the variable into the HTML template using JSX-like expressions.

Now do the same thing in your other pages like about.astro, etc.

As you look at your different pages you might start to notice something annoying again. Yes, you repeat yourself when you write the same thing in different pages. All lines of code in your pages are exactly the same except the title.

I suppose it’s a good time to talk about layouts in Astro.

## Templating with Astro Layouts

Astro layouts are just Astro components with different names that are used to create a UI structure or layout, such as a page template. Therefore anything that you can do inside a component is possible to achieve within a layout.

You can place your layout files anywhere in your project, but it's good practice to add them inside the `src/layouts` directory.

In our project, there was some shared markup across pages that could be used as a template to avoid repeating them in different files. To do that, let’s create a BaseLayout.astro file in the `src/layouts` directory.

We copy and paste the content of my `index.astro` inside this file:

![](https://cdn.sanity.io/images/34ent8ly/production/7c88763bda33a21828046432b807fe1c24c29750-1242x638.jpg?w=960&h=493&fit=min&auto=format)

You just made your first Astro layout and now you need to use it in your Astro pages. Let's see how you can do it.

Like components, the first step is to import the layout into the code fence, then use it by placing its tag in the template part. So here is what the astro.index will look like:

```
---

import BaseLayout from '../layouts/BaseLayout.astro';

---

<BaseLayout></BaseLayout>
```

If you try to do the same thing for your About page, you will notice that there is different content inside about.astro. You need to keep it or somehow pass it onto your BaseLayout file. This is where `<slot />` comes in handy.

## The <slot /> Element

The `<slot />` element is a placeholder for external HTML content. It specifies where the child elements from other files should be injected into your component template.  
  
You can add this element to your `BaseLayout.astro` file like the following code:

Now, the content of the About page can go between the `BaseLayout` tag like this:

```
---

import BaseLayout from '../layouts/BaseLayout.astro';

---

<BaseLayout>

  <p>Jamstack development agency.</p>

</BaseLayout>
```

And if you check your browser, you’ll see how both pages work with the same template but different content.

There is only one part that we messed up, the title of the pages. In my example, both titles are “Bejamas”.

Here is where [component props](https://docs.astro.build/en/core-concepts/astro-components/#component-props) come to the rescue!

## Astro Component Props

Apart from Slots, another feature of Astro components that can be very useful in layouts is Props. Any Astro component can define and receive props. By defining props apart from template parts, you make them available to scripting parts of your components through the Astro.props global.

In our example, we can define a `pageTitle` prop and pass it to our BaseLayout component to be able to have different page titles on different pages.

Here is how you can define a prop in the BaseLayout component:

Notice how we used destructuring syntax to pull out the props from the global Astro.props object. If you had more props you could use a coma like the line below:

```
const { pageTitle, pageDescription } = Astro.props;
```

Now let’s see how you can pass a prop to your component or layout.

The `index.astro` page can just pass the `pageTitle` prop as an attribute like this:

```
---

import BaseLayout from '../layouts/BaseLayout.astro';

---

<BaseLayout pageTitle="Bejamas"></BaseLayout>
```

Also, you could define a variable in your frontmatter script to be more organized. Let’s do that for our About page:

```
---

import BaseLayout from '../layouts/BaseLayout.astro';

const pageTitle = 'About';

---

<BaseLayout pageTitle={pageTitle}>

  <p>Jamstack development agency.</p>

</BaseLayout>
```

So far, I haven’t shown you any of the results. The reason has been the lack of styling, so let’s add some CSS.

## Styling in Astro

Astro projects can be styled in a number of ways, which we can't cover here. You should know, however, that Astro supports any method you can think of. You can write plain CSS, Sass, and CSS Modules or even import your favorite CSS library like Tailwind.

You can add an `<style>` tag directly to your component or page template.

Astro `<style>` CSS rules are scoped and encapsulated inside the component by default. Meaning the styles that are written in this component don’t leak and won’t impact the rest of your site.  
  
Apart from the Header component, I’ll add the rest of the styles to an external CSS file and import it as a global style in the project. We can talk more about styling in another post.

![](https://cdn.sanity.io/images/34ent8ly/production/d70a3ef4b675630333c4e08bea90e80321762198-1071x708.jpg?w=960&h=635&fit=min&auto=format)

Here is how you can import your external CSS file into your `BaseLayout.astro` file:

Before I jump to the next section, I’m going to share a working demo here. I added some static content to my Home and About pages and wrote some styles.

Here is what I added to my home page:

Here is how my homepage looks like:

![](https://cdn.sanity.io/images/34ent8ly/production/ab71866d7895a8a4bb522824d2c70a752bfb2f66-1566x864.jpg?w=960&h=530&fit=min&auto=format)

You can check out the [working demo here](https://stackblitz.com/edit/withastro-astro-nkdbmu?embed=1&file=src/layouts/BaseLayout.astro).

## Fetching Data in Astro

If you look at the design of what we are building here, you’ll notice a case study section below the header. In this part of our tutorial, we are going to use Bejamas API to fetch some data from the server and create those case study cards on our homepage.

Fetching data in Astro is super easy. You can use the global `fetch()` function in your code fences to make HTTP requests to APIs in all your components.

In `index.astro`, I’m going to add this code to fetch the case studies data from the server using the `fetch()` function:

```
---

  import BaseLayout from '../layouts/BaseLayout.astro';

  const pageTitle = 'Bejamas';

  const response = await fetch('bejamas.io/api/blog?category=case-studies');

  const data = await response.json();

  const posts = data.posts;

---
```

Now that I have the data available in the `posts` variable, I can use it to generate dynamic HTML to show the case study cards on my home page.

Here is what the `posts` array looks like:

```
"posts": [

  {

    "excerpt": "",

    "mainImage": {

      "asset": {

        "url": ""

      }

    },

    "slug": "",

    "title": ""

  }

]
```

I’ll use the `map` function to loop through the posts and create each card dynamically like this:

```
<section class="section" id="casestudies-section">

  <div class="container">

    <h2 class="section-title">Case studies</h2>

    <ul class="case-studies">

      {posts.map((post) => (

        <li>

          <article class="casestudy">

            <img src={post.mainImage.asset.url} alt="" />

            <div>

              <h3>{post.title}</h3>

              <p>{post.excerpt}</p>

              <a href={\`https://bejamas.io/blog/${post.slug}\`} class="">Read more</a>

            </div>

          </article>

        </li>

      ))}

    </ul>

  </div>

</section>
```

The coolest thing here is that all of this is happening at build time, and we will only send static HTML to the browser.

This is the result after adding style to the global CSS:

![](https://cdn.sanity.io/images/34ent8ly/production/e9b3d596d2a87aa539e47509634095ba357cca63-1920x1704.jpg?w=960&h=852&fit=min&auto=format)

You can see [the demo here](https://stackblitz.com/edit/withastro-astro-eyreix?embed=1&file=src/styles/global.css).

## Managing Content in Astro

When it comes to creating and managing your content, Astro gives you two options:

- Markdown
- MDX

MDX is similar to standard Markdown but with extra features. It allows you to use variables, JSX expressions, and components within your Markdown content.

Astro has built-in support for Markdown, but for working with `.mdx` files, you need to install the [@astrojs/mdx integration](https://docs.astro.build/en/guides/integrations-guide/mdx/). In this tutorial, we stick with standard Markdown content.

Before we go further, it’s important to mention that Astro v2 introduced [Content Collections](https://docs.astro.build/en/guides/content-collections/), which is an excellent way to organize your content in an Astro project. We will write more about this topic in future tutorials.

As we said earlier, because of how static routing works in Astro, any entry inside the `src/pages/` directory gets a route. This means you can open it in your browser or link to it anywhere in your project. Also, we know that Markdown files are a page type in Astro that we can place inside that directory. Keeping this information in mind, let’s create our first content inside the `src/pages` directory.

To be more organized, I created a blog folder to keep my.md files there and added my first Markdown content to it:

![](https://cdn.sanity.io/images/34ent8ly/production/15669e498eb6262f8807a5a5d231b53919e7dde8-1056x663.jpg?w=960&h=603&fit=min&auto=format)

Since Astro components (.astro) and Markdown files (.md) in the `src/pages` directory automatically become pages on your website, you can simply navigate to the following URL and visit your first blog post!

```
localhost:3000/blog/jamstack
```

You can add more information about your content, such as its title, publish date, main image, etc. in the frontmatter of your Markdown like the following:

```
---

title: 'Jamstack Explained'

pubDate: 2020-12-14

description: 'Jamstack is not about a specific technology…'

author: 'Denis Kostrzewa'

image:

    url: 'https://bejamas.io/_next/image/?...' 

    alt: 'Jamstack Explained Photo'

---

# Jamstack Explained

Jamstack is no longer a buzzword over which dev keyword warriors brawl. It has grown to become a booming ecosystem of tools helping developers ship performant websites, progressive web apps, and other projects with benefits too good to ignore.
```

You certainly do not want your post to look like that and would like to incorporate your website design into it, right? Let’s create a layout for the content of our blog.

Add a file named `BlogLayout.astro` to the `src/layouts` directory and copy and paste the following code into it:

Notice how we passed the `frontmatter` properties to this layout using `Astro.props`. Now you can add any of these properties to your template in any way you like.

Also, notice the slot element. This is where any content below the frontmatter of your Markdown file will appear on your final HTML page.

There is one more step. We need to add this layout to our content, so we go back to our first Markdown file and do it like the following code:

```
---

layout: ../../layouts/BlogLayout.astro

title: 'Jamstack Explained'

pubDate: 2020-12-14

description: 'Jamstack is not about a specific technology…'

author: 'Denis Kostrzewa'

image:

    url: 'https://bejamas.io/_next/image/?...' 

    alt: 'Jamstack Explained Photo'

---

# Jamstack Explained

Jamstack is no longer a buzzword over which dev keyword warriors brawl. It has grown to become a booming ecosystem of tools helping developers ship performant websites, progressive web apps, and other projects with benefits too good to ignore.
```

As you can see in the first line of code, Astro has a special frontmatter `layout` property for Markdown pages. This property defines a relative path to an Astro layout component.

Check your browser preview again at `localhost:3000/blog/jamstack` and see what the layout has added to your page.

## Nesting layouts

Did you notice that, again, we had to add the `<head>` and `<body>` tags to our `BlogLayout.astro` layout? Can’t we just use our BaseLayout for this?

Since Astor layouts are basically components, we can nest them. So all we need to do is add our BaseLayout to the new `BlogLayout.astro` file:

```
---

import BaseLayout from "./BaseLayout.astro";

const { frontmatter } = Astro.props;

---

<BaseLayout pageTitle={frontmatter.title}>

  <div class="container">

    <div class="meta">

      <div>    

        <time class="date">{frontmatter.pubDate.slice(0, 10)}</time>

        <h1 class="title">{frontmatter.title}</h1>

        <p class="description">{frontmatter.description}</p>

        <span class="author">Author: <span class="author-name">{frontmatter.author}</span></span>

      </div>

      <img class="poster" src={frontmatter.image.url}  alt={frontmatter.image.alt} />

    </div>  

    <div class="body">

      <slot />

    </div>

  </div>

</BaseLayout>
```

How neat, isn't it?

  
Also, notice how we passed the title of our page to be the page title in our BaseLayout:

```
<BaseLayout pageTitle={frontmatter.title}>
```

Let’s add some styles to the BlogLayout to make it look more like our post at [Bejamas.io](https://bejamas.io/blog/jamstack/). I’m going to add scoped styles to the `BlogLayout.astro` file:

```
---

import BaseLayout from "./BaseLayout.astro";

const { frontmatter } = Astro.props;

---

<style>

  .container {

    padding: 3rem 0;

    max-width: 1152px;

  }

  .meta {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 2rem;

  }

  /* And more... */

</style>

<BaseLayout pageTitle={frontmatter.title}>

  <!-- ... -->

</BaseLayout>
```

The is how the blog posts look like now:

![](https://cdn.sanity.io/images/34ent8ly/production/070c4e37902a9d70793d8869b97ece4f0f182e91-1920x1682.jpg?w=960&h=841&fit=min&auto=format)

The last thing we need to do is show these posts on our home page.

## Loading Local Files Using Astro.glob()

Add more blog posts to your blog directory, so we can create a list of them on our homepage.

`Astro.glob()` allows you to load local files into your static page. It will return an array of objects, one for each blog post, containing all the information about your Markdown files.

This is how you can use it in your `index.astro` file:

```
---

  const blogs = await Astro.glob('../pages/blog/*.md');

---
```

To generate the entire list of posts dynamically, we map over the blogs array returned by `Astro.glob()` like the following code:

```
<section class="section blog-section" id="blog-section">

  <div class="container">

    <h2 class="section-title">Our Blog</h2>

    <ul class="blogs">

      {blogs.map((blog) =>

        <li>

          <article class="blog">          

            <img src={blog.frontmatter.image.url} alt="blog.frontmatter.image.alt" />

            <h3>{blog.frontmatter.title}</h3>

            <p>{blog.frontmatter.description}</p>

            <a href={blog.url} class="">Read more</a>

          </article>            

        </li>

      )}

    </ul>

  </div>

</section>
```

We added this file below the case study section in our `index.astro` file.

Revisit your home page in your browser preview and enjoy your list of blog posts at the bottom of the page. After adding some styles to the `global.css`, this is how mine looks like:

![](https://cdn.sanity.io/images/34ent8ly/production/6c219d00e9a130db4ec71794e8fb8c92f14a7e08-1920x2618.jpg?w=960&h=1309&fit=min&auto=format)

If you click on the "Read more" links, you will see the content of each post.  
  
[Here is a demo](https://stackblitz.com/edit/withastro-astro-zszfry?ctl=1&embed=1&view=preview) of our project so far.

## Adding Scripts in Astro

You can add interactivity to your Astro components using standard HTML `<script>` tags. This allows you to send JavaScript to run in the browser and add functionality to your Astro components. For instance, for a toggle to switch the light mode to dark, you don’t need a JavaScript framework, and you can handle it using plain JavaScript.  
  
In `.astro` files, you can add client-side JavaScript in the same standard ways you can do in an HTML file:

```
<script>

  console.log('Print this to the browser console');

</script>

<!-- relative path to script at \`src/scripts/local.js\` -->

<script src="../scripts/local.js"></script>

<!-- also works for local TypeScript files -->

<script src="./script-with-types.ts"></script>

<script is:inline src="https://my-extenrnal-script.com/script.js"></script>
```

All the scripts you add will be processed and bundled in Astro and then injected into your page’s page’s `<head>` with `type="module"`.

If you want to avoid bundling the script, you can use the `is:inline` directive as you see in the last example below that imports an external file.

## How to Use UI Framework Components in Astro

One of the most compelling features of Astro is its flexibility to integrate with your favorite JS frameworks. And you don’t have to use only one framework. You can work with more than one.

In our project, I wanted to add a FAQ section at the bottom of the home page. I didn’t have much time and just wanted to use someone else's work to be able to create my page as soon as possible. I searched for an FAQ React component, and some links came up.

This is how you can add a React component to your project.

First, you need to add React to your project. Run the following command in your terminal:

```
npx astro add react
```

You can simply write your own React component in your project by adding a `.jsx` file in the `src/components` directory.  
  
Since I want to import a React component instead of writing it myself, I need to add it to my project first.  
  
So I’ll install the package using my terminal:

```
npm install react-faq-component
```

I’ll add `FAQ.jsx` and `FAQ.css` files to my `components` directory and customize a little bit the component that I have imported:

```
import React, { useEffect, useState } from 'react';

import Faq from 'react-faq-component';

import './FAQ.css';

const data = {

  rows: [],

};

const styles = {};

const config = {};

export default function FAQ() {

  return <div>

            <Faq

                data={data}

                styles={styles}

                config={config}

            />

        </div>;

}
```

Once you have your component ready, you need to import it to your page:

```
---

  import BaseLayout from '../layouts/BaseLayout.astro';

  import Faq from '../components/FAQ.jsx';

  const pageTitle = "Bejamas";

---
```

And then use it wherever you want in your template:

```
<section class="section" id="faq-section">

  <h2 class="section-title">Questions you probably want to ask</h2>

  <div class="container faq-container">

    <Faq />

  </div>

</section>
```

This is the result:

![](https://cdn.sanity.io/images/34ent8ly/production/dacf6f4bc39a4cb60ef4f23657c789be7e6d3d22-1920x1925.jpg?w=960&h=963&fit=min&auto=format)

If you check your preview in the browser, you will notice that the component has been rendered on your page. However, it has no interactivity. Since the actions don’t work, you can’t open the items when you click the button.  
  
I’ll show you what we need in the next section.

## Directives in Astro

As you saw in our last example, the component was added to the page, but it didn’t work. This happens because, by default, your framework components will only render on the server as static HTML, so, for example, your click handler or state hooks won’t work. This is very useful for adding components that are not interactive and avoids sending any unnecessary JavaScript to the client.

You can make a framework component interactive (hydrated) by adding [Astro directives](https://docs.astro.build/en/reference/directives-reference/#client-directives). These component attributes specify when your component’s JavaScript should be sent to the browser.

I’ll list some of the Astro directives here:

- `<Faq client:load />` renders the component on page load.
- `<Faq client:idle />` renders the component as soon as the browser has some free time.
- `<Faq client:visible />` renders the component only once it is scrolled into view.
- `<Faq client:media="{media query here}" />` renders the component only if the media query applies.
- `<Faq client:only="react" />` only renders this component on the client, and doesn’t server-render it into static HTML.

If you don’t add any of these to your component like in our last example, an HTML-only version of the component will be rendered in the browser, so any click handlers or state won’t work.

I want to load my FAQ component on page load so this is what I need:

```
<Faq client:load />
```

Note that all this comes from [Island Architecture](https://docs.astro.build/en/concepts/islands/) in Astro.

At last, here is our [final working demo](https://stackblitz.com/edit/bejamas-astro-demo?embed=1&file=README.md&view=preview).

## Building and Deploying Your Astro project

Astro sites are static sites out of the box. This means that all pages are static HTML at the end. So your first option for deploying your site if you own a server is just to upload your final HTML files to your server.

Before you can deploy your website, you need to build it. To do this, you'll need to run the build command from the root directory of your Astro project. You can do this by running the following command in your terminal:

```
npm run build
```

The final build of your project will be stored in the `dist` folder by default. So, all you need to do is upload your `dist` directory to your server.  
Manually deploying your website is not the preferred method nowadays. There are tons of tools and services that automate the whole workflow for you. All you need to do is push your changes, and they will build and deploy the project for you.

You can follow [the guides on the Astro website](https://docs.astro.build/en/guides/deploy/) to see how you can deploy your project on different deployment services such as Netlify, Vercel, Deno, etc.  

## Conclusion

In conclusion, the rise of JavaScript frameworks has given us, as web developers, so much power and rich experiences. We love using these frameworks because they make it easy to create components, share, and reuse them. The tooling around building with frameworks like Vue, React, and Svelte is top-notch. However, the cost of using these frameworks is often shipping a lot of JavaScript with our pages, even for simple static content.

With Astro, we get the benefits of both worlds. We can still write dynamic content using JSX and JavaScript, but Astro renders it all to static HTML, so we only load the JavaScript we really need. This way, our users have a fast and seamless experience while we still get to enjoy all the benefits of working with dynamic frameworks. It's a win-win situation for users and developers!