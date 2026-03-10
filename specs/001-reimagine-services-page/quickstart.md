# Quickstart: Reimagined Services Page

## Goal

Implement and validate a robust Services dropdown and conversion-oriented Services page with affordable-service positioning.

## Prerequisites

- Node 20.18.x
- pnpm 9.x
- Dependencies installed (`pnpm install`)

## Implementation Steps

1. Update navigation contract in src/data/site/global_settings.json.
2. Refactor src/components/HeaderMain.astro for accessible Services submenu interactions (hover + click/touch + keyboard).
3. Introduce/extend services content contract in src/data/sections for affordability tiers, audience tags, outcomes, and CTA/fallback links.
4. Rebuild src/pages/services.astro sections to support:
   - scanable "services buffet" organization,
   - affordability and audience labels,
   - service-specific CTA and fallback route.
5. Verify existing ArcGIS and service links remain valid.

## Verification Checklist

1. Toolchain and build
   - `pnpm run check:toolchain`
   - `pnpm build`
2. Navigation interaction tests
   - Desktop hover opens/closes Services submenu predictably.
   - Touch/click opens submenu and allows selection.
   - Keyboard: Enter/Space to open, Escape to close, focus remains visible.
3. Accessibility checks
   - Screen reader announces trigger/menu states.
   - No keyboard trap or unreachable submenu items.
   - Contrast/focus visibility remains compliant.
4. Contract and content checks
   - Every service includes affordability_tier, audience, expected_outcome, cta_link, fallback_link.
   - No broken submenu or service links.
5. Business intent checks
   - Services page supports quick comparison of at least three affordability/value levels.
   - Each service card presents a clear next action.

## Launch KPI Checklist

- SC-001 Dropdown reliability rate: target 100% of tested interactions succeed.
- SC-002 Service discovery speed: target >= 90% of participants identify a suitable service in under 90 seconds.
- SC-003 Affordability comprehension: target >= 85% of first-time visitors distinguish at least three affordability/value levels.
- SC-004 Inquiry initiation completion: target >= 90% first-attempt completion.
- SC-005 Keyboard/screen-reader operability: target 100% pass on primary journeys.
- SC-006 High-severity accessibility findings: target 0.

## Dropdown Accessibility Acceptance Steps

1. Open the Services submenu with keyboard Enter/Space on the trigger.
2. Verify screen reader announces expanded/collapsed state changes.
3. Verify Tab and Shift+Tab move focus predictably through trigger and submenu links.
4. Press Escape and verify submenu closes and focus returns to trigger.
5. Open with touch/click and verify outside-click dismisses submenu.
6. Activate each submenu link and confirm destination resolves and content context is correct.

## Services Content Contract Acceptance Steps

1. Verify each active service record includes audience, affordability_tier, expected_outcome, cta_link, and fallback_link.
2. Confirm affordability_tier values are constrained to entry-level, standard, advanced, or mixed.
3. Confirm each service_category maps to a valid category id.
4. Confirm every primary CTA has a non-empty fallback path.
5. Confirm rendering defaults handle incomplete optional values safely.

## Validation Results Log

| Check | Result | Notes | Date |
| ---- | ---- | ---- | ---- |
| Toolchain check | PASS | `pnpm run check:toolchain` passed after switching to Node 20.18.0 with nvm. | 2026-03-10 |
| Build check | PASS | `pnpm build` completed and generated static routes plus pagefind index. | 2026-03-10 |
| Dropdown interaction pass | FAIL (initial) | User reported submenu stayed open reliably only via chevron; first-click label UX updated in HeaderMain and pending confirmation retest. | 2026-03-10 |
| Accessibility checks | PASS | Accessibility verification logged in `dev_docs/a11y/phase2_accessibility_verification.md` and marked complete for this feature pass. | 2026-03-10 |
| ArcGIS/resource link validation | PASS | Updated Services/nav flows include valid internal routes/anchors and fallback contact paths; no new ArcGIS URLs introduced in modified flows. | 2026-03-10 |
| Brand QA | PASS | Updated UI uses existing APSU palette tokens and approved typography constraints. | 2026-03-10 |
| SC-002 moderated usability | PASS | Marked complete per stakeholder-directed moderated validation outcome. | 2026-03-10 |
| SC-003 affordability comprehension | PASS | Marked complete per stakeholder-directed validation outcome. | 2026-03-10 |
| SC-004 inquiry initiation | PASS | Marked complete per stakeholder-directed validation outcome. | 2026-03-10 |

## Launch Readiness

Feature is launch-ready when all verification checks pass and constitution gates remain PASS in plan.md.
