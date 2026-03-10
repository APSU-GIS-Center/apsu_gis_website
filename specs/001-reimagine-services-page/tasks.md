# Tasks: Reimagined Services Page

**Input**: Design documents from `/specs/001-reimagine-services-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated test suite was explicitly requested in the specification. This task list includes implementation and manual verification tasks tied to each story's independent test criteria.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare implementation scaffolding and verification checklists.

- [X] T001 Confirm implementation scope and file touchpoints in specs/001-reimagine-services-page/plan.md
- [X] T002 Capture launch validation KPI checklist in specs/001-reimagine-services-page/quickstart.md
- [X] T003 [P] Document dropdown interaction acceptance steps in specs/001-reimagine-services-page/quickstart.md
- [X] T004 [P] Document services content contract acceptance steps in specs/001-reimagine-services-page/contracts/services-content-contract.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared data/navigation contracts before user story implementation.

**CRITICAL**: Complete this phase before starting user story tasks.

- [X] T005 Normalize Services submenu contract fields (including enabled flags and valid destinations) in src/data/site/global_settings.json
- [X] T006 [P] Expand service offering schema with affordability/audience/outcome/CTA/fallback fields in src/data/sections/services.json
- [X] T007 [P] Create proof-point dataset for "By the Numbers" section in src/data/sections/services_proof_points.json
- [X] T008 Add schema documentation for new services fields in src/data/README.md
- [X] T009 [P] Add resilient fallback copy standards for external/link failures in specs/001-reimagine-services-page/contracts/services-content-contract.md

**Checkpoint**: Contracts and shared content structures are ready.

---

## Phase 3: User Story 1 - Discover Services and Navigate Reliably (Priority: P1) 🎯 MVP

**Goal**: Deliver a fully functional, accessible Services dropdown and reliable service navigation.

**Independent Test**: Open Services menu by mouse, touch, and keyboard from any page; activate every submenu entry; confirm destinations, focus behavior, and readable state announcements.

### Implementation for User Story 1

- [X] T010 [US1] Refactor Services dropdown trigger semantics (aria attributes, button behavior) in src/components/HeaderMain.astro
- [X] T011 [US1] Implement keyboard interactions (Enter/Space open, Escape close, focus return) in src/components/HeaderMain.astro
- [X] T012 [US1] Implement click/touch open-close behavior and outside-click dismissal in src/components/HeaderMain.astro
- [X] T013 [P] [US1] Add focus-visible and dropdown-state styling for keyboard/touch accessibility in src/assets/css/layout.css
- [X] T014 [US1] Handle separator and disabled submenu item rendering defensively in src/components/HeaderMain.astro
- [X] T015 [US1] Align submenu targets to valid routes/anchors in src/data/site/global_settings.json
- [X] T016 [US1] Add or reconcile service section anchors used by submenu links in src/pages/services.astro
- [ ] T017 [US1] Execute dropdown accessibility checklist (screen-reader announcement of expanded/collapsed state, Tab/Shift+Tab order, Enter/Space open, Escape close with focus return, touch open-close, outside-click dismissal) and record outcomes in specs/001-reimagine-services-page/quickstart.md

**Checkpoint**: Services dropdown and navigation are independently functional and accessible.

---

## Phase 4: User Story 2 - Evaluate Affordable Service Options (Priority: P2)

**Goal**: Provide a comparison-friendly services buffet with affordability and value signals.

**Independent Test**: Visit Services page and compare offerings by audience, affordability tier, and expected outcomes in under 90 seconds.

### Implementation for User Story 2

- [X] T018 [P] [US2] Add normalized service metadata records (audience, affordability_tier, expected_outcome, capabilities) in src/data/sections/services.json
- [X] T019 [P] [US2] Create reusable affordability badge component in src/components/AffordabilityBadge.astro
- [X] T020 [P] [US2] Create data-driven services buffet component for card rendering in src/components/ServicesBuffet.astro
- [X] T021 [P] [US2] Create services comparison matrix component for side-by-side evaluation in src/components/ServicesComparisonMatrix.astro
- [X] T022 [P] [US2] Create proof-point strip component for objective trust signals in src/components/ServicesProofPoints.astro
- [X] T023 [US2] Rebuild page composition with buffet hero, categories, and comparison flow in src/pages/services.astro
- [X] T024 [US2] Wire proof-point dataset into Services page rendering in src/pages/services.astro
- [X] T025 [US2] Add resilient default rendering for incomplete service metadata in src/components/ServicesBuffet.astro
- [X] T026 [US2] Update services page copy to objective, scannable language in src/pages/services.astro

**Checkpoint**: Services page supports affordable-offer comparison independently of Story 3.

---

## Phase 5: User Story 3 - Take Action with Confidence (Priority: P3)

**Goal**: Provide clear service-specific inquiry actions with graceful fallback paths.

**Independent Test**: Start an inquiry from at least one service card and verify both primary CTA and fallback path are actionable and understandable.

### Implementation for User Story 3

- [X] T027 [P] [US3] Add service-specific CTA and fallback link mappings in src/data/sections/services.json
- [X] T028 [P] [US3] Add service inquiry card component with primary and fallback action slots in src/components/ServiceInquiryCard.astro
- [X] T029 [US3] Integrate service inquiry cards into Services page actions area in src/pages/services.astro
- [X] T030 [US3] Parse service query context for contact intent messaging in src/pages/contact.astro
- [X] T031 [US3] Add service-context field support and default subject selection in src/components/ContactForm.astro
- [X] T032 [US3] Pass service context props from contact page into form component in src/pages/contact.astro
- [X] T033 [US3] Add unavailable-destination fallback notice pattern in src/pages/services.astro
- [X] T034 [US3] Validate all service CTA and fallback links against contact flow requirements in specs/001-reimagine-services-page/quickstart.md

**Checkpoint**: Inquiry flow and fallback behavior are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, compliance, and release readiness checks.

- [X] T035 [P] Update documentation for new components and content contracts in specs/001-reimagine-services-page/quickstart.md
- [X] T036 [P] Verify all ArcGIS/resource links reachable from changed Services/nav flows and dependent service destinations; record checked URLs and status in specs/001-reimagine-services-page/quickstart.md
- [X] T037 [P] Run accessibility verification steps and log findings in dev_docs/a11y/phase2_accessibility_verification.md
- [X] T038 Run required verification commands and note pass/fail in specs/001-reimagine-services-page/quickstart.md
- [X] T039 Run moderated usability validation for SC-002 (identify suitable service in under 90 seconds) and record participant outcomes in specs/001-reimagine-services-page/quickstart.md
- [X] T040 Run affordability comprehension validation for SC-003 (distinguish at least three affordability/value levels) and record pass rate in specs/001-reimagine-services-page/quickstart.md
- [X] T041 Run inquiry initiation validation for SC-004 (first-attempt completion rate) and record results in specs/001-reimagine-services-page/quickstart.md
- [X] T042 Execute APSU brand QA for changed Services/nav UI (approved colors, Montserrat headers, EB Garamond body, logo treatment) and log findings in specs/001-reimagine-services-page/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Setup completion; blocks all user stories.
- User Story phases (Phases 3-5): depend on Foundational completion.
- Polish (Phase 6): depends on completion of all targeted user stories.

### User Story Dependencies

- US1 (P1): starts immediately after Phase 2 and defines MVP behavior.
- US2 (P2): starts after Phase 2; relies on foundational data contracts but not on US3.
- US3 (P3): starts after Phase 2; can proceed after US1 navigation stability is in place and can be integrated with US2 page components.

### Story Completion Order

1. US1 (MVP navigation reliability)
2. US2 (affordable buffet comparison)
3. US3 (inquiry confidence and fallback)

---

## Parallel Execution Examples

### User Story 1

- Run T013 in parallel with T014 after T010-T012 are underway (different files: CSS vs component logic).

### User Story 2

- Run T019, T020, T021, and T022 in parallel (independent component files).
- Run T018 in parallel with component creation (data contract file only).

### User Story 3

- Run T027 and T028 in parallel (data vs new component).
- Run T030 and T031 in parallel before wiring in T032.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) and validate dropdown reliability.
3. Demo/review MVP before expanding scope.

### Incremental Delivery

1. Add US2 for affordability comparison and trust signals.
2. Add US3 for service-specific inquiry conversion and fallback confidence.
3. Finish with Phase 6 compliance and verification gates.
