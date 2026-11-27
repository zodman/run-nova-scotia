# Run Nova Scotia — AI & Developer Context Guide

> **Purpose:** This document is designed for AI assistants and software engineers to immediately understand the architecture, domain model, design conventions, gotchas, and ongoing state of the **Run Nova Scotia** web platform.

---

## 1. Project Overview & Mission

- **Organization:** [Run Nova Scotia (RNS)](https://runnovascotia.ca/) — Nova Scotia's governing road racing society founded in 1983.
- **Application Type:** High-performance, mobile-first Single Page Application (SPA).
- **Live Production URL:** [https://zodman.github.io/run-nova-scotia/](https://zodman.github.io/run-nova-scotia/)
- **Repository:** [https://github.com/zodman/run-nova-scotia](https://github.com/zodman/run-nova-scotia)
- **Primary Goal:** Provide runners, coaches, race directors, and families across Nova Scotia with a modern race calendar, live registration hub, regional run clubs directory, membership portal, and community leadership directory.

---

## 2. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | React 18.3.1 | Functional components, hooks, React.lazy + Suspense code splitting |
| **Build Tool** | Vite 6.4.3 | Fast HMR, Rollup production bundling, ES2020 target |
| **Styling** | Tailwind CSS 3.4.17 | Utility-first, athletic font scales, dark/light theme switching |
| **Icons** | Lucide React | Aliased via `vite.config.js` to `src/icons.js` for bundle tree-shaking |
| **CI/CD** | GitHub Actions | Automated build & deploy to GitHub Pages on push to `main` |
| **Server / SPA Routing** | Apache `.htaccess` | Clean fallback rewriting for cPanel & standard hosting environments |

---

## 3. Directory & File Structure

```
run-nova-scotia/
├── public/
│   ├── images/
│   │   ├── clubs/              # 28 local club logo files (SVGs, PNGs, JPGs)
│   │   ├── sponsors/           # Partner & sponsor logos
│   │   ├── flags/              # Regional / provincial flag assets
│   │   └── rns-logo*.png       # Primary Run Nova Scotia brand marks
│   ├── .htaccess               # Apache SPA rewrite rules for cPanel deployments
│   └── favicon.png             # Site favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header with Amazon Menu-Aiming algorithm & theme toggle
│   │   ├── HeroBanner.jsx      # Hero section with live next-race countdown card
│   │   ├── EventExplorer.jsx   # Interactive 48-event calendar, search & category filters
│   │   ├── PerformanceSeries.jsx # Dr. Jeff Ratushny Performance Series showcase
│   │   ├── CommunitySection.jsx  # 28-run club directory, board members, life members (Lazy)
│   │   ├── MembershipSection.jsx # Pricing carousel & member benefits overview
│   │   ├── SponsorsMarquee.jsx # Scrolling sponsors ribbon (Lazy)
│   │   ├── EventModal.jsx      # Modal popup with race route, map, and reg link (Lazy)
│   │   ├── MembershipModal.jsx # Membership tier registration details popup (Lazy)
│   │   └── Footer.jsx          # Legal details, quick links, society registration info
│   ├── data/
│   │   ├── eventsData.js       # 48 sanctioned events database + date calculation helpers
│   │   └── communityData.js    # 28 run clubs database, management board, life members
│   ├── icons.js                # Curated icon exports aliasing lucide-react
│   ├── App.jsx                 # Root layout, modal state, theme state provider
│   ├── index.css               # Tailwind directives and custom typography rules
│   └── main.jsx                # React DOM entrypoint
├── docs/                       # Modular documentation guides (Architecture, Features, etc.)
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages CI/CD workflow
├── vite.config.js              # Vite configuration (base: './', icon alias, chunk split)
└── tailwind.config.js          # Athletic color palette ('ocean', 'volt', 'dark')
```

---

## 4. Key Domain Models & Data Schemas

### A. Events Database (`src/data/eventsData.js`)
Synchronized directly with:
1. Official [runnovascotia.ca/events/list/](https://runnovascotia.ca/events/list/) calendar (Tribe Events API)
2. [runnovascotia.ca/road-race-series/](https://runnovascotia.ca/road-race-series/) sanctioned road race series
3. [Atlantic Chip Timing API](https://timer.raceroster.com/widgets/api/g7QHLyu5Ejpahe7MWgnqXcz?offset=0) (embedded on `atlanticchip.ca/events`)
4. [Route 541 Upcoming Events](https://www.route541.com/Events/UpcomingEvents)
5. [Race Roster Nova Scotia Upcoming Search](https://search.raceroster.com/search?q=nova%20scotia&t=upcoming) (Race Roster Search API)

Contains **69 events** spanning 2026 and 2027 (28 upcoming, 41 completed; 49 in 2026, 20 in 2027).

```typescript
interface EventItem {
  id: string;                   // Unique kebab-case slug (e.g., 'wijewi-run-2026')
  name: string;                 // Official event name
  year: number;                 // 2026 or 2027
  date: string;                 // Formatted date string (e.g., "Saturday, October 24, 2026")
  isoDate: string;              // ISO format "YYYY-MM-DD" for accurate countdown calculations
  location: string;             // Venue name and city (e.g., "Hantsport, NS")
  region: string;               // "Halifax Metro" | "South Shore" | "Annapolis Valley" | "Northern NS" | "Cape Breton"
  distances: string[];          // e.g., ["5K", "10K", "Half Marathon"]
  category: "PERFORMANCE" | "NORMAL" | "EXTRA"; // Series classification
  source?: "Run Nova Scotia" | "Atlantic Chip" | "Route 541" | "Race Roster"; // Feed source
  type: string;                 // "Road Race Series" | "Performance Series" | "Youth Series" | "Winter Trail Run" | etc.
  organizer: string;            // Club or community organizer
  description: string;          // Full event summary
  courseType: string;           // Course characteristics (e.g. "Paved Road Loops & Waterfront")
  price: string;                // Registration cost range + RNS discount notice
  registrationUrl: string;      // Direct registration URL with RNS UTM parameters
  websiteUrl: string;           // Official event listing URL on runnovascotia.ca
  badge: string;                // Highlight badge (e.g. "Season Finale", "Major BQ", "Race Roster")
  elevation: string;            // Terrain profile
  resultsUrl: string;           // Atlantic Chip or official timing results link
  image: string;                // High-res event photo or logo
  driveTimeFromHalifax: string; // Approximate driving time from Halifax
  mapsUrl: string;              // Google Maps deep link
}
```

#### Event Helper Functions (Exported in `eventsData.js`):
- `isEventPending(isoDate)`: Returns boolean whether the event date is today or in the future.
- `getEventDaysDelta(isoDate)`: Returns signed integer days until or days passed.
- `getEventRelativeTime(isoDate)`: Returns human-friendly string (e.g., `"Tomorrow (in 1 day)"`, `"In 2 weeks"`, `"3 months ago"`).
- `getEventRelativeTimeCompact(isoDate)`: Compact string for badges (e.g., `"Today"`, `"In 3 days"`, `"Past Event"`).
- `addUtmParams(url, campaign)`: Appends `?utm_source=runnovascotia&utm_medium=referral&utm_campaign=road_race_series`.

---

### B. Live Calendar Subscription Feed (`public/events.ics` & `src/utils/calendarUtils.js`)
Allows runners to add all races to their personal calendars and **automatically receive live updates** (date changes, location details, registration links):
- **RFC-5545 Live Feed**: `public/events.ics` contains all 69 events with standard calendar auto-refresh headers (`REFRESH-INTERVAL;VALUE=DURATION:P1D`, `X-PUBLISHED-TTL:P1D`, `X-WR-CALNAME:Run Nova Scotia Race Calendar`).
- **Generation Script**: `scripts/generate-calendar.mjs` is integrated into npm lifecycle (`"prebuild": "node scripts/generate-calendar.mjs"` and `"build:calendar"`).
- **Subscribe Modal (`src/components/SubscribeCalendarModal.jsx`)**:
  - **Apple / iOS**: 1-click subscription via native `webcal://<domain>/events.ics`.
  - **Google Calendar**: 1-click subscription via `https://calendar.google.com/calendar/r?cid=webcal://...`.
  - **Microsoft Outlook / 365**: 1-click subscription via `https://outlook.live.com/calendar/0/addcalendar?url=...`.
  - **Generic Feed URL**: Copyable `events.ics` URL for any calendar client (Thunderbird, Fantastical, etc.).
  - **Offline Snapshot**: Download button for standalone `.ics` file snapshot.
- **Header Action**: In `src/components/EventExplorer.jsx`, the "Subscribe to All Races (Live Feed)" button provides instant access to all 67 races.

---

### C. Run Clubs & Community Database (`src/data/communityData.js`)
Lists **28 registered run clubs** across Nova Scotia, plus the **6 Management Board members** and **Honorary Life Members**.

```typescript
interface RunClub {
  id: number;
  name: string;                 // Club name (e.g., "Halifax Road Hammers")
  city: string;                 // Home city / town
  region: string;               // Region name matching the filter tabs
  location: string;             // Exact weekly meetup spot
  meets: string;                // Schedule (e.g., "Tuesdays at 6:00 PM")
  focus: string;                // Philosophy & pacing description
  contact: string;              // Contact label
  website: string;              // Official club URL, Instagram, Facebook group, or email
  linkType: "website" | "instagram" | "facebook" | "whatsapp" | "email" | "phone";
  tags: string[];               // e.g. ["Competitive", "Marathon", "Track"]
  logo: string;                 // Local asset path (e.g., "./images/clubs/halifax-road-hammers.png")
}
```

---

## 5. Critical Engineering Rules & Gotchas for AI

### ⚠️ 1. Windows PowerShell Environment
- The developer's environment is **Windows PowerShell**.
- **Never use `&&` to chain commands in PowerShell.** Use `;` or issue separate command calls.
  - ❌ `npm run build && git status`
  - ✅ `npm run build; git status`

### ⚠️ 2. Relative Base URL (`base: './'`)
- In `vite.config.js`, `base: './'` is configured to allow hosting anywhere (root domains, subdirectories like GitHub Pages `/run-nova-scotia/`, or local file systems).
- **Never hardcode root-absolute image URLs** like `<img src="/images/..." />`.
- Use relative paths `./images/...` or resolve with `import.meta.env.BASE_URL`:
  ```javascript
  const getLogoUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    const base = import.meta.env.BASE_URL || './';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const cleanPath = url.replace(/^\.?\//, '');
    return `${cleanBase}${cleanPath}`;
  };
  ```

### ⚠️ 3. Icon Imports via `src/icons.js`
- To prevent bloating bundle size with hundreds of unused icons from `lucide-react`, `vite.config.js` aliases `lucide-react` to `src/icons.js`.
- If a component needs a new icon, **it must be exported in `src/icons.js`**, otherwise the build will fail.

### ⚠️ 4. Dropbox File Locks
- The repository resides in a Dropbox-synced directory (`c:\Users\Andres\Dropbox\exp1`).
- Dropbox can momentarily lock files during sync. In `vite.config.js`, `build.emptyOutDir: false` is intentionally set to avoid `EPERM` permissions errors during production builds.

### ⚠️ 5. Code Splitting & Performance
- Modals (`EventModal`, `MembershipModal`) and below-the-fold sections (`CommunitySection`, `SponsorsMarquee`) are loaded asynchronously using `React.lazy()` with `<Suspense>`.
- Keep lightweight cards in the initial chunk and defer detailed modals.

### ⚠️ 6. Amazon Menu-Aim Algorithm in `Navbar.jsx`
- The desktop navigation header implements the **Amazon Mega Dropdown Directional Aiming Algorithm** (Kamens technique).
- Tracks mouse velocity vectors in `mouseLocsRef` and computes 2D point-in-triangle intersections to prevent menus from collapsing when cursor travels diagonally toward submenus. Do not break or simplify this without understanding mouse vector math.

---

## 6. Development & Deployment Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (default port 3000)
npm run dev

# 3. Production build (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview

# 5. Audit & sync events with official runnovascotia.ca calendar
npm run sync:events
```

### Git Deployment Workflow
Pushing to the `main` branch automatically triggers the `.github/workflows/deploy.yml` pipeline, compiling the application and deploying the updated `dist/` directory to GitHub Pages.

---

## 7. Current Project State & Recent Achievements
- **67 Official & Multi-Source Events:** Fully synchronized with [runnovascotia.ca](https://runnovascotia.ca/events/list/), [road-race-series](https://runnovascotia.ca/road-race-series/), [Atlantic Chip API](https://timer.raceroster.com/widgets/api/g7QHLyu5Ejpahe7MWgnqXcz?offset=0), [Route 541](https://www.route541.com/Events/UpcomingEvents), and [Race Roster](https://search.raceroster.com/search?q=nova%20scotia&t=upcoming).
- **Add to Calendar Export:** Full support for Google Calendar, Apple Calendar (.ics), and Outlook across all event cards and details modals.
- **28 Local Run Club Logos:** 100% saved in `public/images/clubs/` (0 remote CDN dependencies, no expiring tokens).
- **Enlarged Logo Display:** Club cards feature `w-20 h-20 sm:w-24 sm:h-24` logos with rounded container and fallback. Main brand header uses `h-14 sm:h-16 md:h-18`.
- **Membership Carousel:** Responsive pricing cards with `lg:w-[calc((100%-4.5rem)/3.3)]` displaying 3 full cards plus a ~30% peek of the 4th card.
- **Green Production Build:** Zero ESLint or Rollup warnings, fully tested and deployed.
