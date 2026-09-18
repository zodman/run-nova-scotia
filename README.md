# Run Nova Scotia — Modern Web Application

[![Deploy to GitHub Pages](https://github.com/zodman/run-nova-scotia/actions/workflows/deploy.yml/badge.svg)](https://github.com/zodman/run-nova-scotia/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Site-GitHub_Pages-FEF000?style=flat&logo=github&logoColor=black)](https://zodman.github.io/run-nova-scotia/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A high-performance, responsive web application for **Run Nova Scotia**, Nova Scotia's governing road racing association founded in 1983. Built with React 18, Vite 6, and Tailwind CSS.

**Live Production URL:** [https://zodman.github.io/run-nova-scotia/](https://zodman.github.io/run-nova-scotia/)

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Local Development & Implementation](#local-development--implementation)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
  - [Local Build Preview](#local-build-preview)
- [Deploying to cPanel](#deploying-to-cpanel)
  - [Method 1: Manual Upload via cPanel File Manager (Recommended)](#method-1-manual-upload-via-cpanel-file-manager-recommended)
  - [Method 2: Automated Deployment via cPanel Git Version Control](#method-2-automated-deployment-via-cpanel-git-version-control)
  - [Method 3: Upload via FTP / SFTP](#method-3-upload-via-ftp--sftp)
- [Apache Server Configuration (.htaccess)](#apache-server-configuration-htaccess)
- [Deploying to a Subdirectory](#deploying-to-a-subdirectory)
- [Troubleshooting & Common Issues](#troubleshooting--common-issues)
- [License & Credits](#license--credits)

---

## Key Features

- **2026–2027 Nova Scotia Road Race Calendar**:
  - 29 sanctioned provincial races spanning all 6 regions of Nova Scotia.
  - Interactive multi-criteria filtering: Season (2026 / 2027), Distance (5K, 10K, Half Marathon, Full Marathon), Region, Status (Upcoming / Completed), and Series Category.
  - **Performance Series (Dr. Jeff Ratushny)** filtering with official scoring rules and prize money details.
  - **Boston Qualifier (BQ)** certified course indicators.
- **Drive Times & Deep Map Links**:
  - Estimated drive times from Halifax/Dartmouth on every event card and modal.
  - Direct Google Maps routing deep links opening with `target="_blank" rel="noopener noreferrer"`.
- **Natural Language Relative Countdowns**:
  - Real-time conversational timing (e.g. *"In 2 days"*, *"In 1 week"*, *"In 1 month"*).
- **Events Pagination**:
  - **12 elements per page in rows of 3 columns** on desktop screens (`lg:grid-cols-3`).
  - Smooth Prev / Next buttons and numbered page navigation.
  - Automatic reset to Page 1 when filters or search queries change.
- **27 Official Nova Scotia Run Clubs & Groups Directory**:
  - Direct directory from [Run Nova Scotia](https://runnovascotia.ca/run-clubs-groups/) covering Halifax Metro, Cape Breton, Annapolis Valley, South Shore, Northern NS, and Province-wide.
  - **6 elements per page in two rows** of 3 columns.
  - Instant live keyword search and regional filter pills.
  - Direct contact buttons to official websites, Facebook pages/groups, Instagram, WhatsApp, email, or telephone.
- **Amazon Mega Dropdown Navigation**:
  - Implements Ben Kamens' directional triangle aiming algorithm (`isPointInTriangle`) preventing flickering or premature menu closing on diagonal cursor movements.
  - 4-column structured Mega Menu for Races & Series.
- **Dual Light / Dark Athletic Themes**:
  - High-contrast accessibility with signature Sunbeam Yellow (`#FEF000`) and Ocean Blue accents.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI component architecture and reactive state |
| **Vite 6** | Rapid HMR development and rollup production bundling |
| **Tailwind CSS 3** | Athletic typography, responsive layouts, and light/dark theme styles |
| **Lucide React** | Lightweight, accessible SVG icons |
| **GitHub Actions** | Automated CI/CD pipeline deploying to GitHub Pages |

---

## Project Architecture

```
run-nova-scotia/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── public/
│   ├── .htaccess               # Apache configuration for cPanel SPA routing & caching
│   └── images/                 # Static brand assets and banners
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header with Amazon mega dropdown aiming technique
│   │   ├── HeroBanner.jsx      # Hero banner with signature featured event
│   │   ├── EventExplorer.jsx   # 29-race calendar with 12-item 3-column pagination
│   │   ├── PerformanceSeries.jsx # Dr. Jeff Ratushny Performance Series spotlight
│   │   ├── CommunitySection.jsx# 27-club directory with 6-item 2-row pagination
│   │   ├── MembershipSection.jsx # Member benefits and registration CTA
│   │   ├── EventModal.jsx      # Detailed event popup with map deep links
│   │   └── Footer.jsx          # Footer links and association metadata
│   ├── data/
│   │   ├── eventsData.js       # 29 sanctioned events, drive times, relative timers
│   │   └── communityData.js    # 27 official running clubs, board & life members
│   ├── App.jsx                 # Main application state and theme provider
│   ├── index.css               # Tailwind directives and custom athletic font styles
│   └── main.jsx                # React DOM entrypoint
├── index.html                  # HTML entrypoint
├── package.json                # Project dependencies and npm scripts
├── tailwind.config.js          # Tailwind theme colors, fonts, and utilities
└── vite.config.js              # Vite configuration (base: './' for relative paths)
```

---

## Local Development & Implementation

### Prerequisites
- **Node.js**: Version `18.0.0` or higher (Node 20+ recommended).
- **npm**: Version `9.0.0` or higher (bundled with Node.js).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zodman/run-nova-scotia.git
   cd run-nova-scotia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000/
```

### Production Build

Compile and bundle the project for production deployment:
```bash
npm run build
```
This generates an optimized, minified production build in the `dist/` directory:
- `dist/index.html`: Entrypoint HTML with injected assets.
- `dist/assets/`: Content-hashed JavaScript and CSS bundles.
- `dist/.htaccess`: Apache configuration file automatically copied from `public/`.
- `dist/images/`: Optimized static images.

### Local Build Preview

Preview the production build locally before uploading:
```bash
npm run preview
```

---

## Deploying to cPanel

cPanel is one of the most widely used web hosting control panels. Deploying this Vite React application to cPanel is straightforward because `vite.config.js` is configured with `base: './'`, which produces **relative asset paths**. This allows the site to work in `public_html/` or any subfolder.

---

### Method 1: Manual Upload via cPanel File Manager (Recommended)

This is the simplest, fastest, and most dependable deployment method.

#### Step 1: Generate the Production Build
On your computer, open a terminal in the project root and run:
```bash
npm run build
```
Verify that the `dist/` folder was created containing `index.html`, `assets/`, `.htaccess`, and `images/`.

#### Step 2: Compress the `dist` Folder
- **Windows**: Open the `dist` folder, select all items inside (`Ctrl+A`), right-click -> **Send to** -> **Compressed (zipped) folder**. Name it `build.zip`.
- **macOS / Linux**: In terminal, run:
  ```bash
  cd dist && zip -r ../build.zip . && cd ..
  ```
> **Important:** Zip the *contents* of the `dist` directory, not the `dist` folder itself. When extracted, `index.html` should sit directly in the root of the zip archive.

#### Step 3: Log In to cPanel
1. Open your browser and go to your cPanel login URL (e.g., `https://yourdomain.com:2083` or `https://cpanel.yourdomain.com`).
2. Log in with your cPanel credentials.

#### Step 4: Open File Manager
1. In the cPanel dashboard, locate the **Files** section and click on **File Manager**.
2. Navigate to your website's document root directory:
   - **Primary Domain**: Navigate to `public_html/`.
   - **Addon Domain or Subdomain**: Navigate to the directory assigned to your domain (e.g., `public_html/your-subdomain/` or `subdomains/run/`).

#### Step 5: Upload and Extract
1. If there are old files in the directory (except for `.well-known` or mail folders), back them up or remove them.
2. In the top toolbar, click **Upload**.
3. Drag and drop `build.zip` into the upload window. Wait for the progress bar to reach 100% and turn green.
4. Return to **File Manager** and click **Reload**.
5. Select `build.zip` and click **Extract** in the top toolbar (or right-click -> **Extract**).
6. Confirm the destination path (e.g., `/public_html`).
7. Delete `build.zip` after extraction to keep your storage clean.

#### Step 6: Verify File Structure
In File Manager, verify that your document root looks like this:
```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── images/
```

#### Step 7: Check File & Directory Permissions
Ensure permissions are set correctly:
- **Directories**: `755` (`drwxr-xr-x`)
- **Files**: `644` (`-rw-r--r--`)

Visit your domain (e.g., `https://yourdomain.com`) in your browser to verify the live application!

---

### Method 2: Automated Deployment via cPanel Git Version Control

If your cPanel host includes the **Git™ Version Control** tool, you can deploy directly from your GitHub repository.

#### Step 1: Create `.cpanel.yml` in Your Repository
Ensure a `.cpanel.yml` file exists in the root of your project:
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/YOUR_CPANEL_USERNAME/public_html/
    - /bin/cp -R dist/* $DEPLOYPATH
```
*(Replace `YOUR_CPANEL_USERNAME` with your actual cPanel username).*

#### Step 2: Configure Git in cPanel
1. In cPanel, navigate to **Files** -> **Git™ Version Control**.
2. Click **Create**.
3. Toggle **Clone a Repository**.
4. Enter the Clone URL: `https://github.com/zodman/run-nova-scotia.git`.
5. Specify the Repository Path (e.g., `repositories/run-nova-scotia`).
6. Enter a repository name and click **Create**.

#### Step 3: Build and Deploy
If SSH terminal access is enabled on your cPanel account:
```bash
ssh your_user@yourdomain.com
cd repositories/run-nova-scotia
git pull origin main
npm install
npm run build
cp -R dist/* ~/public_html/
```
Or use the **Deploy HEAD Commit** button in the cPanel Git Version Control interface.

---

### Method 3: Upload via FTP / SFTP

You can also deploy using an FTP client like **FileZilla** or **Cyberduck**:

1. Run `npm run build` locally.
2. In FileZilla, enter your FTP credentials:
   - **Host**: `ftp.yourdomain.com` or server IP
   - **Username**: Your cPanel username or FTP account
   - **Password**: Your cPanel password
   - **Port**: `21` (FTP) or `22` (SFTP)
3. In the right pane (**Remote site**), navigate to `public_html/`.
4. In the left pane (**Local site**), navigate to your project's `dist/` directory.
5. Select all files inside `dist/` (`index.html`, `.htaccess`, `assets/`, `images/`) and upload them to `public_html/`.

---

## Apache Server Configuration (.htaccess)

The application includes an `.htaccess` file in the `public/` directory, which Vite automatically copies to `dist/.htaccess` on build.

This configuration is critical for cPanel / Apache environments to handle:
1. **Single Page Application (SPA) Routing**: Redirects non-file requests to `index.html`.
2. **Gzip / Deflate Compression**: Reduces transfer size for JavaScript and CSS bundles.
3. **Browser Caching**: Serves immutable cache headers for hashed assets in `assets/`.
4. **Security Headers**: Adds protection against MIME-type sniffing, framing, and XSS.

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Optional: Force HTTPS (uncomment if SSL is active on your domain)
  # RewriteCond %{HTTPS} off
  # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # SPA Fallback: Route all non-existent files to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

---

## Deploying to a Subdirectory

If you are hosting the site in a subdirectory (e.g., `https://yourdomain.com/run-ns/`):

1. **Vite Base Path**:
   `vite.config.js` is already configured with `base: './'`. This uses relative paths for all assets (`./assets/index-xxx.js`), meaning **no configuration change is needed** in Vite!
2. **Update `.htaccess` RewriteBase**:
   If routing inside a subfolder, open `public_html/run-ns/.htaccess` and update:
   ```apache
   RewriteBase /run-ns/
   ```

---

## Troubleshooting & Common Issues

### 1. Blank White Screen After Upload
- **Cause**: Asset paths are trying to load from `/assets/...` instead of `./assets/...`.
- **Solution**: Confirm `vite.config.js` contains `base: './'`. Run `npm run build` and re-upload the contents of `dist/`.

### 2. 404 Error on Page Refresh or Direct URL
- **Cause**: Apache is looking for a physical directory on the server that does not exist.
- **Solution**: Ensure `.htaccess` is uploaded to `public_html/`. In cPanel File Manager, click **Settings** (top right) and check **Show Hidden Files (dotfiles)** to verify that `.htaccess` is present.

### 3. 403 Forbidden Error
- **Cause**: Incorrect file or directory permissions.
- **Solution**:
  - In File Manager, ensure `public_html` and all subdirectories are set to permission `755`.
  - Ensure all files (`index.html`, `.htaccess`, `.js`, `.css`) are set to permission `644`.

### 4. Styles or Changes Not Appearing
- **Cause**: Browser or Cloudflare caching the old version.
- **Solution**:
  - Do a hard refresh in your browser (`Ctrl+F5` on Windows or `Cmd+Shift+R` on Mac).
  - If using Cloudflare, go to the Cloudflare dashboard -> **Caching** -> **Purge Everything**.

---

## License & Credits

- **Organization**: [Run Nova Scotia](https://runnovascotia.ca/) (Operating since 1983).
- **Events Data**: Nova Scotia Road Race Calendar & Dr. Jeff Ratushny Performance Series.
- **Built for**: The Nova Scotia running community.
