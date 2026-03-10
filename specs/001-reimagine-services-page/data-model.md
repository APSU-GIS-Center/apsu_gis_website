# Data Model: Reimagined Services Page

## Entity: ServiceMenuItem

Purpose: Defines top-level and submenu navigation links for Services discovery.

Fields:

- id: string (required, unique, kebab-case)
- title: string (required, 2-60 chars)
- link: string (required, absolute site path or approved external URL)
- type: enum (required): top-level | submenu | separator
- parent_id: string (optional, required when type=submenu)
- order: integer (required, >= 0)
- audience_hint: string[] (optional)
- enabled: boolean (required, default true)

Validation rules:

- type=separator must not include link.
- type=submenu must include parent_id that exists.
- link destinations must resolve to an internal route/anchor or approved external destination.

State transitions:

- draft -> active
- active -> deprecated
- deprecated -> removed

## Entity: ServiceOffering

Purpose: Represents an offer in the Services buffet designed for fast comparison and inquiry.

Fields:

- id: string (required, unique, kebab-case)
- slug: string (required, maps to route or anchor target)
- title: string (required, 3-80 chars)
- summary: string (required, 20-240 chars)
- audience: string[] (required, at least 1)
- affordability_tier: enum (required): entry-level | standard | advanced | mixed
- expected_outcome: string (required, 10-140 chars)
- service_category: string (required)
- capabilities: string[] (required, 2-8)
- proof_point: string (optional, objective metric/case evidence)
- cta_text: string (required, 2-60 chars)
- cta_link: string (required)
- fallback_text: string (required)
- fallback_link: string (required)
- active: boolean (required, default true)

Validation rules:

- cta_link and fallback_link cannot both be empty.
- affordability_tier must be one of allowed enum values.
- slug must align to either dedicated route or documented section anchor.
- summary and expected_outcome must use objective language.

State transitions:

- draft -> published
- published -> revised
- revised -> archived

## Entity: ServiceCategory

Purpose: Groups offerings for scanability and procurement-style comparison.

Fields:

- id: string (required, unique)
- title: string (required)
- description: string (required)
- display_order: integer (required)
- featured: boolean (optional)

Validation rules:

- Category must have at least one active ServiceOffering.
- display_order must be unique within category list.

## Entity: InquiryPath

Purpose: Encodes service-specific and fallback conversion pathways.

Fields:

- service_id: string (required, references ServiceOffering.id)
- primary_channel: enum (required): contact-form | email | phone | external-form
- primary_link: string (required)
- fallback_channel: enum (required): contact-form | email | phone
- fallback_link: string (required)
- availability_note: string (optional)

Validation rules:

- fallback_channel should differ from primary_channel when feasible.
- primary_link and fallback_link must pass link validation.

## Relationships

- ServiceCategory 1..* ServiceOffering
- ServiceOffering 1..1 InquiryPath
- ServiceMenuItem (top-level) 1..* ServiceMenuItem (submenu)
- ServiceMenuItem (submenu) optionally maps to ServiceOffering.slug
