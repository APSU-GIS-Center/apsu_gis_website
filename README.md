# APSU GIS Center Website

A modern, static website for the Austin Peay State University GIS Center, built with **Astro** and **Tailwind CSS**.

## 🚀 Getting Started

### Prerequisites

- **nvm** (recommended) or **Volta**
- **Node.js** `20.18.0` (pinned in `.nvmrc`)
- **Corepack** (bundled with modern Node)
- **Terminal** familiarity

### Quick Start

This project uses `just` to simplify commands.

1. **Use the pinned Node version:**

   ```bash
   nvm use        # reads .nvmrc
   corepack enable
   corepack prepare pnpm@9.0.0 --activate
   ```

2. **Install Dependencies:**

   ```bash
   just install   # runs: pnpm install --frozen-lockfile
   ```

3. **Start Dev Server:**

   ```bash
   just dev      # runs: pnpm dev
   ```

4. **Open Browser:**
   Navigate to `http://localhost:4321`.

5. **Run full local verification (optional):**

   ```bash
   just verify   # runs toolchain check + build + link check
   ```

### Environment Consistency Policy

- This repository is pinned to:
  - Node `20.18.0` via `.nvmrc`
  - pnpm `9.x` via `packageManager` in `package.json`
- Installs must use `pnpm` (guarded by the `preinstall` script).
- CI and local development should always install with a lockfile (`pnpm install --frozen-lockfile`).
- CI runs `pnpm run check:toolchain` and fails when Node/pnpm drift from pinned versions.

## 🛠 Project Structure

- **`src/pages/`**: The routes of the site. `index.astro` is the homepage.
  - `src/pages/services/`: Landing pages for specific services (Public Safety, Campus Maps, etc.).
  - `src/pages/makerspace/`: Content for Engravables and Awards.
- **`src/components/`**: Reusable UI parts (Header, Footer, Cards).
- **`src/layouts/`**: `Layout.astro` defines the global HTML structure (head, body tags).
- **`src/assets/`**: Images, fonts, and global CSS.
- **`src/content/`**: (Optional) structured content collections.

## 👨‍💻 For Developers New to Astro

Astro is a **framework for content-focused websites**.

- **`.astro` files:** These are like HTML files but with a "frontmatter" fence (`---`) at the top where you can write JavaScript.
- **Components:** You can import components inside the fence:

  ```astro
  ---
  import Card from '../components/Card.astro';
  const title = "My Map";
  ---
  <h1>{title}</h1>
  <Card />
  ```

- **Styling:** We use **Tailwind CSS**. You can add classes directly to elements: `<div class="bg-red-500 text-white">`.

## 📦 Deployment

This site deploys automatically to **GitHub Pages** via GitHub Actions.
See [dev_docs/deployment_guide.md](dev_docs/deployment_guide.md) for full details.

## 📝 Documentation

- [**Deployment Guide**](dev_docs/deployment_guide.md) - How to go live.
- [**Future Roadmap**](dev_docs/TODO.md) - Recommendations for improvements.
- [**Agent Roles**](AGENTS.md) - Guidelines for AI assistance.
- [**Data Conventions**](src/data/README.md) - Where JSON content files should live.

## 🎨 Branding

- **Primary Color:** APSU Red (`#C41E3A`)
- **Fonts:** Montserrat (Headings), EB Garamond (Body)
