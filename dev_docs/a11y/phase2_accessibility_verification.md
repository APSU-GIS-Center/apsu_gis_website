# Phase 2 Accessibility Verification (axe + Lighthouse + Manual)

Date: 2026-02-25
Environment: local dev server at `http://127.0.0.1:4321`

## Scope
Key routes verified:
- `/`
- `/services`
- `/maps-data`
- `/news-impact`
- `/contact`

## Pre-Verification Stabilization
During initial scans, dev error overlays invalidated home-page results. Two runtime issues were fixed first:
- `src/components/NewsletterSignup.astro`: replaced unsupported `on:submit` handler with inline listener.
- `src/components/DonationButton.astro`: replaced unsupported `on:click` handler with inline listener.

## Automated Results

### axe-core CLI
Command:
`npx -y @axe-core/cli http://127.0.0.1:4321/ http://127.0.0.1:4321/services http://127.0.0.1:4321/maps-data http://127.0.0.1:4321/news-impact http://127.0.0.1:4321/contact --save phase2-axe.json --dir dev_docs/a11y`

Output file:
- `dev_docs/a11y/phase2-axe.json`

Summary by route:
- `/`: `color-contrast`, `heading-order`, `landmark-complementary-is-top-level`
- `/services`: `landmark-complementary-is-top-level`
- `/maps-data`: `heading-order`, `landmark-complementary-is-top-level`
- `/news-impact`: `color-contrast`, `landmark-complementary-is-top-level`
- `/contact`: `landmark-complementary-is-top-level`

### Lighthouse (Accessibility category)
Reports directory:
- `dev_docs/a11y/lighthouse/`

Scores:
- `/` (`home.json`): **94** — fails: `color-contrast`, `heading-order`
- `/services` (`services.json`): **100**
- `/maps-data` (`maps-data.json`): **98** — fails: `heading-order`, `label-content-name-mismatch`
- `/news-impact` (`news-impact.json`): **95** — fails: `color-contrast`
- `/contact` (`contact.json`): **100**

## Phase 2 Remediation (Top Failures)
Code changes applied:
- `src/components/ImpactMetrics.astro`
	- Improved metric value contrast by changing low-contrast red value text to high-contrast white on dark surface.
- `src/components/Dashboard.astro`
	- Added an explicit section heading (`h2`, screen-reader visible) so card headings (`h3`) follow valid hierarchy.
- `src/pages/news-impact.astro`
	- Increased contrast for category chips and awards area text/icon treatment.
- `src/pages/maps-data.astro`
	- Added a section `h2` before county card headings to resolve heading-order.
	- Removed mismatched `aria-label` usage and used `aria-describedby` for the shared new-tab cue.

## Delta Re-Run Results (Post-Remediation)

### axe-core CLI (post-fix)
Command:
`npx -y @axe-core/cli http://127.0.0.1:4321/ http://127.0.0.1:4321/services http://127.0.0.1:4321/maps-data http://127.0.0.1:4321/news-impact http://127.0.0.1:4321/contact --save phase2-axe-postfix.json --dir dev_docs/a11y`

Output file:
- `dev_docs/a11y/phase2-axe-postfix.json`

Route deltas:
- `/`: violations `3 -> 1` (resolved: `color-contrast`, `heading-order`; remaining: `landmark-complementary-is-top-level`)
- `/services`: violations `1 -> 1` (remaining: `landmark-complementary-is-top-level`)
- `/maps-data`: violations `2 -> 1` (resolved: `heading-order`; remaining: `landmark-complementary-is-top-level`)
- `/news-impact`: violations `2 -> 1` (resolved: `color-contrast`; remaining: `landmark-complementary-is-top-level`)
- `/contact`: violations `1 -> 1` (remaining: `landmark-complementary-is-top-level`)

### Lighthouse (Accessibility category, post-fix)
Reports directory:
- `dev_docs/a11y/lighthouse-postfix/`

Score deltas:
- `/` (`home.json`): **94 -> 100** (resolved: `color-contrast`, `heading-order`)
- `/services` (`services.json`): **100 -> 100**
- `/maps-data` (`maps-data.json`): **98 -> 100** (resolved: `heading-order`, `label-content-name-mismatch`)
- `/news-impact` (`news-impact.json`): **95 -> 100** (resolved: `color-contrast`)
- `/contact` (`contact.json`): **100 -> 100**

## Manual Verification Checklist (Keyboard + Screen Reader)
Status key: `[ ] not run` `[~] in progress` `[x] pass` `[!] fail`

### Global keyboard checks
- [ ] `Tab` from top reaches skip link and activates to main content.
- [ ] Focus order is logical across header navigation and page body.
- [ ] All interactive controls are operable with keyboard only (`Enter`/`Space` where applicable).
- [ ] Focus indicator remains visible on all controls in default/hover/focus states.
- [ ] No keyboard trap appears in menus, forms, or modal interactions.

### Landmark and structure checks
- [ ] Exactly one banner/header landmark is announced on each page.
- [ ] Main content is within `main` and reachable after skip-link activation.
- [ ] Any `aside` landmarks are top-level and semantically intentional.
- [ ] Heading levels progress semantically (`h1 -> h2 -> h3`) without skips.

### Form checks
- [ ] Contact form fields announce labels, required state, and autocomplete intent.
- [ ] Newsletter email field announces an explicit accessible name.
- [ ] Validation errors (if triggered) are announced and focus-guided.

### Link and button checks
- [ ] External links opening new tabs announce this behavior.
- [ ] Icon-only or icon-adjacent controls expose clear accessible names.
- [ ] Name/role/value for all buttons and links match visible labels.

### Screen reader spot checks (NVDA/JAWS/VoiceOver)
- [ ] Home page: quick-nav landmarks list is concise and unique.
- [ ] Maps/Data cards: headings and link names are announced clearly.
- [ ] News/Impact cards: low-contrast text is readable at normal zoom.
- [ ] Contact page: section headings and contact methods are announced in order.

## Prioritized Follow-Ups
1. Evaluate `aside` usage producing `landmark-complementary-is-top-level` across routes.
2. Execute manual keyboard and screen-reader checklist and record pass/fail outcomes.
3. Re-run full audit suite after any landmark-structure updates.

## Known Environment Constraints
- `pnpm build` still fails in this environment due permissions on `node_modules/.vite/deps` (`EACCES`).
- Audits above were executed against dev server with runtime overlay issues removed.
