# Contract: Services Content Model

## Scope

Defines the contract for data used to render the reimagined Services page and service comparison cards.

## Contract Source/Target

- Source: src/data/sections/services.json (or services_detailed.json if introduced)
- Consumers: src/pages/services.astro and related service section components

## Schema (Conceptual)

```json
{
  "categories": [
    {
      "id": "public-safety",
      "title": "Public Safety & Resilience",
      "description": "...",
      "display_order": 1
    }
  ],
  "services": [
    {
      "id": "rapid-response-mapping",
      "slug": "public-safety",
      "title": "Rapid Response Mapping",
      "summary": "Deploy decision-ready maps quickly during incident response.",
      "audience": ["emergency-management", "county-leadership"],
      "affordability_tier": "entry-level",
      "expected_outcome": "Reduce incident coordination delays.",
      "service_category": "public-safety",
      "capabilities": ["drone mapping", "incident overlays"],
      "proof_point": "Optional objective metric",
      "cta_text": "Request Public Safety Support",
      "cta_link": "/contact?service=public-safety",
      "fallback_text": "Prefer email? Contact GIS team directly.",
      "fallback_link": "/contact",
      "active": true
    }
  ]
}
```

## Required Rules

- Each service must include title, summary, audience, affordability_tier, expected_outcome, cta_text, cta_link, fallback_text, fallback_link.
- affordability_tier must be one of: entry-level, standard, advanced, mixed.
- service_category must match an existing category id.
- cta_link and fallback_link must both resolve.
- No service with active=true can omit inquiry actions.

## Backward Compatibility

- Existing minimal service cards can be adapted by deriving defaults for missing fields.
- If legacy data is present, rendering must provide safe defaults rather than failing.

## Failure Handling

- If cta_link fails validation, render fallback_text + fallback_link prominently.
- If both links fail validation, render explicit unavailable-state guidance and route to /contact.

## Fallback Copy Standards

- Fallback text must be plain-language, action-oriented, and no more than two sentences.
- Fallback text must avoid technical jargon and explicitly offer a next step.
- Fallback link should prefer /contact when primary route is unavailable.
- Unavailable-state messaging must preserve user trust by explaining that support is still available.

## Acceptance Checklist

- Every active service includes cta_text, cta_link, fallback_text, and fallback_link.
- No fallback_text is empty for an active service.
- Invalid primary links visibly degrade to fallback guidance.
- Services page does not render dead-end CTA states.
