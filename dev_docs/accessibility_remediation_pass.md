# Accessibility Remediation Pass (Phase 1)

## Scope
Targeted implementation pass across key pages/components:

- `src/pages/index.astro`
- `src/pages/services.astro`
- `src/pages/maps-data.astro`
- `src/pages/news-impact.astro`
- `src/pages/contact.astro`
- `src/layouts/Layout.astro`
- `src/components/HeaderMain.astro`
- `src/components/FooterMain.astro`
- `src/components/ContactForm.astro`
- `src/components/NewsletterSignup.astro`
- `src/assets/css/global.css`

## Issues Addressed

### 1) Keyboard focus visibility
- Added global `:focus-visible` styles for interactive controls using existing APSU red token.
- Improves discoverability for keyboard and switch users without introducing non-theme colors.

### 2) Skip-link usability
- Updated main landmark target to be programmatically focusable (`tabindex="-1"`) so skip-link landing is reliable.

### 3) Landmark/navigation clarity
- Added `aria-label` to primary nav in header.
- Added `aria-label` to footer nav and social-link nav.

### 4) External link accessibility (Maps/Data + social links)
- Added `rel="noopener noreferrer"` to external map links opening in new tab.
- Added explicit `aria-label` cues for map cards that open in new tabs.
- Added screen-reader announcement text for social links opening in new tabs.

### 5) Decorative icon noise reduction
- Marked decorative emoji/icon containers as `aria-hidden="true"` in home/services/news pages.
- Marked decorative inline SVG arrows/external icons as `aria-hidden="true"` where text already provides meaning.

### 6) Placeholder visual semantics
- Replaced raw placeholder text exposure with explicit image-region semantics (`role="img"` + `aria-label`) on services sections.
- Kept placeholder text visual-only via `aria-hidden` to reduce repetitive screen-reader output.

### 7) Heading hierarchy consistency (Contact page)
- Aligned section headings under page `h1` by converting `Location` and `Email` headings to `h2`.

### 8) Form usability improvements
- Added `autocomplete` attributes to contact form name/email controls.
- Added explicit associated label (`sr-only`) and `autocomplete` to newsletter email input.

### 9) Markup cleanup impacting semantics
- Removed an extra closing `</div>` in home page gallery section to preserve expected document structure.

## Validation Results

### Editor diagnostics
- `get_errors` check on all modified files: **No errors found**.

### Build
- `pnpm build` currently fails due to local filesystem permissions:
  - `EACCES: permission denied, rmdir '.../node_modules/.vite/deps'`
- This is environment-related and not introduced by the remediation changes.

## Recommended Phase 2 (Next Pass)
1. Run automated axe/Lighthouse audit in browser on key routes.
2. Verify color contrast ratios for text over imagery in hero and map cards under all states.
3. Add consistent `aria-current="page"` treatment in top navigation.
4. Ensure all ArcGIS outbound links are HTTPS where available and still resolve.
5. Review modal (`DialogModal`) for focus trap, escape handling, and return-focus behavior.
