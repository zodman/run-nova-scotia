# Run Nova Scotia — GitHub Pages CI/CD Deployment Guide

This guide explains how the continuous integration and continuous deployment (CI/CD) pipeline deploys the application to **GitHub Pages**.

---

## Table of Contents

1. [Workflow Overview](#1-workflow-overview)
2. [Workflow File Structure (`deploy.yml`)](#2-workflow-file-structure-deployyml)
3. [Repository Configuration & Permissions](#3-repository-configuration--permissions)
4. [Live Production URL & Verification](#4-live-production-url--verification)
5. [Configuring a Custom Domain (Optional)](#5-configuring-a-custom-domain-optional)

---

## 1. Workflow Overview

Every time code is pushed to the `main` branch, a GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Provisions an Ubuntu Linux runner.
2. Checks out the repository code.
3. Sets up Node.js 20 LTS.
4. Installs dependencies cleanly using `npm ci`.
5. Compiles the production build with `npm run build`.
6. Configures GitHub Pages artifact upload.
7. Deploys the compiled assets to the GitHub Pages hosting environment.

**Deployment time is typically 20 to 35 seconds.**

---

## 2. Workflow File Structure (`deploy.yml`)

Located at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 3. Repository Configuration & Permissions

For the workflow to succeed, GitHub Pages must be configured in your repository settings:

1. In your GitHub repository, navigate to **Settings** -> **Pages**.
2. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**.
3. Under **Settings** -> **Actions** -> **General**:
   - **Workflow permissions**: Ensure **Read and write permissions** or the explicit permissions in `deploy.yml` are allowed.

---

## 4. Live Production URL & Verification

Once deployed, the live website is available at:
```
https://zodman.github.io/run-nova-scotia/
```

To check deployment status using the GitHub CLI:
```bash
gh run list --limit 3
gh run watch <run-id>
```

---

## 5. Configuring a Custom Domain (Optional)

To point a custom domain (e.g. `races.runnovascotia.ca` or `www.runnovascotia.ca`) to GitHub Pages:

1. In your repository, go to **Settings** -> **Pages**.
2. Under **Custom domain**, enter your domain name (e.g. `races.runnovascotia.ca`) and click **Save**.
3. In your DNS provider (cPanel Zone Editor, Cloudflare, or GoDaddy), add the appropriate DNS record:
   - For an **Apex domain** (`runnovascotia.ca`): Add `A` records pointing to GitHub IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - For a **Subdomain** (`races.runnovascotia.ca`): Add a `CNAME` record pointing to:
     - `zodman.github.io`
4. Check **Enforce HTTPS** in GitHub Pages settings.
