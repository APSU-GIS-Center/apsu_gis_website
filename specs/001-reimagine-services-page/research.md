# Phase 0 Research: Reimagined Services Page

## Research Inputs

- Existing repository code and contracts:
  - Header dropdown implementation in src/components/HeaderMain.astro
  - Services content and anchors in src/pages/services.astro
  - Navigation contract in src/data/site/global_settings.json
- Live reference site messaging and services inventory:
  - <https://apsugis.org>
  - <https://apsugis.org/services>
- Usability and conversion guidance:
  - Nielsen Norman Group navigation and web writing evidence

## Decisions

### Decision: Keep the top-level Services item clickable and make submenu robust across hover, keyboard, and touch

- Rationale: This follows the simple-accessibility approach where users can always reach a fully accessible page even if submenu interaction fails. It also prevents hover-only dead ends on touch devices and improves confidence for keyboard users.
- Alternatives considered:
  - Hover-only dropdown behavior. Rejected because it is unreliable for touch and weak for keyboard accessibility.
  - JavaScript-heavy mega menu rewrite. Rejected because site scope does not require a full mega menu and complexity risk is higher.

### Decision: Align menu links with valid, maintained destinations and avoid orphan anchors

- Rationale: Current navigation includes in-page anchors while some destinations are represented as dedicated service pages. Contract consistency and link reliability require the menu model to match actual route strategy.
- Alternatives considered:
  - Keep mixed anchor/page links without normalization. Rejected due to maintenance risk and inconsistent user expectations.
  - Remove submenu entirely. Rejected because service discoverability is a business requirement.

### Decision: Reframe services as a budget-aware buffet with clear tiers and outcomes, not just capability labels

- Rationale: Funding-constrained buyers need quick comparison signals, objective language, and outcome clarity. Research indicates concise, scannable, objective copy improves usability and trust.
- Alternatives considered:
  - Keep generic capability cards only. Rejected because it does not communicate affordability or prioritization.
  - Publish exact pricing table immediately. Rejected for now because pricing may vary by scope and requires operational alignment; tiered affordability provides immediate clarity without overpromising.

### Decision: Introduce a JSON-driven service contract with required fields for audience, affordability, outcome, and CTA

- Rationale: Typed content discipline prevents silent rendering failures and guarantees each service can be compared and acted on.
- Alternatives considered:
  - Hardcode services directly in page markup. Rejected due to poor maintainability and weaker contract governance.
  - Keep minimal title/description model. Rejected because the feature requires affordability and conversion metadata.

### Decision: Include fallback contact paths for any unavailable primary CTA/link

- Rationale: Constitution requires resilient integrations and non-happy-path behavior. Users should never hit a dead end when they are ready to inquire.
- Alternatives considered:
  - Show generic error only. Rejected because it harms trust and conversion.
  - Silent link suppression. Rejected because users need explicit recovery options.

### Decision: Validate with constitution-gated checks before merge

- Rationale: Verification-first governance reduces regression risk for navigation, accessibility, and content contracts.
- Alternatives considered:
  - Build-only validation. Rejected because interaction and accessibility regressions can pass static build checks.

## Clarifications Resolved

- Language and framework: Astro static site with TypeScript-capable frontmatter and Tailwind CSS.
- Primary dependencies: Existing Astro/Tailwind stack only; no new mandatory library requirement.
- Data/storage model: JSON content contracts in src/data and static routes in src/pages.
- Navigation strategy: Clickable Services parent plus accessible submenu interactions.
- Affordability strategy: Tiered value framing (entry-level/standard/advanced) with service-specific outcomes.
- CTA strategy: Service-specific inquiry intent plus fallback path.
- Validation strategy: Toolchain/build checks plus targeted dropdown, link, and accessibility verification.

## Best-Practice Notes Applied

- Scannable writing with concise headings and list structure.
- Objective language over promotional claims to improve trust and comprehension.
- Recognition over recall in navigation by exposing clearly grouped service options.
- Error prevention and recovery in menu interactions and CTA paths.
