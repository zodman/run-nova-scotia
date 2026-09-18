# Run Nova Scotia — Platform Features Reference

This document provides a comprehensive breakdown of all features and user capabilities built into the Run Nova Scotia web platform.

---

## Table of Contents

1. [Provincial Road Race Calendar](#1-provincial-road-race-calendar)
2. [Drive Times & Google Maps Deep Links](#2-drive-times--google-maps-deep-links)
3. [Conversational Relative Countdowns](#3-conversational-relative-countdowns)
4. [Events Multi-Row Pagination](#4-events-multi-row-pagination)
5. [Dr. Jeff Ratushny Performance Series](#5-dr-jeff-ratushny-performance-series)
6. [Nova Scotia Run Clubs Directory](#6-nova-scotia-run-clubs-directory)
7. [Run Clubs Multi-Row Pagination](#7-run-clubs-multi-row-pagination)
8. [Amazon Mega Dropdown Aiming Algorithm](#8-amazon-mega-dropdown-aiming-algorithm)
9. [Dual Light & Dark Themes](#9-dual-light--dark-themes)
10. [Technical Race Brief Modal](#10-technical-race-brief-modal)

---

## 1. Provincial Road Race Calendar

The calendar is the central hub for road racing across Nova Scotia, covering the **2026 and 2027 seasons**.

- **29 Sanctioned Provincial Races**: Complete schedule across all 6 regions of Nova Scotia:
  - Halifax Metro (Halifax, Dartmouth, Cole Harbour, Timberlea)
  - South Shore (Lunenburg, Mahone Bay, Shelburne, Barrington)
  - Annapolis Valley (Wolfville, Kentville, Port Williams, Berwick)
  - Cape Breton (Sydney, Cabot Trail, Ingonish, Isle Madame)
  - Northern Nova Scotia (Truro, New Glasgow, Antigonish, Amherst)
  - Regional & Province-wide (Youth Series, Doctors Nova Scotia)
- **Pending-First Chronological Ordering**:
  - Upcoming races are sorted chronologically from soonest to furthest in the future.
  - Completed races are sorted in reverse chronological order (most recently finished first).
  - Runners immediately see the next actionable events open for registration.
- **Multi-Criteria Filtering**:
  - **Season Filter**: `2026 Season`, `2027 Season`, or `All Seasons`.
  - **Status Tabs**: Default selection is `Upcoming Races` (with animated flame badge) for instant access to open events, with quick tabs for `All Races` and `Completed Races`.
  - **Series Filter**: `All Series`, `Normal Series`, `Performance Series`, and `Extra Events`.
  - **Distance Pills**: `All`, `5K`, `10K`, `Half Marathon`, `Full Marathon`.
  - **Regional Filter**: `All Nova Scotia`, `Halifax Metro`, `South Shore`, `Annapolis Valley`, `Cape Breton`, `Northern NS`.
  - **Real-Time Search**: Instant zero-lag query matching against race titles, towns, organizers, and years.
- **Boston Qualifier (BQ) Certified Indicators**: Badges mark officially certified courses for Boston Marathon qualifying times.
- **Direct Anchor Link**: Clickable `#events` badge link (`#events-header-direct-link`) allowing direct social/email linking.

---

## 2. Drive Times & Google Maps Deep Links

- **Drive Time from Halifax / Dartmouth**:
  - Every event card and technical modal displays estimated driving duration from the Halifax/Dartmouth metropolitan area (e.g., `"1 hr (tentative - needs confirm)"`, `"2 hr 45 min"`, `"25 min"`).
- **Direct Google Maps Deep Links**:
  - Clickable Google Maps routing links (`target="_blank" rel="noopener noreferrer"`) automatically pre-fill the race location (e.g. `https://www.google.com/maps/search/?api=1&query=Ingonish%2C+Nova+Scotia`) so runners can launch turn-by-turn navigation with a single tap.

---

## 3. Conversational Relative Countdowns

- Natural language timing calculated dynamically via date arithmetic helpers:
  - **Compact Ribbons**: Top-right corner of card media (`"In 2 days"`, `"In 1 week"`, `"In 3 weeks"`, `"In 1 month"`, `"In 5 months"`).
  - **Schedule Rows**: Conversational countdown strings such as `"In 1 week (8 days)"`, `"In 3 weeks (23 days)"`, `"In 1 month (30 days)"`.
  - **Featured Signature Event**: High-visibility countdown in the hero section.

---

## 4. Events Multi-Row Pagination

- **12 Elements in Rows of 3**: Configured with `EVENTS_PER_PAGE = 12`. On desktop screens (`lg:grid-cols-3`), cards render in **4 rows of 3 columns**, eliminating endless scrolling.
- **Navigation Controls**:
  - **Prev Button** (`#events-pagination-prev`): Disables on Page 1 (`opacity-40 cursor-not-allowed`).
  - **Numbered Page Buttons** (`#events-page-${pageNum}`): Active page highlighted in bold Sunbeam Yellow (`bg-volt text-black font-extrabold`) with `aria-current="page"`.
  - **Next Button** (`#events-pagination-next`): Disables on the final page.
  - **Context Counter**: `Showing 1–12 of 29 events • Page 1 of 3`.
- **Reactive Filter Auto-Reset**: Changing any filter or search query automatically resets pagination to Page 1.
- **Smooth Viewport Reset**: Navigating between pages smoothly scrolls the window to the `#events` section header.

---

## 5. Dr. Jeff Ratushny Performance Series

- Dedicated spotlight for the provincial championship **Performance Series**:
  - Filtered by `category: 'PERFORMANCE'`.
  - Sanctioned competitive events at 5K, 10K, and Half Marathon distances.
  - $2,000+ total cash prize purse awarded across open and masters divisions.
  - Annual championship trophies awarded at the Run Nova Scotia Awards Banquet.

---

## 6. Nova Scotia Run Clubs Directory

- **27 Authentic Running Clubs & Training Packs**: Sourced directly from [Run Nova Scotia](https://runnovascotia.ca/run-clubs-groups/):
  - **Halifax Metro**: Halifax Road Hammers, North End Runners (NER), Easy Breezy Run Club, Halifax Trail Runners, Dartmouth Runners Association, Cole Harbour Runners, Fast Company Running Club, BLT Runners, Halifax Running Club, Heart and Sole Running Club, Sober Friends Run Crew, Halifax Road Runners, Halifax Velocity Runners, Girls Gone Gazelle Run Club.
  - **Cape Breton**: Cape Breton Road Runners Club, North Of Smokey Runners, Isle Madame She's Fast.
  - **Annapolis Valley**: The Scotiables, Valley Harriers.
  - **South Shore**: Lunenburg Run Club, The Running Mafia.
  - **Northern Nova Scotia**: Hubtown Runners, Antigonish County Running Club, The Amherst Striders Running Club, Pictou County Athletics / River Runners.
  - **Province-Wide**: Kids Run Club (Doctors NS across 200+ schools), TurtleRunners.
- **Rich Card Presentation**:
  - Sunbeam Yellow City badge and Region tag.
  - Specific meeting spot (`MapPin`) and weekly run schedule (`Clock`).
  - Club mission statement and categorical hashtags (`#Trail`, `#Marathon`, `#Track`, `#Women's Running`, `#Youth`, `#Social`).
  - Direct Action Button opening official website, Facebook, Instagram, WhatsApp, email, or phone.
- **Live Search & Regional Filter Tabs**: Instant search input plus 7 region filter buttons with live counts.
- **Leadership & Distinction**:
  - Executive Management Board (6 member profiles with portraits, roles, and bios).
  - Honorary Life Members (12 Hall of Distinction inductees).

---

## 7. Run Clubs Multi-Row Pagination

- **6 Elements in Two Rows**: Configured with `CLUBS_PER_PAGE = 6`. On desktop screens (`lg:grid-cols-3`), cards format into **2 rows of 3 columns**.
- **Pagination Bar**: Prev / Next controls, numbered page buttons (1 to 5), and counter (`Showing 1–6 of 27 clubs • Page 1 of 5`).
- **Auto-Reset**: Filter changes and search input automatically reset to Page 1.

---

## 8. Amazon Mega Dropdown Aiming Algorithm

- **Directional Triangle Aiming Algorithm**:
  - Solves the classic "whack-a-mole" problem where diagonal cursor paths accidentally close submenus.
  - Based on [Ben Kamens' Amazon dropdown breakdown](https://bjk5.com/post/44698559168/breaking-down-amazons-mega-dropdown).
  - Computes the 2D cursor movement vector and tests if it falls inside the triangle formed by the cursor and the menu bounds (`isPointInTriangle`).
  - Defer menu closing with a 300ms safety timeout if aiming at the menu; switch instantly if moving elsewhere.
- **4-Column Structured Mega Menu ("Races & Series")**:
  - Column 1: Road Race Series (Schedule, Boston Qualifiers, Divisions).
  - Column 2: Performance Series (Dr. Jeff Ratushny, Scoring Rules, Cash Prizes).
  - Column 3: Youth & Special Events (Youth Series, Fun Runs, Awards Banquet).
  - Column 4: Timing & Racer Resources (Atlantic Chip Timing, Points System, Member Discounts).
  - Footer Callout: Run NS 40-year heritage badge and "Join Run NS" CTA.

---

## 9. Dual Light & Dark Themes

- **Athletic Dark Theme**: Deep slate-navy base (`#040b17` / `#0b1627`), crisp white typography, and vibrant Sunbeam Yellow (`#FEF000`) accents.
- **High-Contrast Light Theme**: Clean slate-white base (`#f8fafc`), dark slate typography (`text-slate-900`), and ocean blue accents.
- **Persistence**: Synced with `localStorage` and `document.documentElement.classList`.

---

## 10. Technical Race Brief Modal

- Accessible full-screen modal:
  - High-resolution hero imagery with date, season, and BQ certification tags.
  - Distances, course description, and elevation profile.
  - Drive time from Halifax/Dartmouth with Google Maps route deep link.
  - Registration status, entry fee schedule, and dynamic direct registration links.
  - Atlantic Chip timing standards and course record details.

---

## 11. Official Sponsors & Corporate Partners Directory

- **13 Official Corporate & Community Partners** sourced directly from [Run Nova Scotia Sponsors](https://runnovascotia.ca/our-sponsors/):
  - Aerobics First, ASICS Runkeeper, Atlantic Chip Sport Timing, Bauld Insurance, CBI Health, Dr. Jeff Ratushny, Fredericton Marathon, O’Regan’s Green Light Used Cars, Old Orchard Inn, QEII Foundation, Quiet Earth Moss, Seaside Chiropractic & Health Centre, Whalesong Studios.
- **Company Logos**: High-resolution brand logos stored locally in `public/images/sponsors/` with automatic fallback to live remote CDN URLs.
- **Interactive Cards**:
  - Direct outbound links (`target="_blank" rel="noopener noreferrer"`) to each sponsor's official website.
  - Partner tiers, categories, and locations.
  - Exclusive member perks (e.g. Old Orchard Inn 15% room discount, Bauld Insurance exclusive programs).

