# Contract: Services Navigation Menu

## Scope

Defines behavior and data contract for the Services menu entry in primary navigation.

## Contract Source/Target

- Source: src/data/site/global_settings.json -> nav[]
- Consumer: src/components/HeaderMain.astro

## Data Contract

Top-level item:

- title: string (required, expected value Services)
- link: string (required, resolvable route, default /services)
- submenu: ServiceSubmenuItem[] (optional but expected for this feature)

Submenu item:

- title: string (required, use em dash marker only for separator)
- link: string (required unless title is em dash separator)
- enabled: boolean (optional, default true)

Separator rule:

- title = em dash marker indicates visual separator and must not include link.

## Interaction Contract

- Services top-level remains clickable and routes to /services.
- Submenu opens via:
  - pointer hover (desktop),
  - trigger click/tap (touch),
  - keyboard focus + activation.
- Keyboard behavior:
  - Enter/Space opens submenu from trigger.
  - Escape closes submenu and returns focus to trigger.
  - Tab/Shift+Tab preserve predictable focus order.
- ARIA expectations:
  - trigger exposes aria-haspopup and accurate aria-expanded state.
  - submenu container has accessible label and role semantics.

## Link Integrity Rules

- Every submenu link must resolve to an existing route or valid in-page anchor.
- Mixed strategy (route + anchor) is allowed only when destinations are intentionally documented.
- Broken links fail pre-merge verification for this feature.

## Failure Handling

- If submenu rendering fails, the top-level /services route must remain available.
- If a submenu destination is temporarily unavailable, render/route to fallback guidance in Services page.
