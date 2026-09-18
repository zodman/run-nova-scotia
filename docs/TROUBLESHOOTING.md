# Run Nova Scotia — Troubleshooting & FAQ Reference

This document provides resolutions for common issues encountered during development, builds, and hosting on cPanel or GitHub Pages.

---

## Table of Contents

1. [cPanel Hosting Issues](#1-cpanel-hosting-issues)
   - [Blank White Screen After Upload](#blank-white-screen-after-upload)
   - [404 Error on Direct Links or Page Refresh](#404-error-on-direct-links-or-page-refresh)
   - [Cannot See `.htaccess` in cPanel File Manager](#cannot-see-htaccess-in-cpanel-file-manager)
   - [403 Forbidden Error](#403-forbidden-error)
   - [Updates Not Appearing (Caching)](#updates-not-appearing-caching)
2. [Local Development Issues](#2-local-development-issues)
   - [Node.js Version Incompatibility](#nodejs-version-incompatibility)
   - [`EADDRINUSE: port 3000 already in use`](#eaddrinuse-port-3000-already-in-use)
   - [Tailwind CSS Classes Not Applying](#tailwind-css-classes-not-applying)
3. [GitHub Actions CI/CD Issues](#3-github-actions-cicd-issues)
   - [Workflow Fails with Permission Denied](#workflow-fails-with-permission-denied)
   - [Build Succeeds but Pages Site is Blank](#build-succeeds-but-pages-site-is-blank)

---

## 1. cPanel Hosting Issues

### Blank White Screen After Upload
- **Symptom**: You upload your build, visit your website, and see an entirely blank white screen. In the browser developer console (`F12`), you see `404 Not Found` errors for `assets/index-[hash].js` or `assets/index-[hash].css`.
- **Cause**: Files were extracted inside a subfolder (e.g. `public_html/dist/index.html` instead of `public_html/index.html`).
- **Fix**:
  1. Open cPanel **File Manager**.
  2. Double-click into `public_html/dist/`.
  3. Select all items, click **Move** in the top toolbar, and set the destination to `/public_html`.
  4. Verify that `index.html` is located directly in `public_html/`.

---

### 404 Error on Direct Links or Page Refresh
- **Symptom**: The site loads when clicking the root domain, but refreshing on an inner section or following a direct link shows Apache's default `404 Not Found` page.
- **Cause**: The server is missing the `.htaccess` file that routes single-page application URLs back to `index.html`.
- **Fix**:
  1. Ensure `.htaccess` is present in your `public_html/` directory.
  2. Copy the contents of `public/.htaccess` from this repository into your document root.
  3. Verify `RewriteEngine On` and `RewriteRule ^ index.html [L]` are included.

---

### Cannot See `.htaccess` in cPanel File Manager
- **Symptom**: You uploaded `.htaccess`, but it does not show up in the cPanel File Manager file list.
- **Cause**: By default, cPanel hides dotfiles (files starting with a period).
- **Fix**:
  1. In cPanel **File Manager**, click the **Settings** button in the upper right corner.
  2. Check the box: **Show Hidden Files (dotfiles)**.
  3. Click **Save**. The `.htaccess` file will now be visible.

---

### 403 Forbidden Error
- **Symptom**: When visiting your site, Apache displays `403 Forbidden: You don't have permission to access this resource`.
- **Cause**: Directory or file permissions are too restrictive.
- **Fix**:
  1. In cPanel File Manager, right-click on `public_html` (and any subfolders) -> **Change Permissions** -> set to `755` (`rwxr-xr-x`).
  2. Right-click on all files (`index.html`, `.htaccess`, `.js`, `.css`) -> **Change Permissions** -> set to `644` (`rw-r--r--`).

---

### Updates Not Appearing (Caching)
- **Symptom**: You uploaded a new build, but the browser still displays the older version of the site.
- **Cause**: The browser or an intermediary proxy (like Cloudflare or cPanel NGINX cache) is serving a cached copy of `index.html`.
- **Fix**:
  1. Perform a hard reload in your browser: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (macOS).
  2. If your domain uses Cloudflare: Log into your Cloudflare dashboard -> **Caching** -> **Configuration** -> click **Purge Everything**.
  3. In cPanel, if **NGINX Caching** is enabled, click **Clear NGINX Cache** in the cPanel sidebar.

---

## 2. Local Development Issues

### Node.js Version Incompatibility
- **Symptom**: Running `npm run build` or `npm run dev` throws syntax errors or unexpected token errors.
- **Cause**: Node.js version is older than `v18.0.0`.
- **Fix**: Install the latest Node.js LTS version (v20+) from [nodejs.org](https://nodejs.org/). Check your version with `node -v`.

---

### `EADDRINUSE: port 3000 already in use`
- **Symptom**: Starting the dev server outputs `Port 3000 is in use, trying another one...`
- **Cause**: Another terminal or process is currently using port 3000.
- **Fix**:
  - Let Vite automatically select the next available port (e.g. `3001`), or:
  - On Windows: Run `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process` in PowerShell.

---

### Tailwind CSS Classes Not Applying
- **Symptom**: New HTML classes added to components don't change styling.
- **Cause**: The file is outside Tailwind's `content` array in `tailwind.config.js`.
- **Fix**: Verify `tailwind.config.js` includes `./src/**/*.{js,ts,jsx,tsx}` in the `content` array.

---

## 3. GitHub Actions CI/CD Issues

### Workflow Fails with Permission Denied
- **Symptom**: The GitHub Actions runner fails during `actions/deploy-pages@v4`.
- **Cause**: The repository lacks GitHub Pages write permissions.
- **Fix**: In your repository, go to **Settings** -> **Actions** -> **General** -> **Workflow permissions** -> select **Read and write permissions**.

---

### Build Succeeds but Pages Site is Blank
- **Symptom**: GitHub Actions deploys with a green checkmark, but the site is a blank screen.
- **Cause**: Asset paths are absolute (`/assets/`) instead of relative (`./assets/`).
- **Fix**: Ensure `vite.config.js` contains `base: './'`. Run `npm run build` and push to `main`.
