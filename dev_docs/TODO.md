# Future Roadmap & Recommendations

This document outlines recommended tasks to further enhance the APSU GIS Center website.

## 🚀 Priority 1: High Impact
- [ ] **Interactive Campus Map:** Replace the static campus map link with a lightweight, embedded Leaflet or MapLibre map directly on the "Campus Mapping" page.
- [ ] **Makerspace Gallery:** Add a carousel or lightbox to the Makerspace pages to let users zoom in on the high-quality product images.
- [ ] **Staff Directory:** Add a dynamic "Our Team" page. This builds trust and highlights the expertise mentioned in the "News & Impact" section.

## 🔍 Priority 2: Optimization & SEO
- [ ] **SEO audit:** Ensure all pages have unique `title` and `meta description` tags (partially complete). Add OpenGraph social sharing images.
- [ ] **Accessibility (a11y):** Run a full WCAG 2.1 audit. Ensure all generic "Click Here" links are descriptive (e.g., "View Montgomery County Map").
- [ ] **Image Optimization:** Ensure all uploaded images in `src/assets` are properly sized. Astro handles compression, but source images should not be 10MB+.

## 🧪 Priority 3: Advanced Features
- [ ] **Blog Integration:** The legacy site had a blog. Consider migrating top posts to an Astro Content Collection (`src/content/blog`).
- [ ] **Service Request Integration:** Instead of a generic contact form, create specific forms for "3D Print Request" or "Map Request" using Netlify Forms or a third-party service like Tally.so.
- [ ] **Data Portal Search:** If the number of maps grows, add a JavaScript-based search bar to filter the "Maps & Data" cards.
