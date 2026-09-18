# Run Nova Scotia — Modern Web Platform

[![Deploy to GitHub Pages](https://github.com/zodman/run-nova-scotia/actions/workflows/deploy.yml/badge.svg)](https://github.com/zodman/run-nova-scotia/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Site-GitHub_Pages-FEF000?style=flat&logo=github&logoColor=black)](https://zodman.github.io/run-nova-scotia/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive web application for **Run Nova Scotia**, Nova Scotia's governing road racing association founded in 1983. Built with React 18, Vite 6, and Tailwind CSS.

- **Live Production URL:** [https://zodman.github.io/run-nova-scotia/](https://zodman.github.io/run-nova-scotia/)
- **GitHub Repository:** [https://github.com/zodman/run-nova-scotia](https://github.com/zodman/run-nova-scotia)

---

## Documentation Directory

The project documentation is split into modular guides for fast reference:

| Guide | Description |
| :--- | :--- |
| **[Platform Features](docs/FEATURES.md)** | Detailed breakdown of the 29-race calendar, Performance Series, 27 run clubs, countdowns, drive times, mega dropdown, and dual themes. |
| **[Technical Architecture & Data Schemas](docs/ARCHITECTURE.md)** | Component hierarchy, state flow, `eventsData.js` and `communityData.js` contracts, and date helper utilities. |
| **[Local Development Guide](docs/DEVELOPMENT.md)** | Prerequisites, local setup, npm commands, Vite configuration, and Tailwind design guidelines. |
| **[cPanel Deployment Guide](docs/DEPLOYMENT_CPANEL.md)** | Complete step-by-step cPanel guide: File Manager manual upload, Git Version Control, FTP, `.htaccess`, subdirectories, and permissions. |
| **[GitHub Pages CI/CD Guide](docs/DEPLOYMENT_GITHUB_PAGES.md)** | Continuous integration and deployment pipeline via GitHub Actions (`deploy.yml`). |
| **[Troubleshooting & FAQ Reference](docs/TROUBLESHOOTING.md)** | Solutions for blank screens, 404 routing errors, viewing dotfiles in cPanel, caching, and permissions. |

---

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/zodman/run-nova-scotia.git
cd run-nova-scotia
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates the compiled production assets in `dist/`.

---

## High-Level Architecture

```
run-nova-scotia/
├── docs/                                # Modular documentation guides
│   ├── FEATURES.md                      # Feature catalog
│   ├── ARCHITECTURE.md                  # Component hierarchy & data schemas
│   ├── DEVELOPMENT.md                   # Local setup & coding standards
│   ├── DEPLOYMENT_CPANEL.md             # Complete cPanel deployment manual
│   ├── DEPLOYMENT_GITHUB_PAGES.md       # GitHub Actions CI/CD setup
│   └── TROUBLESHOOTING.md               # Common issues and FAQs
├── public/
│   ├── .htaccess                        # Apache configuration for cPanel SPA routing
│   └── images/                          # Brand and race imagery
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                   # Header with Amazon mega dropdown aiming technique
│   │   ├── HeroBanner.jsx               # Hero banner with signature featured race spotlight
│   │   ├── EventExplorer.jsx            # 29-race calendar with 12-item 3-column pagination
│   │   ├── PerformanceSeries.jsx        # Dr. Jeff Ratushny Performance Series spotlight
│   │   ├── CommunitySection.jsx         # 27-club directory with 6-item 2-row pagination
│   │   ├── MembershipSection.jsx        # Membership tiers and registration benefits
│   │   ├── EventModal.jsx               # Detailed race brief popup with route deep links
│   │   └── Footer.jsx                   # Footer navigation and association metadata
│   ├── data/
│   │   ├── eventsData.js                # 29 sanctioned events, drive times, relative timers
│   │   └── communityData.js             # 27 official running clubs, board & life members
│   ├── App.jsx                          # Main application state and theme provider
│   ├── index.css                        # Tailwind directives and custom athletic typography
│   └── main.jsx                         # React DOM entrypoint
├── .cpanel.yml.example                  # Example file for cPanel Git deployment automation
├── index.html                           # HTML entrypoint
├── package.json                         # Project dependencies and npm scripts
├── tailwind.config.js                   # Tailwind theme colors, fonts, and utilities
└── vite.config.js                       # Vite configuration (base: './' for relative paths)
```

---

## Core Technologies

| Technology | Role |
| :--- | :--- |
| **React 18** | UI component architecture and reactive state |
| **Vite 6** | Ultra-fast development server and production bundler |
| **Tailwind CSS 3** | Responsive layouts, high-contrast light/dark themes, and athletic typography |
| **Lucide React** | Lightweight, accessible SVG icon library |
| **GitHub Actions** | Automated CI/CD pipeline deploying to GitHub Pages |

---

## Deploying to cPanel in 60 Seconds

1. Run `npm run build` locally to generate the `dist/` directory.
2. Open `dist/`, select all files (`Ctrl+A`), and zip them as `build.zip`.
3. In your **cPanel File Manager**, upload `build.zip` to `public_html/`.
4. Right-click `build.zip` and click **Extract**.
5. Delete `build.zip` and verify that `index.html` and `.htaccess` are directly inside `public_html/`.

*For comprehensive cPanel instructions, see the **[cPanel Deployment Guide](docs/DEPLOYMENT_CPANEL.md)**.*

---

## License & Credits

- **Governing Body**: [Run Nova Scotia](https://runnovascotia.ca/) (Promoting road racing across Nova Scotia since 1983).
- **Event Data**: Sanctioned Nova Scotia Road Race Series & Dr. Jeff Ratushny Performance Series.
- **License**: [MIT License](https://opensource.org/licenses/MIT). Free for community, educational, and non-profit usage.
