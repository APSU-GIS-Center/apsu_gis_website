# GitHub Pages Deployment Guide

This guide details how to deploy the APSU GIS Center website to GitHub Pages using GitHub Actions. This method is free, automated, and recommended for university/non-profit use.

## 1. Prerequisites
*   **GitHub Repository:** Ensure your code is pushed to a repository on GitHub.
*   **Permissions:** You must have admin/settings access to the repository.

## 2. Configuration Check
The project is already pre-configured for GitHub Pages:
*   **Adapter:** `astro.config.mjs` is set to purely static mode (no Vercel/Node adapters).
*   **Workflow:** `.github/workflows/deploy.yml` contains the standard Astro build-and-deploy steps.

## 3. Enable GitHub Pages
You must explicitly enable GitHub Pages to serve from the Actions workflow.

1.  Go to your GitHub Repository.
2.  Click on the **Settings** tab.
3.  In the left sidebar, click on **Pages**.
4.  Under **Build and deployment**:
    *   **Source:** Select **GitHub Actions** from the dropdown.
    *   (Do NOT select "Deploy from a branch").
5.  There is no need to configure a custom domain immediately; it will default to `https://[username].github.io/[repo-name]/`.

## 4. Triggering a Deployment
Deployment is **automatic**.
*   **Push to Main:** Any commit pushed to the `main` branch will automatically trigger the `Deploy to GitHub Pages` workflow.
*   **Monitor:** You can see the progress in the **Actions** tab of your repository.
*   **Success:** Once green, top "deploy" job will show the URL of your live site.

## 5. Troubleshooting
*   **404 on Assets:** If images or styles are missing, check `astro.config.mjs`. You may need to set the `base` path if you are not using a custom domain.
    *   *Example:* If your repo is `apsu-gis-website`, set `base: '/apsu-gis-website'` in `astro.config.mjs`.
*   **Build Failures:** Check the **Actions** logs. Common errors include missing dependencies (run `npm install`) or type errors in `.astro` files.

## 6. Custom Domain (Optional)
To use `apsugis.org`:
1.  Go to **Settings > Pages > Custom domain**.
2.  Enter `apsugis.org` and save.
3.  Update your DNS settings (A record / CNAME) with your registrar to point to GitHub Pages.
