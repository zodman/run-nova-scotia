# Run Nova Scotia — Complete cPanel Deployment Guide

This guide covers deploying the Run Nova Scotia React application to any web host running **cPanel** (e.g. HostGator, Bluehost, Namecheap, SiteGround, InMotion, GoDaddy).

---

## Table of Contents

1. [Overview & Prerequisites](#1-overview--prerequisites)
2. [Why React Single Page Applications Need Special Configuration](#2-why-react-single-page-applications-need-special-configuration)
3. [Method 1: Manual Upload via cPanel File Manager (Recommended)](#3-method-1-manual-upload-via-cpanel-file-manager-recommended)
4. [Method 2: Automated Deployment via cPanel Git Version Control](#4-method-2-automated-deployment-via-cpanel-git-version-control)
5. [Method 3: Upload via FTP / SFTP](#5-method-3-upload-via-ftp--sftp)
6. [Apache `.htaccess` Production Configuration](#6-apache-htaccess-production-configuration)
7. [Deploying to a Subdirectory / Subfolder](#7-deploying-to-a-subdirectory--subfolder)
8. [File Permissions & Security Checklist](#8-file-permissions--security-checklist)
9. [Troubleshooting cPanel Deployments](#9-troubleshooting-cpanel-deployments)

---

## 1. Overview & Prerequisites

Before deploying to cPanel:
- Ensure you have access to your cPanel control panel (usually at `https://yourdomain.com:2083`).
- Ensure your domain or subdomain is pointed to your cPanel account.
- Build the production bundle locally with `npm run build` on your computer.

---

## 2. Why React Single Page Applications Need Special Configuration

In traditional websites, every URL corresponds to a physical file on the server (e.g. `public_html/events.html`). In a React Single Page Application (SPA), all routing is handled dynamically in JavaScript by the browser.

If a user visits your homepage and navigates around, it works fine. However, if they **refresh the page** on a direct URL or deep link, Apache tries to find a physical file or directory. Without proper configuration, Apache returns a **404 Not Found error**.

To resolve this, we provide an optimized `.htaccess` file that routes all non-physical requests back to `index.html`, allowing the React application to handle the route.

---

## 3. Method 1: Manual Upload via cPanel File Manager (Recommended)

This is the most dependable, universal method.

### Step 1: Run the Production Build Locally
In your terminal, navigate to your project root and execute:
```bash
npm run build
```
Verify that the `dist/` directory was created containing:
```
dist/
├── .htaccess           # Automatically copied from public/
├── index.html          # Main HTML entrypoint
├── assets/             # JavaScript and CSS bundles
│   ├── index-[hash].js
│   └── index-[hash].css
└── images/             # Static images
```

### Step 2: Compress the `dist` Folder Contents
- **Windows**:
  1. Open the `dist` folder.
  2. Select all files and folders inside (`Ctrl + A`).
  3. Right-click -> **Send to** -> **Compressed (zipped) folder**.
  4. Name the archive `build.zip`.
- **macOS / Linux**:
  ```bash
  cd dist && zip -r ../build.zip . && cd ..
  ```

> **CRITICAL TIP**: Zip the **contents** of `dist/`, not the `dist/` folder itself. When extracted, `index.html` must sit directly in the root of the archive.

### Step 3: Log in to cPanel
1. Open your browser and navigate to your cPanel login page (e.g. `https://yourdomain.com:2083`).
2. Log in with your cPanel username and password.

### Step 4: Open File Manager
1. In the **Files** section of the cPanel dashboard, click on **File Manager**.
2. Navigate to your website's document root:
   - **Primary Domain**: Double-click into `public_html/`.
   - **Addon Domain or Subdomain**: Double-click into the designated folder (e.g., `public_html/subdomain/` or `run-ns.yourdomain.com/`).

### Step 5: Upload `build.zip`
1. If there are old website files in `public_html/` (excluding `.well-known` or mail folders), delete or back them up.
2. In the top toolbar, click **Upload**.
3. Drag and drop `build.zip` into the upload zone.
4. Wait until the progress bar reaches 100% and turns green.
5. Close the upload tab and return to **File Manager**. Click **Reload** in the top toolbar.

### Step 6: Extract `build.zip`
1. Select `build.zip` by clicking on it.
2. Click **Extract** in the top toolbar (or right-click -> **Extract**).
3. Confirm the extraction path is `/public_html` (or your addon domain path) and click **Extract File(s)**.
4. After extraction, select `build.zip` and click **Delete** to save storage.

### Step 7: Verify the File Structure
Verify that your document root looks like this:
```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── images/
```

### Step 8: Verify the Live Site
Visit your website in your browser:
```
https://yourdomain.com/
```

---

## 4. Method 2: Automated Deployment via cPanel Git Version Control

If your cPanel host provides the **Git™ Version Control** tool, you can deploy directly from your GitHub repository.

### Step 1: Configure `.cpanel.yml`
A `.cpanel.yml.example` file is included in this repository. Create a `.cpanel.yml` in your project root with your actual cPanel username:
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/YOUR_CPANEL_USERNAME/public_html/
    - /bin/cp -R dist/* $DEPLOYPATH
```
Commit and push this file to GitHub.

### Step 2: Set up Repository in cPanel
1. In cPanel, navigate to **Files** -> **Git™ Version Control**.
2. Click **Create**.
3. Toggle **Clone a Repository**.
4. Set **Clone URL**: `https://github.com/zodman/run-nova-scotia.git`.
5. Set **Repository Path**: `repositories/run-nova-scotia`.
6. Set **Repository Name**: `run-nova-scotia`.
7. Click **Create**.

### Step 3: Pull & Deploy
Whenever you push changes to GitHub:
- In cPanel Git Version Control, click **Manage** -> **Pull or Deploy** -> **Deploy HEAD Commit**.
- Or run via SSH terminal:
  ```bash
  cd ~/repositories/run-nova-scotia
  git pull origin main
  npm install
  npm run build
  cp -R dist/* ~/public_html/
  ```

---

## 5. Method 3: Upload via FTP / SFTP

You can also deploy using an FTP client like **FileZilla**, **Cyberduck**, or **WinSCP**:

1. Run `npm run build` on your computer.
2. Open your FTP client and connect to your host:
   - **Host**: `ftp.yourdomain.com` (or server IP)
   - **Username**: Your cPanel username or dedicated FTP account
   - **Password**: Your cPanel / FTP password
   - **Port**: `21` (FTP) or `22` (SFTP)
3. In the **Remote Site** panel (right side), navigate to `public_html/`.
4. In the **Local Site** panel (left side), navigate to your project's `dist/` directory.
5. Select all items inside `dist/` (`index.html`, `.htaccess`, `assets/`, `images/`) and drag them into `public_html/`.
6. Ensure all queued files are transferred successfully.

---

## 6. Apache `.htaccess` Production Configuration

An optimized `.htaccess` file is pre-configured in `public/.htaccess` and automatically copied into `dist/.htaccess` during every build:

```apache
# ==============================================================================
# Run Nova Scotia — Apache / cPanel Production Configuration (.htaccess)
# ==============================================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Force HTTPS (uncomment if SSL is active on your cPanel domain)
  # RewriteCond %{HTTPS} off
  # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # 2. Single Page Application (SPA) Fallback
  # If requested resource is not a physical file or directory, route to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# ==============================================================================
# Performance: Gzip / Deflate Compression
# ==============================================================================
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json application/xml application/rss+xml image/svg+xml
</IfModule>

# ==============================================================================
# Performance: Browser Caching
# ==============================================================================
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"

  # HTML documents (revalidate to ensure users get latest app version)
  ExpiresByType text/html "access plus 0 seconds"

  # CSS and JavaScript assets (Vite generates unique content hashes)
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"

  # Images and Media
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# ==============================================================================
# Security Headers
# ==============================================================================
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

## 7. Deploying to a Subdirectory / Subfolder

If you want to host the website in a subfolder (e.g., `https://yourdomain.com/run-ns/`):

1. **No Vite Configuration Changes Needed**:
   `vite.config.js` is already configured with `base: './'`. All scripts and stylesheets are referenced relatively (`./assets/index-[hash].js`), which works inside any subfolder automatically!
2. **Update `.htaccess` RewriteBase**:
   Open `.htaccess` in your subfolder (`public_html/run-ns/.htaccess`) and update line 8:
   ```apache
   RewriteBase /run-ns/
   ```

---

## 8. File Permissions & Security Checklist

In cPanel Linux environments, incorrect file permissions can trigger `403 Forbidden` or `500 Internal Server Error`:

- **All Directories** (`public_html`, `assets`, `images`): `755` (`drwxr-xr-x`)
- **All Files** (`index.html`, `.htaccess`, `.js`, `.css`, images): `644` (`-rw-r--r--`)

### How to Fix Permissions in cPanel File Manager:
1. Right-click on a file or directory.
2. Select **Change Permissions**.
3. Set the appropriate numeric permission (`755` for directories, `644` for files).

---

## 9. Troubleshooting cPanel Deployments

### Issue 1: Blank White Screen After Upload
- **Cause**: Files were extracted inside an extra nested folder (e.g. `public_html/dist/index.html`).
- **Fix**: Move all files from the nested folder directly into `public_html/`.

### Issue 2: 404 Error on Direct Links or Page Refresh
- **Cause**: Missing or unreadable `.htaccess` file.
- **Fix**: Ensure `.htaccess` is present in `public_html/`. In cPanel File Manager, click **Settings** (top right) and check **Show Hidden Files (dotfiles)** to confirm it exists.

### Issue 3: 403 Forbidden Error
- **Cause**: File permissions are too restrictive.
- **Fix**: Set folder permissions to `755` and file permissions to `644`.

### Issue 4: Updates Not Appearing in Browser
- **Cause**: Browser or Cloudflare caching the old version.
- **Fix**: Perform a hard refresh (`Ctrl + F5` on Windows or `Cmd + Shift + R` on Mac). If using Cloudflare, purge cache from the Cloudflare dashboard.
