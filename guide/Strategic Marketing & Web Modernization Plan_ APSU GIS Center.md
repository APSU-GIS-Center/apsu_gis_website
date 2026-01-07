# **Strategic Marketing & Web Modernization Plan: APSU GIS Center**

## **I. Executive Summary: The "Bridge" Strategy**

The Austin Peay State University (APSU) GIS Center is currently operating at a high level of technical capability that exceeds its traditional "GIS" branding. While a renaming to the **Austin Peay Solutions, Technology & Applied Research (STAR) Center** is a strategic goal for the future, the Center must currently operate and market itself under its existing name: **APSU GIS Center**.

This creates a unique strategic challenge: **The Center must market "STAR-level" services (drones, app dev, data science) under a "GIS" banner.**

To succeed, this plan proposes a **"Bridge Strategy."** We will not wait for the name change to modernize. Instead, we will upgrade the digital presence and marketing messaging *now* to redefine what "GIS Center" means to the community. By aggressively showcasing advanced capabilities on a new, high-performance website, we will build the brand equity necessary to make the eventual transition to "STAR Center" a logical evolution rather than a jarring rebrand.

## **II. Organizational Analysis & "Perception Debt"**

### **2.1 Current Operational Reality**

For over 23 years, the APSU GIS Center has been a fixture in the Clarksville-Montgomery County region.1 Its operational reality has shifted from simple map-making to complex technology solutions:

* **Disaster Resilience:** A history of rapid response dating back to the 1999 tornado, now augmented by modern UAV (drone) fleets for damage assessment.2  
* **Digital Twinning:** Using Matterport technology to create 3D models of building interiors for facility management and safety planning.3  
* **Custom Development:** Building mobile apps (e.g., "Montgomery County Near Me") and custom dashboards that integrate disparate datasets.2  
* **Specialized Manufacturing:** Offering 3D printing and laser engraving services.3

### **2.2 The "Perception Debt"**

The primary marketing hurdle is "perception debt." External stakeholders view the "GIS Center" as a map-making shop, unaware of its capacity for data science or software engineering.4

* **Risk:** If we market strictly as "GIS," we lose contracts for economic analysis or app development to private firms like **True North** or **Colliers**.5  
* **Mitigation:** The new website must aggressively foreground *solutions* (Public Safety, Economic Development) rather than *tools* (ArcGIS, Maps).

## **III. Visual Identity & Brand Standards (Current Name)**

To maintain professional credibility and prepare for future growth, the new website must strictly adhere to APSU brand standards while adopting a modern aesthetic suitable for a tech consultancy.

### **3.1 Core Brand Elements**

* **Name Usage:** "Austin Peay State University GIS Center" or "APSU GIS Center." Do not use "STAR Center" externally yet.  
* **Primary Color:** **PMS 200 Red** (Hex: \#C41E3A). This must be the primary accent color for buttons, links, and highlights.6  
* **Supporting Palette:**  
  * **Black:** \#000000 (Text/Backgrounds)  
  * **Silver Gray:** \#ADAFAA (PMS 429\)  
  * **Dark Gray:** \#636466 (PMS Cool Gray 10\)  
  * **White:** \#FFFFFF.7  
* **Typography:**  
  * **Primary (Headers):** The official font is **Gotham**. For the website, use **Montserrat** or **Metropolis** as the closest free Google Font alternatives to maintain the "friendly but authoritative" look.  
  * **Secondary (Body):** The official font is **Garamond Pro**. For the web, **Libre Baskerville** or **EB Garamond** are acceptable high-readability substitutes for case studies and reports.6

## **IV. Technical Web Strategy: The "Blackspike" Implementation**

The decision to use **Astro** with the **Blackspike** theme is excellent for performance and SEO, but it requires specific adaptations to serve as a University Center website.

### **4.1 Theme Adaptation Plan**

The Blackspike theme is a *landing page* theme.8 To function as a full Center website, it must be extended:

1. **Multi-Page Architecture:** We must move beyond the single-page scroll. Critical sections (Services, Portfolio, Team) need dedicated pages to improve SEO ranking for specific keywords like "Municipal GIS Services" or "Drone Mapping Tennessee."  
2. **Navigation:** The current "scroll-to" navigation must be replaced with a robust navbar supporting dropdowns for service categories.  
3. **Dynamic Content (JSON):** The Blackspike theme uses JSON to power content.9 We will leverage this to create a "Project Portfolio" collection, allowing student workers to easily add new projects without touching code.

### **4.2 Hosting & Deployment**

* **Platform:** GitHub Pages.  
* **Configuration:** We must configure the astro.config.mjs with the correct site and base settings to ensure assets load correctly from the /apsu\_gis\_website/ subpath.

## **V. Draft Website Content (Current Identity)**

### **5.1 Hero Section**

* **Headline:** Real-World Solutions. University Powered.  
* **Sub-headline:** We bridge the gap between academic innovation and municipal needs. From disaster response to digital twins, the APSU GIS Center delivers cost-effective, data-driven strategies for Tennessee and Kentucky communities.  
* **Primary CTA:** View Our Services  
* **Secondary CTA:** Partner With Us

### **5.2 "About Us" (The University Advantage)**

* **Headline:** The University Geospatial Advantage  
* **Body:** We aren't just a vendor; we are a strategic partner. As a unit of Austin Peay State University, we operate with a mission of public service, not profit. Our "University Advantage" model pairs expert staff with student innovators to deliver professional-grade solutions that maximize your budget while training the next generation of the regional workforce.  
* **Key Stat:** "Serving the region for over 23 years."

### **5.3 Service Pillars (Reframed)**

* **Public Safety & Resilience:** (Keywords: UAV, Drone Mapping, Search & Rescue)  
  * *Draft:* "When seconds count, data matters. We provide rapid aerial mapping and 3D digital twins of critical infrastructure to help First Responders plan, react, and recover."  
* **Municipal Solutions & Stormwater:** (Keywords: MS4, NPDES, Asset Management)  
  * *Draft:* "Regulatory compliance made simple. We help municipalities manage stormwater systems, map utilities, and meet federal mandates without the overhead of enterprise engineering firms."  
* **Data Science & Economic Development:** (Keywords: Site Selection, Demographics, Grant Support)  
  * *Draft:* "Data that drives growth. We use advanced analytics to provide the community snapshots and demographic intelligence you need to win grants and attract business investment."

## **VI. AI Coding Agent Prompt**

**Instructions:** Copy and paste the following prompt into your AI coding agent (e.g., Cursor, GitHub Copilot Workspace, or ChatGPT) to begin the development of the new site.

---

**Role:** You are an expert Web Developer specializing in the Astro web framework, Tailwind CSS v4, and semantic HTML.

**Context:** You are building the new official website for the **Austin Peay State University (APSU) GIS Center**. The site must be professional, accessible, and high-performance. It is currently hosted on GitHub Pages.

**Technical Stack:**

* **Framework:** Astro 5 (latest)  
* **Styling:** Tailwind CSS v4  
* **Theme Base:** "Blackspike" Astro Landing Page Theme (referencing its JSON-content structure and Swiper.js integration).  
* **Deployment:** GitHub Pages (Static generation).

**Design Requirements (Strict Adherence):**

* **Primary Color:** PMS 200 Red \-\> Hex: \#C41E3A. Use this for primary buttons, active states, and borders.  
* **Secondary Colors:** Black (\#000000) and Cool Gray (\#636466).  
* **Fonts:** Use **Montserrat** (Google Font) for Headings (simulating Gotham) and **Libre Baskerville** for Body text.  
* **Logo:** Placeholder for "APSU GIS Center" logo in the navbar.

**Project Tasks (TODO):**

1. **Architecture Update (Multi-Page):**  
   * Convert the Blackspike single-page layout into a multi-page site.  
   * Create the following pages in src/pages/:  
     * index.astro (Home)  
     * services.astro (Detailed service breakdown)  
     * portfolio.astro (Grid of case studies)  
     * about.astro (Team & Mission)  
     * contact.astro (Simple contact form layout)  
2. **Navigation Component:**  
   * Replace the single-page anchor links with real route links (/services, /portfolio, etc.).  
   * Ensure the navbar is responsive (hamburger menu on mobile).  
3. **Content Implementation:**  
   * **Hero:** Update the hero title to: "Real-World Solutions. University Powered." and subtitle to: "The APSU GIS Center delivers cost-effective, data-driven strategies for Tennessee and Kentucky communities."  
   * **Services Section:** Create a 3-column grid featuring:  
     * *Public Safety & Resilience* (Icon: Shield or Drone)  
     * *Municipal Solutions* (Icon: Map or City)  
     * *Economic Data Science* (Icon: Chart or Graph)  
   * **Portfolio Section:** Create a "Latest Work" section using a JSON data source (src/data/projects.json) so we can easily add new case studies later. Add placeholders for "1999 Tornado Response" and "Wetlands Project".  
4. **Footer:**  
   * Include the physical address: "601 N Second St, Clarksville, TN 37044".  
   * Include Copyright: "© 2025 Austin Peay State University GIS Center".  
5. **GitHub Pages Config:**  
   * Ensure astro.config.mjs is set up with:  
     JavaScript  
     export default defineConfig({  
       site: 'https://apsu-gis-center.github.io',  
       base: '/apsu\_gis\_website',  
     })

**Aesthetic Note:** The site should feel like a modern tech consultancy (clean, white space, crisp typography) but anchored by the authoritative University Red (\#C41E3A). Avoid "playful" animations; use "Linear Easing" for professional, smooth transitions.

Immediate Action:  
Please generate the file structure and the code for the src/pages/index.astro and the src/components/Navbar.astro based on these requirements.

#### ---

**Works cited**

1. The APSU GIS Center \- ArcGIS StoryMaps, accessed January 6, 2026, [https://storymaps.arcgis.com/stories/c9984ff835b440b7a28202565124f40e](https://storymaps.arcgis.com/stories/c9984ff835b440b7a28202565124f40e)  
2. Austin Peay State University GIS Center: Home, accessed January 6, 2026, [https://apsugis.help/](https://apsugis.help/)  
3. APSU GIS Center \- a Unit of Austin Peay State University, accessed January 6, 2026, [https://apsugis.org/](https://apsugis.org/)  
4. Strategic Plan: Austin Peay Solutions, Technology & Applied Research (STAR) Center  
5. GIS Center Marketing Plan  
6. APSU-University-Brand-Guide.pdf  
7. Colors \- Austin Peay State University, accessed January 6, 2026, [https://www.apsu.edu/identity/colors.php](https://www.apsu.edu/identity/colors.php)  
8. blackspike astro landing page, accessed January 6, 2026, [https://astro-theme.blackspike.com/](https://astro-theme.blackspike.com/)  
9. blackspike astro landing page | Astro, accessed January 6, 2026, [https://astro.build/themes/details/blackspike-astro-landing-page/](https://astro.build/themes/details/blackspike-astro-landing-page/)