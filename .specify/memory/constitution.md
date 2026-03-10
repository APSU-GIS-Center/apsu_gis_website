<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
  - Principle slot 1 -> I. Mission-Aligned Brand Fidelity
  - Principle slot 2 -> II. Accessibility Is Release-Blocking
  - Principle slot 3 -> III. Resilient Integrations and External Links
  - Principle slot 4 -> IV. Typed Content and Contract Consistency
  - Principle slot 5 -> V. Verification Before Merge
- Added sections:
  - Delivery Constraints
  - Development Workflow and Quality Gates
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not present in repository)
- Runtime docs updated:
  - ✅ updated: README.md
- Follow-up TODOs:
  - None
-->

# APSU GIS Center Website Constitution

## Core Principles

### I. Mission-Aligned Brand Fidelity

All user-facing work MUST preserve APSU brand standards defined in AGENTS.md.
Approved palette and typography are non-negotiable: primary `#C41E3A`, secondary
`#000000`, headers in Montserrat, and body text in EB Garamond. New visual elements,
logos, and font families are prohibited unless explicitly authorized in repository
guidance. Rationale: the site is an institutional property and inconsistent branding
creates trust and compliance risk.

### II. Accessibility Is Release-Blocking

Pages and components MUST meet WCAG 2.1 AA expectations, including semantic
structure, keyboard access, color contrast, alternative text, and visible focus
states. Accessibility regressions on key journeys block release until remediated or
formally waived with documented risk acceptance. Rationale: university services must
remain inclusive and publicly accessible.

### III. Resilient Integrations and External Links

No feature may assume a happy path. Integrations (forms, APIs, ArcGIS embeds,
external links) MUST provide explicit failure handling, observable fallback behavior,
and clear user messaging when dependencies fail. Existing ESRI ArcGIS links MUST be
preserved and validated after changes. Rationale: external systems can fail and must
not break mission-critical information access.

### IV. Typed Content and Contract Consistency

Data and content contracts MUST remain consistent across `src/data`, content
collections, and Astro component interfaces. Contract-affecting changes require
updates to schemas/types and dependent renderers in the same change set. Rationale:
content-driven sites fail silently when schema drift is allowed.

### V. Verification Before Merge

Every change MUST pass repository verification commands before merge. Minimum checks
are `pnpm run check:toolchain` and `pnpm build`; when scope includes links,
accessibility, forms, or ArcGIS content, targeted validation for those areas is also
mandatory. Rationale: static-site regressions are often introduced by content and
configuration changes that compile but fail in production behavior.

## Delivery Constraints

- Stack constraints are mandatory: Astro + Tailwind with existing theme primitives.
- Hardcoded unauthorized colors, fonts, or logos are prohibited.
- Secrets MUST NOT be committed; `.env` files and credentials are never logged.
- Public-facing links and downloadable resources MUST resolve at build/verification
  time or be removed with stakeholder approval.

## Development Workflow and Quality Gates

1. Define user impact and affected strategic pillar(s) before implementation.
2. Document contract and content changes in the feature spec and plan.
3. Implement with explicit error and fallback states for external dependencies.
4. Run required verification commands and attach results to the pull request.
5. Complete reviewer checks for brand compliance, accessibility, and link integrity
  prior to approval.

## Governance

- This constitution supersedes ad hoc team practices for this repository.
- Amendments require a pull request that includes: proposed text changes,
  rationale, impacted templates/docs, and migration steps (if any).
- Versioning policy uses semantic versioning for governance:
  - MAJOR: incompatible principle removals or redefinitions.
  - MINOR: new principle/section or materially expanded guidance.
  - PATCH: clarifications, wording improvements, typo fixes.
- Compliance review is required in every pull request. Reviews MUST explicitly
  confirm adherence to brand, accessibility, resilience, contract consistency,
  and verification requirements.
- Operational guidance files (for example `AGENTS.md` and `README.md`) MUST remain
  aligned with this constitution after every amendment.

**Version**: 1.0.0 | **Ratified**: 2026-03-10 | **Last Amended**: 2026-03-10
