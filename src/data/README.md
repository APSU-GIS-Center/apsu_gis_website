# Data Folder Conventions

This directory stores JSON data used by Astro pages and components.

## Structure

- `site/`
  - Global site configuration and shared settings.
  - Example: `global_settings.json`

- `sections/`
  - Reusable page-section content (homepage blocks, services, testimonials, etc.).
  - Examples: `home.json`, `services.json`, `services_proof_points.json`, `testimonials.json`, `faq.json`

- `reference/`
  - Reference/legal/credits-style content used by supporting pages.
  - Example: `credits.json`

## Contributor Guidelines

- Keep JSON files in the smallest relevant folder above.
- Prefer descriptive snake_case filenames (e.g., `economic_development_metrics.json`).
- Avoid duplicating the same content across multiple files.
- Update import paths when moving files.
- Preserve existing data contracts used by Astro components/pages.

## Services Schema Notes

`sections/services.json` now uses an object contract with `hero`, `categories`,
`services`, `comparison`, and `inquiry_intro` keys.

Each `services[]` record should include:

- `id`, `slug`, `title`, `summary`
- `audience` (array)
- `affordability_tier` (`entry-level`, `standard`, `advanced`, or `mixed`)
- `expected_outcome`
- `service_category`
- `cta_text`, `cta_link`
- `fallback_text`, `fallback_link`
- `active`

`sections/services_proof_points.json` stores objective, scannable metrics with
`label`, `value`, and `context`.
