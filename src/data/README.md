# Data Folder Conventions

This directory stores JSON data used by Astro pages and components.

## Structure

- `site/`
  - Global site configuration and shared settings.
  - Example: `global_settings.json`

- `sections/`
  - Reusable page-section content (homepage blocks, services, testimonials, etc.).
  - Examples: `home.json`, `services.json`, `testimonials.json`, `faq.json`

- `reference/`
  - Reference/legal/credits-style content used by supporting pages.
  - Example: `credits.json`

## Contributor Guidelines

- Keep JSON files in the smallest relevant folder above.
- Prefer descriptive snake_case filenames (e.g., `economic_development_metrics.json`).
- Avoid duplicating the same content across multiple files.
- Update import paths when moving files.
- Preserve existing data contracts used by Astro components/pages.
