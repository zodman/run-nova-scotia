# Run Nova Scotia — Official Web Application & Platform Documentation

[![Deploy to GitHub Pages](https://github.com/zodman/run-nova-scotia/actions/workflows/deploy.yml/badge.svg)](https://github.com/zodman/run-nova-scotia/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Site-GitHub_Pages-FEF000?style=flat&logo=github&logoColor=black)](https://zodman.github.io/run-nova-scotia/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, high-performance, mobile-responsive web platform built for **Run Nova Scotia**, Nova Scotia's governing road racing association founded in 1983. The application features an interactive 2026–2027 road race calendar, Boston Qualifier certifications, the Dr. Jeff Ratushny Performance Series, drive times from Halifax/Dartmouth with Google Maps deep links, natural language relative countdowns, an authentic 27-club provincial running directory, Amazon mega dropdown directional aiming navigation, dual light/dark themes, and automated multi-row pagination.

- **Live Production URL:** [https://zodman.github.io/run-nova-scotia/](https://zodman.github.io/run-nova-scotia/)
- **GitHub Repository:** [https://github.com/zodman/run-nova-scotia](https://github.com/zodman/run-nova-scotia)

---

## Table of Contents

1. [About Run Nova Scotia](#1-about-run-nova-scotia)
2. [Master Feature Catalog](#2-master-feature-catalog)
   - [2.1 Provincial Road Race Calendar](#21-provincial-road-race-calendar)
   - [2.2 Drive Times & Google Maps Deep Links](#22-drive-times--google-maps-deep-links)
   - [2.3 Conversational Relative Countdowns](#23-conversational-relative-countdowns)
   - [2.4 Events Pagination (12 Items, Rows of 3)](#24-events-pagination-12-items-rows-of-3)
   - [2.5 Dr. Jeff Ratushny Performance Series](#25-dr-jeff-ratushny-performance-series)
   - [2.6 Nova Scotia Run Clubs Directory](#26-nova-scotia-run-clubs-directory)
   - [2.7 Run Clubs Pagination (6 Items, Two Rows)](#27-run-clubs-pagination-6-items-two-rows)
   - [2.8 Amazon Mega Dropdown Aiming Navigation](#28-amazon-mega-dropdown-aiming-navigation)
   - [2.9 Dual Light & Dark Themes](#29-dual-light--dark-themes)
   - [2.10 Technical Race Modal](#210-technical-race-modal)
3. [Data Architecture & Schemas](#3-data-architecture--schemas)
   - [3.1 Events Data Schema (`eventsData.js`)](#31-events-data-schema-eventsdatajs)
   - [3.2 Community & Clubs Schema (`communityData.js`)](#32-community--clubs-schema-communitydatajs)
   - [3.3 Time & Date Helper Functions](#33-time--date-helper-functions)
   - [3.4 How to Add New Events or Clubs](#34-how-to-add-new-events-or-clubs)
4. [Component Architecture](#4-component-architecture)
5. [Local Development & Implementation](#5-local-development--implementation)
   - [5.1 Prerequisites](#51-prerequisites)
   - [5.2 Installation](#52-installation)
   - [5.3 Development Server](#53-development-server)
   - [5.4 Production Build](#54-production-build)
   - [5.5 Local Preview](#55-local-preview)
6. [Complete cPanel Deployment Guide](#6-complete-cpanel-deployment-guide)
   - [6.1 Why Single Page Applications Need Special Configuration](#61-why-single-page-applications-need-special-configuration)
   - [6.2 Method 1: Manual Upload via cPanel File Manager (Recommended)](#62-method-1-manual-upload-via-cpanel-file-manager-recommended)
   - [6.3 Method 2: Automated Deployment via cPanel Git Version Control](#63-method-2-automated-deployment-via-cpanel-git-version-control)
   - [6.4 Method 3: Upload via FTP / SFTP](#64-method-3-upload-via-ftp--sftp)
   - [6.5 Apache `.htaccess` Production Configuration](#65-apache-htaccess-production-configuration)
   - [6.6 Deploying to a Subdirectory / Subfolder](#66-deploying-to-a-subdirectory--subfolder)
   - [6.7 File Permissions Checklist](#67-file-permissions-checklist)
7. [GitHub Pages & CI/CD Pipeline](#7-github-pages--cicd-pipeline)
8. [Design System & Styling Standards](#8-design-system--styling-standards)
9. [Troubleshooting & FAQs](#9-troubleshooting--faqs)
10. [License & Credits](#10-license--credits)

---

## 1. About Run Nova Scotia

**Run Nova Scotia (Run NS)** is an independent, non-profit governing body dedicated to promoting road running and healthy active living across the province of Nova Scotia, Canada. Founded in 1983, Run Nova Scotia sanctions over 25 provincial road races each year, coordinates the prestigious **Dr. Jeff Ratushny Performance Series**, oversees the **Youth Running Series**, tracks provincial age-group records, and provides race directors with chip timing, insurance, and equipment support.

This web application replaces legacy static layouts with an athletic, high-contrast, interactive digital portal that serves competitive racers, casual weekend runners, youth participants, race directors, and affiliated running clubs.

---

## 2. Master Feature Catalog

### 2.1 Provincial Road Race Calendar
- **29 Sanctioned Provincial Events**: Full coverage of the 2026 and 2027 road racing seasons across all 6 regions of Nova Scotia: Halifax Metro, South Shore, Annapolis Valley, Cape Breton, Northern Nova Scotia, and Province-wide.
- **Chronological Pending-First Sorting**:
  - Upcoming (pending) races are sorted chronologically from soonest to furthest in the future.
  - Completed races are sorted in reverse chronological order (most recently completed first).
  - Highlighting ensures runners immediately see the next actionable races to register for.
- **Multi-Criteria Filtering**:
  - **Season Filter**: `2026 Season`, `2027 Season`, or `All Seasons`.
  - **Status Tabs**: `All Races`, `Upcoming Races` (with animated flame pulse badge), and `Completed Races` (with checkmark badge).
  - **Series Filter**: `All Series`, `Normal Series`, `Performance Series`, and `Extra Events`.
  - **Distance Pills**: `All`, `5K`, `10K`, `Half Marathon`, `Full Marathon`.
  - **Regional Filter**: `All Nova Scotia`, `Halifax Metro`, `South Shore`, `Annapolis Valley`, `Cape Breton`, `Northern NS`.
  - **Real-Time Search**: Matches race titles, cities/towns, organizers, or years with instant zero-lag response.
- **Boston Qualifier (BQ) Certified Indicators**: Badges denote officially certified courses for Boston Marathon qualifying standards (e.g. Fredericton Marathon, Blue Nose Marathon, Prince Edward Island Marathon).
- **Direct Anchor Link**: `#events` section header includes a clickable `#events-header-direct-link` badge and link allowing deep linking directly to the calendar from social media or email campaigns.

### 2.2 Drive Times & Google Maps Deep Links
- **Drive Time from Halifax / Dartmouth**:
  - Each event card and technical modal displays the estimated driving duration from the Halifax/Dartmouth metropolitan area (e.g., `"1 hr (tentative - needs confirm)"`, `"2 hr 45 min"`, `"25 min"`).
- **Direct Google Maps Deep Links**:
  - Clickable Google Maps routing links (`target="_blank" rel="noopener noreferrer"`) automatically pre-fill the race location (e.g. `https://www.google.com/maps/search/?api=1&query=Ingonish%2C+Nova+Scotia`) so runners can navigate to race headquarters with one tap on mobile.

### 2.3 Conversational Relative Countdowns
- Natural language countdown indicators built via date arithmetic helpers:
  - **Compact Badges** on race media ribbons: `"In 2 days"`, `"In 1 week"`, `"In 3 weeks"`, `"In 1 month"`, `"In 5 months"`.
  - **Conversational Schedule Rows**: Detailed timing strings such as `"In 1 week (8 days)"`, `"In 3 weeks (23 days)"`, `"In 1 month (30 days)"`.
  - **Hero Banner Spotlight**: Prominent `"Happens In 3 weeks (23 days)"` counter for the featured signature race.

### 2.4 Events Pagination (12 Items, Rows of 3)
- **4 Rows of 3 Elements on Desktop**: Configured with `EVENTS_PER_PAGE = 12`. On large displays (`lg:grid-cols-3`), 12 event cards produce exactly **4 rows of 3 columns**, eliminating infinite scrolling.
- **Controls & Accessibility**:
  - **Prev Button** (`#events-pagination-prev`): Disables cleanly on Page 1 (`opacity-40 cursor-not-allowed`).
  - **Numbered Page Buttons** (`#events-page-${pageNum}`): Active page highlighted in bold Sunbeam Yellow (`bg-volt text-black font-extrabold`) with `aria-current="page"`.
  - **Next Button** (`#events-pagination-next`): Disables on the last page.
  - **Context Counter**: `Showing 1–12 of 29 events • Page 1 of 3`.
- **Reactive Filter Reset**: Applying any filter (Season, Distance, Region, Status, Search) automatically resets pagination to Page 1.
- **Smooth Viewport Reset**: Changing pages smoothly scrolls the window to the top of `#events`.

### 2.5 Dr. Jeff Ratushny Performance Series
- Dedicated spotlight for the prestigious **Dr. Jeff Ratushny Performance Series**:
  - Distinct event category: `category: 'PERFORMANCE'` in `eventsData.js`.
  - Official rules: scoring top performances across sanctioned 5K, 10K, and Half Marathon events.
  - Trophy ribbons and cash prize purse information ($2,000+ prize purse, annual trophies awarded at the year-end awards banquet).
  - Direct filtering linking the Performance Series banner directly into the calendar.

### 2.6 Nova Scotia Run Clubs Directory
- **27 Authentic Nova Scotia Clubs & Training Packs**: Extracted from the official [Run Nova Scotia Club Directory](https://runnovascotia.ca/run-clubs-groups/):
  - **Halifax Metro (14)**: Halifax Road Hammers, North End Runners (NER), Easy Breezy Run Club, Halifax Trail Runners, Dartmouth Runners Association, Cole Harbour Runners, Fast Company Running Club, BLT Runners, Halifax Running Club, Heart and Sole Running Club, Sober Friends Run Crew, Halifax Road Runners, Halifax Velocity Runners, Girls Gone Gazelle Run Club.
  - **Cape Breton (3)**: Cape Breton Road Runners Club (Sydney), North Of Smokey Runners (Highlands / Cabot Trail), Isle Madame She's Fast (Arichat).
  - **Northern Nova Scotia (4)**: Hubtown Runners (Truro / Victoria Park), Antigonish County Running Club, The Amherst Striders Running Club, Pictou County Athletics / River Runners (New Glasgow).
  - **Annapolis Valley (2)**: The Scotiables (Port Williams), Valley Harriers (Wolfville / Acadia).
  - **South Shore (2)**: Lunenburg Run Club, The Running Mafia (Barrington Passage).
  - **Province-Wide / Youth (2)**: Kids Run Club (Doctors NS across 200+ schools), TurtleRunners (inclusive interval pack).
- **Rich Card Layout**:
  - Sunbeam Yellow City badge and Region tag.
  - Structured Location (`MapPin`) and Weekly Schedule (`Clock`).
  - Club Focus description block.
  - Categorical hashtags (`#Trail`, `#Marathon`, `#Track`, `#Women's Running`, `#Youth`, `#Social`).
  - Direct Action Button: Link opening official website, Facebook page/group, Instagram profile, WhatsApp community, email, or telephone with `target="_blank" rel="noopener noreferrer"`.
- **Live Search & Regional Filter Pills**: Instant search input plus 7 region filter buttons with live club count indicators.
- **Community Leadership Tabs**:
  - Run Clubs (27)
  - Volunteer Management Board (6 executive portraits, roles, and bios)
  - Honorary Life Members (12 Hall of Distinction inductees honoring 40+ years of road race builders)

### 2.7 Run Clubs Pagination (6 Items, Two Rows)
- **Exactly 2 Rows of 3 Elements**: Configured with `CLUBS_PER_PAGE = 6`. On desktop screens (`lg:grid-cols-3`), cards render in **2 rows of 3 columns**.
- **Pagination Bar**: Prev / Next controls, numbered page buttons (1 through 5), and counter (`Showing 1–6 of 27 clubs • Page 1 of 5`).
- **Auto-Reset**: Changing region tabs or typing into the search bar automatically resets the view to Page 1.

### 2.8 Amazon Mega Dropdown Aiming Navigation
- **Directional Triangle Aiming Algorithm**:
  - Implements the classic Amazon dropdown technique documented by [Ben Kamens](https://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown).
  - Solves the **"whack-a-mole" problem**: when a user moves their mouse diagonally from a top-level nav link toward an open submenu, the cursor briefly hovers over adjacent menu items, which would normally close the intended dropdown.
  - Mathematically tracks the cursor trajectory vector $(P_{prev} \to P_{curr})$ and computes whether it falls inside the 2D triangle formed between the cursor and the extremities of the active dropdown panel using barycentric / cross-product coordinates (`isPointInTriangle`).
  - If the cursor is aiming into the dropdown, menu closures are deferred via a 300ms safety timeout that cancels immediately when entering the dropdown.
  - If the cursor moves outside the triangle (e.g. sideways to another top-level nav item), menus switch instantaneously with zero lag.
- **4-Column Structured Mega Menu ("Races & Series")**:
  - Column 1: Road Race Series (Schedule, Boston Qualifiers, Divisions).
  - Column 2: Performance Series (Dr. Jeff Ratushny, Scoring Rules, Cash Prizes).
  - Column 3: Youth & Special Events (Youth Series, Fun Runs, Awards Banquet).
  - Column 4: Timing & Racer Resources (Atlantic Chip Timing, Points System, Member Discounts).
  - Footer Callout: Run NS 40-year heritage badge and "Join Run NS" CTA.
- **Structured "About" Dropdown**: Multi-item dropdown covering About Run NS, Member # lookup, Executive Board, Life Members, and Sponsors.

### 2.9 Dual Light & Dark Themes
- **Athletic Dark Theme**: Deep slate-navy base (`#040b17` / `#0b1627`), crisp white typography, and vibrant Sunbeam Yellow (`#FEF000`) accents.
- **High-Contrast Light Theme**: Clean slate-white base (`#f8fafc`), dark slate typography (`text-slate-900`), and ocean blue accents.
- **Theme Persistence**: Synced with `localStorage` and `document.documentElement.classList`.

### 2.10 Technical Race Modal
- Comprehensive technical race packet popup:
  - High-resolution hero header with date, season, and BQ certification tags.
  - Distance options and course elevation overview.
  - Estimated drive time from Halifax/Dartmouth with Google Maps route deep link.
  - Registration status, entry fee schedule, and registration button.
  - Atlantic Chip timing standards and course record details.

---

## 3. Data Architecture & Schemas

The application is powered by modular, typed data modules in `src/data/`:

### 3.1 Events Data Schema (`eventsData.js`)

Each race event adheres to the following data contract:

```javascript
{
  id: 1,                                       // Unique numeric ID
  name: "Sole Sisters Women's Half & 5K",      // Full event name
  date: "October 3, 2026",                     // Human-readable date string
  isoDate: "2026-10-03T09:00:00",              // ISO 8601 timestamp for sorting and countdown calculations
  year: 2026,                                  // Numeric season (2026 or 2027)
  location: "Dartmouth Crossing, Dartmouth",   // Venue or town
  region: "Halifax Metro",                     // Geographic region
  distances: ["5K", "Half Marathon"],          // Array of race distances
  category: "PERFORMANCE",                     // 'NORMAL' | 'PERFORMANCE' | 'EXTRA'
  elevation: "Rolling Hills (+85m)",           // Elevation and terrain profile
  driveTimeFromHalifax: "15 min",              // Estimated drive time from Halifax/Dartmouth
  mapsUrl: "https://www.google.com/maps/...",  // Direct Google Maps deep link
  description: "Canada's largest all-women...",// Event overview
  organizer: "Sole Sisters Society",           // Organizing body
  registrationUrl: "https://...",              // Direct race roster / registration link
  resultsUrl: "https://atlanticchip.ca",       // Direct Atlantic Chip results URL
  isBostonQualifier: false,                    // BQ certification flag
  image: "https://images.unsplash.com/..."    // High-resolution photography URL
}
```

### 3.2 Community & Clubs Schema (`communityData.js`)

Each running club adheres to the following contract:

```javascript
{
  id: 1,                                       // Unique numeric ID
  name: "Halifax Road Hammers",                // Official club name
  city: "Halifax",                             // City or town
  region: "Halifax Metro",                     // Geographic region
  location: "Point Pleasant Park, Commons",   // Specific meeting spot
  meets: "Tuesday / Thursday track & long run",// Weekly schedule
  focus: "Competitive & recreational road...", // Club mission and target runners
  contact: "hfxroadhammers.com",               // Display contact label
  website: "http://www.hfxroadhammers.com/",   // Target URL or contact link
  linkType: "website",                         // 'website' | 'facebook' | 'instagram' | 'whatsapp' | 'email' | 'phone'
  tags: ["Competitive", "Marathon", "Track"]   // Filterable hashtags
}
```

### 3.3 Time & Date Helper Functions

Exported from `src/data/eventsData.js`:
- `isEventPending(isoDate)`: Compares the event date with `new Date()`. Returns `true` if the event is in the future.
- `getEventDaysDelta(isoDate)`: Calculates the exact positive integer difference in days between today and the event.
- `getEventRelativeTime(isoDate)`: Returns conversational countdown strings:
  - `days === 0`: `"Today!"`
  - `days === 1`: `"Tomorrow"`
  - `days < 7`: `"In X days"`
  - `days < 30`: `"In X week(s) (Y days)"`
  - `days >= 30`: `"In X month(s) (Y days)"`
- `getEventRelativeTimeCompact(isoDate)`: Returns compact ribbon strings (e.g. `"In 2 days"`, `"In 1 week"`, `"In 1 month"`).

### 3.4 How to Add New Events or Clubs

#### Adding a New Race Event:
1. Open `src/data/eventsData.js`.
2. Append a new event object to the `eventsData` array following the schema above.
3. Ensure `isoDate` is in `YYYY-MM-DDTHH:MM:SS` format.
4. Set `category` to `'NORMAL'`, `'PERFORMANCE'`, or `'EXTRA'`.
5. Save the file. Vite Hot Module Replacement (HMR) will update the UI immediately without a page reload.

#### Adding a New Running Club:
1. Open `src/data/communityData.js`.
2. Append a new club object to the `runClubsData` array following the schema above.
3. Choose a valid `region` (`'Halifax Metro'`, `'Cape Breton'`, `'Annapolis Valley'`, `'South Shore'`, `'Northern NS'`, or `'Province-wide'`).
4. Save the file. Regional filter pills and pagination will adjust automatically.

---

## 4. Component Architecture

| Component File | Role / Responsibility | Key DOM IDs |
| :--- | :--- | :--- |
| `src/components/Navbar.jsx` | Fixed header, theme toggle, mobile drawer, and Amazon Mega Dropdown aiming algorithm. | `#main-navbar`, `#nav-dropdown-races-series`, `#nav-mega-dropdown`, `#nav-theme-toggle` |
| `src/components/HeroBanner.jsx` | Visual brand header, quick association stats, and signature featured event spotlight. | `#hero-banner`, `#hero-featured-event`, `#hero-featured-register-btn` |
| `src/components/EventExplorer.jsx` | Core provincial calendar with 29 events, 12-item 3-column pagination, filters, and search. | `#events`, `#events-grid`, `#events-pagination-prev`, `#events-pagination-next` |
| `src/components/PerformanceSeries.jsx` | Dr. Jeff Ratushny Performance Series spotlight, scoring rules, prize money, qualifying races. | `#performance-series`, `#performance-banner`, `#performance-scoring-table` |
| `src/components/CommunitySection.jsx` | 27 running clubs directory with 6-item 2-row pagination, search, filters, Board, and Life Members. | `#community-section`, `#community-clubs-grid`, `#community-clubs-pagination-prev` |
| `src/components/MembershipSection.jsx` | Run NS membership value proposition, registration tier cards, and member discount benefits. | `#membership-section`, `#membership-join-btn` |
| `src/components/EventModal.jsx` | Full-screen accessible modal popup displaying technical race brief, elevation, and deep links. | `#event-modal-overlay`, `#event-modal-content`, `#event-modal-register-btn` |
| `src/components/Footer.jsx` | Comprehensive footer with links, series sponsors, contact details, and non-profit disclaimer. | `#main-footer`, `#footer-links-grid` |

---

## 5. Local Development & Implementation

### 5.1 Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ LTS recommended). Check with:
  ```bash
  node -v
  ```
- **npm**: `v9.0.0` or higher. Check with:
  ```bash
  npm -v
  ```
- **Git**: Installed and available in your terminal path.

### 5.2 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zodman/run-nova-scotia.git
   cd run-nova-scotia
   ```

2. **Install node dependencies:**
   ```bash
   npm install
   ```

### 5.3 Development Server

Launch the Vite local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000/`. The development server supports instant Hot Module Replacement (HMR).

### 5.4 Production Build

Compile and bundle the project for production deployment:
```bash
npm run build
```
This runs `vite build`, which creates an optimized, minified bundle in the `dist/` directory:
- `dist/index.html`: Entrypoint HTML with injected hashed script and style links.
- `dist/assets/`: Content-hashed JavaScript and CSS chunks.
- `dist/.htaccess`: Apache configuration file automatically copied from `public/`.
- `dist/images/`: Static image assets.

### 5.5 Local Preview

Test the production build locally before uploading:
```bash
npm run preview
```
Open the provided URL (typically `http://localhost:4173/`) to verify production behavior.

---

## 6. Complete cPanel Deployment Guide

cPanel is the industry-standard hosting control panel used by most shared, reseller, and VPS hosting providers (e.g., HostGator, Bluehost, SiteGround, Namecheap, InMotion, GoDaddy).

This React application is pre-configured for cPanel hosting out of the box. Because `vite.config.js` specifies `base: './'`, all generated assets use **relative paths**, ensuring the site works in the domain root (`public_html/`) or any subdirectory.

---

### 6.1 Why Single Page Applications Need Special Configuration

In traditional websites, every URL corresponds to a physical file on the server (e.g. `/events.html`). In a React Single Page Application (SPA), the browser uses client-side routing. If a user refreshes the page or bookmarks a sub-path, an unconfigured Apache server will look for a physical folder and return a **404 Not Found error**.

To fix this, the provided `.htaccess` file instructs Apache to route all non-file requests back to `index.html`, allowing React to handle the route seamlessly.

---

### 6.2 Method 1: Manual Upload via cPanel File Manager (Recommended)

This is the most reliable, foolproof method for any cPanel account.

#### Step 1: Build the Project Locally
In your local project terminal, run:
```bash
npm run build
```
Ensure the `dist/` directory is created.

#### Step 2: Compress the `dist` Folder
- **Windows**:
  1. Open the `dist` directory.
  2. Select all items (`Ctrl + A`).
  3. Right-click -> **Send to** -> **Compressed (zipped) folder**.
  4. Name the archive `build.zip`.
- **macOS / Linux**:
  ```bash
  cd dist && zip -r ../build.zip . && cd ..
  ```
> **CRITICAL TIP**: Make sure you zip the **contents** of `dist`, not the `dist` folder itself. When extracted, `index.html` must be in the root of the archive.

#### Step 3: Log in to cPanel
1. Navigate to your cPanel URL (e.g., `https://yourdomain.com:2083` or `https://cpanel.yourdomain.com`).
2. Log in with your username and password.

#### Step 4: Open File Manager
1. Under the **Files** section, click on **File Manager**.
2. Navigate to your target document root:
   - **Main / Primary Domain**: Double-click into `public_html/`.
   - **Subdomain or Addon Domain**: Double-click into the folder assigned to that domain (e.g. `public_html/race/` or `subdomains/race/`).

#### Step 5: Upload `build.zip`
1. Click the **Upload** icon in the top toolbar.
2. Drag and drop `build.zip` into the upload zone.
3. Wait until the progress bar reaches 100% and turns green.
4. Close the upload tab and return to **File Manager**. Click **Reload** in the top toolbar.

#### Step 6: Extract the Archive
1. Click on `build.zip` to select it.
2. Click **Extract** in the top toolbar (or right-click -> **Extract**).
3. Verify the destination path is `/public_html` (or your addon directory) and click **Extract File(s)**.
4. After extraction, select `build.zip` and click **Delete** to save disk space.

#### Step 7: Verify Document Root Layout
Ensure your directory looks exactly like this:
```
public_html/
├── .htaccess           <-- Apache configuration
├── index.html          <-- Main application entrypoint
├── assets/             <-- Compiled JS and CSS bundles
│   ├── index-[hash].js
│   └── index-[hash].css
└── images/             <-- Static race and brand imagery
```

#### Step 8: Test the Live Site
Visit your domain in any browser:
```
https://yourdomain.com/
```

---

### 6.3 Method 2: Automated Deployment via cPanel Git Version Control

If your cPanel plan includes **Git™ Version Control**, you can automate deployments directly from this GitHub repository.

#### Step 1: Configure `.cpanel.yml`
A `.cpanel.yml.example` file is included in this repository. Create a `.cpanel.yml` file in your repository root with your actual cPanel username:
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/YOUR_CPANEL_USERNAME/public_html/
    - /bin/cp -R dist/* $DEPLOYPATH
```
Commit and push this file to GitHub.

#### Step 2: Clone Repository in cPanel
1. Log in to cPanel -> **Files** -> **Git™ Version Control**.
2. Click **Create**.
3. Set **Clone URL**: `https://github.com/zodman/run-nova-scotia.git`.
4. Set **Repository Path**: `repositories/run-nova-scotia`.
5. Set **Repository Name**: `run-nova-scotia`.
6. Click **Create**.

#### Step 3: Trigger Deployments
Whenever you push changes to `main`, either:
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

### 6.4 Method 3: Upload via FTP / SFTP

You can also deploy using an FTP client like **FileZilla**, **Cyberduck**, or **WinSCP**:

1. Run `npm run build` locally.
2. In FileZilla, enter your connection details:
   - **Host**: `ftp.yourdomain.com` (or your server IP)
   - **Username**: Your cPanel username or dedicated FTP account
   - **Password**: Your cPanel / FTP password
   - **Port**: `21` (FTP) or `22` (SFTP)
3. In the **Remote Site** pane (right side), navigate to `public_html/`.
4. In the **Local Site** pane (left side), navigate to your project's `dist/` directory.
5. Select all items inside `dist/` (`index.html`, `.htaccess`, `assets/`, `images/`) and drag them into `public_html/`.
6. Wait for all queued transfers to complete.

---

### 6.5 Apache `.htaccess` Production Configuration

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

  # HTML documents (always revalidate to ensure instant updates)
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

### 6.6 Deploying to a Subdirectory / Subfolder

If your website is hosted inside a subfolder (e.g., `https://yourdomain.com/run-ns/`):

1. **No Vite Configuration Changes Needed**:
   `vite.config.js` is already configured with `base: './'`. All scripts and stylesheets are referenced relatively (`./assets/index-xxx.js`), which works inside any subfolder automatically!
2. **Update `.htaccess` RewriteBase**:
   Open `.htaccess` in your subfolder (`public_html/run-ns/.htaccess`) and update line 8:
   ```apache
   RewriteBase /run-ns/
   ```

---

### 6.7 File Permissions Checklist

In cPanel Linux environments, incorrect file permissions can trigger `403 Forbidden` or `500 Internal Server Error`:

- **All Directories** (`public_html`, `assets`, `images`): `755` (`drwxr-xr-x`)
- **All Files** (`index.html`, `.htaccess`, `.js`, `.css`, images): `644` (`-rw-r--r--`)

To fix permissions in cPanel File Manager:
1. Right-click on a file or folder.
2. Select **Change Permissions**.
3. Set the appropriate numeric permission (`755` for folders, `644` for files).

---

## 7. GitHub Pages & CI/CD Pipeline

The project includes an automated Continuous Integration and Continuous Deployment (CI/CD) pipeline powered by **GitHub Actions** located at `.github/workflows/deploy.yml`.

### How It Works:
1. Every `git push` to the `main` branch triggers the `Deploy to GitHub Pages` workflow.
2. The workflow spins up an Ubuntu runner, checks out the code, sets up Node.js 20, runs `npm ci`, and executes `npm run build`.
3. The resulting `dist/` directory is uploaded as a GitHub Pages artifact and published automatically to the live URL:
   [https://zodman.github.io/run-nova-scotia/](https://zodman.github.io/run-nova-scotia/)

---

## 8. Design System & Styling Standards

The visual design language is inspired by high-performance athletic apparel and modern marathon branding:

- **Primary Accent ("Volt" / Sunbeam Yellow)**: `#FEF000` — High-energy athletic yellow used for badges, active tabs, countdown ribbons, and primary CTA buttons. Always paired with dark black text (`text-black font-bold`) for AAA accessibility.
- **Secondary Accent ("Ocean Blue")**: `#0ea5e9` / `#0284c7` — Coastal Atlantic Nova Scotia accent used for borders, subtle badges, and interactive links.
- **Dark Theme Backgrounds**: `#040b17` (canvas base) and `#0b1627` / `#132238` (elevated cards).
- **Light Theme Backgrounds**: `#f8fafc` (slate-50 base) and `#ffffff` (elevated cards) with `#e2e8f0` borders.
- **Athletic Typography**:
  - `font-athletic`: Ultra-bold, uppercase condensed tracking for headings, badges, and primary controls.
  - `font-mono`: Clean numeric representation for dates, distances, drive times, and chip timing stats.

---

## 9. Troubleshooting & FAQs

### Q1: I uploaded the files to cPanel, but I see a blank white screen.
- **Solution**: Confirm that you uploaded the *contents* of the `dist/` folder directly into `public_html/`, not a folder named `dist`. `index.html` must reside directly at `public_html/index.html`. Also verify that `vite.config.js` has `base: './'`.

### Q2: I cannot see the `.htaccess` file in cPanel File Manager.
- **Solution**: In cPanel File Manager, click the **Settings** button in the top right corner. Check the box for **Show Hidden Files (dotfiles)** and click **Save**. `.htaccess` will now be visible.

### Q3: Clicking refresh on an inner page gives a 404 error on cPanel.
- **Solution**: Make sure the `.htaccess` file is uploaded to the same directory as `index.html` and that `mod_rewrite` is enabled on your Apache server (standard on almost all cPanel hosts).

### Q4: I pushed changes to cPanel, but the browser still shows the old version.
- **Solution**: Vite uses content hashes for JS and CSS files (`index-BPhWtI8I.css`), but your browser or cPanel's NGINX cache may cache `index.html`. Perform a hard refresh (`Ctrl + F5` on Windows or `Cmd + Shift + R` on Mac) or purge your Cloudflare cache if using Cloudflare.

---

## 10. License & Credits

- **Governing Body**: [Run Nova Scotia](https://runnovascotia.ca/) (Promoting road racing since 1983).
- **Event Data**: Sanctioned Nova Scotia Road Race Series & Dr. Jeff Ratushny Performance Series.
- **Code License**: [MIT License](https://opensource.org/licenses/MIT). Free for community, educational, and non-profit usage.
