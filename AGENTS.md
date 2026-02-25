# APSU GIS Center Website
> **Value Prop:** Mission-driven university geospatial web presence delivering expert GIS solutions with strong brand and accessibility compliance.

This document is the **Single Source of Truth** for the codebase. If it is not here, it does not exist.

Session bootstrap order is documented in [ai_guide/README.md](ai_guide/README.md#session-start-order).

---

## 1. Commercial Rules (The "Profit First" Standard)
* **No "Happy Path" Coding:** Assume APIs, forms, and third-party links can fail; handle exceptions and fallbacks explicitly.
* **Strict Typing/Contracts:** Preserve schema and content contract consistency across data files and Astro components.
* **Secrets:** NEVER commit `.env` files or print secrets in logs.
* **Brand Compliance is Mandatory:**
    * Primary color: PMS 200 Red (`#C41E3A`)
    * Secondary color: Black (`#000000`)
    * Headers: **Montserrat**
    * Body: **EB Garamond**
    * "Govs" font only for approved athletic/spirit context
    * "AP" logo clear space must remain 1.5x logo height
* **Design Guardrails:**
    * Use Astro + Tailwind only within existing theme primitives.
    * Do not hardcode colors, new font families, or unauthorized logos.
    * Preserve all existing ESRI ArcGIS web app links.
    * Maintain WCAG 2.1 accessibility best practices.

## 2. Critical Commands
| Command | Action | Description |
| :--- | :--- | :--- |
| `pnpm install` | **Install Deps** | Installs project dependencies. |
| `pnpm dev` | **Start Dev** | Launches the Astro development server. |
| `pnpm build` | **Build** | Builds static output for deployment. |
| `pnpm preview` | **Preview** | Serves built output for verification. |

## 3. Tech Stack & Resources
* **Language:** TypeScript + Astro component syntax
* **Framework:** Astro
* **Styling:** Tailwind CSS (APSU palette via theme/tokens)
* **Content/Data:** JSON data files under `src/data`, content collections under `src/content`
* **Assets:** Brand/media assets under `public/` and `src/assets/`

## 4. Project Structure (Map)
```text
/
├── src/
│   ├── components/      # Reusable Astro UI components
│   ├── layouts/         # Page/layout shells
│   ├── pages/           # Route files
│   ├── data/            # JSON-configured content blocks
│   ├── content/         # Content collections (e.g., blog)
│   └── assets/          # CSS, fonts, images, theme assets
├── public/              # Static files and content images
├── dev_docs/            # Internal docs, deployment, TODOs
├── guide/               # Marketing and strategic documents
└── AGENTS.md            # Meta memory file (this file)
```

## 5. Active Context & Todo
* [x] Define APSU GIS Center identity, role, and brand constraints
* [x] Define frontend coding standards (Astro/Tailwind/ArcGIS/accessibility)
* [x] Document sub-agent orchestration model
* [x] Review Astro guidance sources and capture site-specific recommendations
* [ ] Validate all ESRI ArcGIS links still resolve
* [ ] Complete accessibility pass for key pages/components
* [ ] Align home page content with four strategic pillars (Public Safety, Facility Resilience, Economic Development, Academic/Workforce Development)

## 6. Sub-Agent Roles (The Orchestra)
### 1. @agent-frontend (The Builder)
* **Focus:** Astro implementation, Blackspike theme integration, Tailwind CSS, performance optimization
* **Tasks:** Scaffolding, component creation, layout implementation

### 2. @agent-brand (The Designer)
* **Focus:** UI review and brand enforcement
* **Checks:** Color compliance (`#C41E3A`, `#000000`), font usage, logo spacing

### 3. @agent-content (The Strategist)
* **Focus:** Content organization and strategy
* **Pillars:** Public Safety, Facility Resilience, Economic Development, Academic/Workforce Development
* **Specifics:** "Community Snapshot" dashboard, "By The Numbers" metrics

### 4. @agent-qa (The Validator)
* **Focus:** CI/CD, testing, link safety
* **Tasks:** Check broken ArcGIS links, form functionality, accessibility audits, Lighthouse scores
