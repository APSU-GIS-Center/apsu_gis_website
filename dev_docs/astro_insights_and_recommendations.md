# Astro Insights & Recommendations (Session: 2026-02-25)

## Scope Reviewed

### Local references (`guide/astro/`)
- `guide/astro/Astro, Sitemaps, SEO, and Best Practices.md`
- `guide/astro/Best Practices for File Organization in Astro.js.md`
- `guide/astro/Optimizing Astro.js Websites for SEO_ A Guide for Developers.md`
- `guide/astro/What is Astro js framework_ a practical guide.md`
- `guide/astro/⚡ SEO for Astro_ How to Make the Fastest Framework Also the Smartest.md`

### External reference
- Repository: `understanding-astro/understanding-astro-book`
- URL: https://github.com/understanding-astro/understanding-astro-book
- Focused topics reviewed from TOC and chapter references:
  - Component/layout architecture (`ch1`, `ch2`)
  - Islands/hydration strategy (`ch3`, `ch4`)
  - Content collections and typed content workflows (`ch5`)
  - SSR decision points and API routes (`ch6`)

## Current Site Snapshot (Relevant to Recommendations)
- Astro + Tailwind + sitemap integration are already present in `astro.config.mjs`.
- Global metadata exists in `src/layouts/Layout.astro` and `src/data/global_settings.json`.
- JSON-LD organization data is present globally.
- Sitemap integration is configured (`@astrojs/sitemap`) with `site` set to a GitHub Pages domain placeholder.
- `public/robots.txt` is currently missing.
- Canonical URL source is currently static and inconsistent with `base_url` (`canonical_url` is `https://draft.apsugis.org` while `base_url` is `https://apsugis.org`).

## Key Insights Applied to APSU GIS Website

1. **Keep `<head>` behavior centralized in layouts**
   - Insight from Understanding Astro and local guides: avoid scattered meta patterns.
   - Action for this project: maintain metadata generation in `src/layouts/Layout.astro` and pass page-level overrides via props.

2. **Treat content/URLs as contracts, not ad-hoc strings**
   - Insight from DatoCMS + Astro article and content collection best practices.
   - Action for this project: centralize route/canonical helpers and reduce hardcoded URL duplication in data/components.

3. **Astro performance edge is default, but hydration discipline is where gains persist**
   - Insight from Understanding Astro islands chapters.
   - Action for this project: audit interactive components and hydrate only where needed; avoid broad client directives.

4. **SEO requires crawlability plumbing, not just fast pages**
   - Insight across all SEO references.
   - Action for this project: ensure robots, canonical consistency, page-specific metadata, and structured data coverage are complete.

5. **Content collections scale better than ad hoc markdown/data growth**
   - Insight from Understanding Astro `ch5`.
   - Action for this project: use typed collections for future News/Impact or case-study style expansion.

## Recommended Enhancements (Priority Ordered)

## Priority 1 — Technical SEO Foundation (High ROI)
1. Add `public/robots.txt` and reference sitemap(s).
2. Resolve canonical consistency:
   - Align `global_settings.base_url`
   - Replace static `canonical_url` usage with per-request/page canonical derivation (path-aware).
3. Ensure each major route has unique `title` and `description` overrides.
4. Expand JSON-LD beyond organization-level where appropriate:
   - `BreadcrumbList` for internal pages
   - `Article` for News/Impact posts
   - `Service` for key service sections

## Priority 2 — Information Architecture & Content Reliability
1. Introduce a central URL builder utility for internal route generation.
2. Define a lightweight content model for future growth:
   - news items
   - case studies
   - map/data entries
3. Add content QA checks for internal links and descriptive link text.

## Priority 3 — Performance and UX Governance
1. Run page-level Lighthouse baselines and track deltas for key pages:
   - `/`
   - `/services`
   - `/portfolio`
   - `/news-impact`
   - `/maps-data`
2. Audit any client-side interactivity for over-hydration.
3. Confirm all above-the-fold media has explicit dimensions and proper loading strategy.

## Priority 4 — Astro Capability Expansion (When Needed)
1. Consider selective SSR only for pages that truly need request-time freshness.
2. Keep most pages static for reliability and speed; avoid accidental complexity.

## Suggested Implementation Sequence
1. `public/robots.txt` + canonical cleanup + metadata uniqueness pass.
2. Structured data expansion and internal link/text audit.
3. URL builder utility + data/content model hardening.
4. Performance benchmark + hydration audit.

## Success Criteria
- Search crawlers discover all intended pages with consistent canonical signals.
- No contradictory domain signals in metadata.
- Page metadata quality is route-specific and complete.
- Internal content architecture supports growth without link drift.
- Performance remains high while preserving accessibility and APSU brand constraints.
