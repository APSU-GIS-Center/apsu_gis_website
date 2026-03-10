# Implementation Plan: Reimagined Services Page

**Branch**: `001-reimagine-services-page` | **Date**: 2026-03-10 | **Spec**: `/specs/001-reimagine-services-page/spec.md`
**Input**: Feature specification from `/specs/001-reimagine-services-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Deliver a conversion-focused, budget-aware Services experience that fixes broken
Services dropdown behavior, improves service discoverability, and adds
affordability-oriented offer framing. The implementation will use Astro pages,
JSON-driven content contracts, and an accessible dropdown interaction model that
supports hover, click/touch, and keyboard flows while preserving APSU brand
standards and ArcGIS link integrity.

## Technical Context

**Language/Version**: TypeScript (Astro component frontmatter/runtime), Astro 5.x, Node 20.18.x  
**Primary Dependencies**: Astro, Tailwind CSS 4.x, @astrojs/sitemap, Swiper (existing), Astro assets pipeline  
**Storage**: File-based JSON content under `src/data` (no database)  
**Testing**: Manual UX/a11y verification, `pnpm run check:toolchain`, `pnpm build`, targeted link checks for changed navigation and services links  
**Target Platform**: Static website for modern desktop/mobile browsers
**Project Type**: Astro static web application  
**Performance Goals**: Preserve static-site performance profile; no meaningful regression in Services page interaction responsiveness and page load behavior  
**Constraints**: Must use approved brand tokens/fonts; WCAG 2.1 AA on affected journeys; preserve ArcGIS/resource links; avoid schema drift across data/component contracts  
**Scale/Scope**: 1 top-level Services page, primary header dropdown behavior, supporting JSON contracts, and related CTA paths

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Brand fidelity gate: PASS. Planned changes remain within existing APSU theme tokens and approved fonts.
- Accessibility gate: PASS. Design includes keyboard, screen-reader, and touch-safe nav behaviors plus explicit focus states.
- Resilience gate: PASS. Plan includes broken-link/fallback CTA handling and non-blocking guidance for unavailable external dependencies.
- Contract gate: PASS. JSON content model changes are defined with downstream impacts to header/menu/services renderers.
- Verification gate: PASS. Required commands and targeted checks are specified: `pnpm run check:toolchain`, `pnpm build`, dropdown interaction checks, ArcGIS/link verification, and accessibility scan review.

Post-Design Re-check:

- Brand fidelity gate: PASS (design artifacts use existing brand primitives only).
- Accessibility gate: PASS (contract and quickstart include keyboard/screen-reader checks).
- Resilience gate: PASS (contracts include fallback_link/fallback_text patterns).
- Contract gate: PASS (data model defines required/optional fields and validation).
- Verification gate: PASS (quickstart covers pre-merge verification workflow).

## Project Structure

### Documentation (this feature)

```text
specs/001-reimagine-services-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── HeaderMain.astro
├── pages/
│   ├── services.astro
│   └── services/
│       ├── public-safety.astro
│       ├── economic-development.astro
│       └── campus-mapping.astro
├── data/
│   ├── site/global_settings.json
│   └── sections/ (services content contracts)
└── assets/ (existing imagery/tokens only)

dev_docs/
└── a11y/ (verification references)
```

**Structure Decision**: Single Astro project structure retained. Changes are
localized to header navigation behavior, services content contracts, and
services page composition. No new app layers are introduced.

## Complexity Tracking

No constitution violations are expected. This section is intentionally left with
no entries.

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
