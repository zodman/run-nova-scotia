# Run Nova Scotia — Technical Architecture & Data Schemas

This document covers the internal structure, component hierarchy, data schemas, and state management of the application.

---

## Table of Contents

1. [Component Architecture](#1-component-architecture)
2. [Data Schemas & Contracts](#2-data-schemas--contracts)
   - [Events Data Schema (`eventsData.js`)](#events-data-schema)
   - [Community & Clubs Schema (`communityData.js`)](#community--clubs-schema)
   - [Board & Life Members Schema](#board--life-members-schema)
3. [Date & Time Utility Functions](#3-date--time-utility-functions)
4. [How to Add or Modify Data](#4-how-to-add-or-modify-data)

---

## 1. Component Architecture

The frontend follows a component-driven React architecture located in `src/components/`:

```
App.jsx (Root Component, Theme State, Active Modal State)
├── Navbar.jsx (Navigation, Amazon Mega Menu, Theme Toggle, Mobile Drawer)
├── HeroBanner.jsx (Hero Header, Statistics, Featured Signature Event)
├── EventExplorer.jsx (Calendar, Filters, 12-Item Pagination, Search)
├── PerformanceSeries.jsx (Championship Spotlight, Rules, Cash Prizes)
├── CommunitySection.jsx (27 Clubs, 6-Item Pagination, Board & Life Members)
├── MembershipSection.jsx (Benefits, Pricing Tiers, Join Callout)
├── EventModal.jsx (Detailed Race Packet Modal with Google Maps Link)
└── Footer.jsx (Sitemap, Sponsors, Association Information)
```

### Component Details

| Component | Path | Responsibility | Primary Props / Handlers |
| :--- | :--- | :--- | :--- |
| `Navbar` | `src/components/Navbar.jsx` | Header, Amazon aiming algorithm, theme switch | `onSelectCategory`, `onJoinClick` |
| `HeroBanner` | `src/components/HeroBanner.jsx` | Hero photography, featured race card, stats | `onSelectEvent`, `onJoinClick` |
| `EventExplorer` | `src/components/EventExplorer.jsx` | 29-race calendar, 12-item pagination, multi-filter | `onSelectEvent`, `selectedCategory` |
| `PerformanceSeries` | `src/components/PerformanceSeries.jsx`| Scoring rules, prize purse, qualifying race list | `onSelectCategory` |
| `CommunitySection` | `src/components/CommunitySection.jsx`| 27 running clubs, 6-item pagination, Board, Life | *(Internal Tab & Pagination State)* |
| `MembershipSection` | `src/components/MembershipSection.jsx`| Membership tiers, perks, registration button | `onJoinClick` |
| `EventModal` | `src/components/EventModal.jsx` | Technical race packet, route deep link, timing | `event`, `isOpen`, `onClose` |
| `Footer` | `src/components/Footer.jsx` | Navigation links, sponsors, copyright, disclaimer | — |

---

## 2. Data Schemas & Contracts

### Events Data Schema (`src/data/eventsData.js`)

Each event in the `eventsData` array adheres to this schema:

```typescript
interface EventItem {
  id: number;                     // Unique numeric identifier (1, 2, 3...)
  name: string;                   // Full race name (e.g. "Sole Sisters Women's Half & 5K")
  date: string;                   // Human-readable date (e.g. "October 3, 2026")
  isoDate: string;                // ISO 8601 string for sorting (e.g. "2026-10-03T09:00:00")
  year: number;                   // Season year: 2026 or 2027
  location: string;               // Venue and city (e.g. "Dartmouth Crossing, Dartmouth")
  region: string;                 // 'Halifax Metro' | 'South Shore' | 'Annapolis Valley' | 'Cape Breton' | 'Northern NS'
  distances: string[];            // Available distances (e.g. ["5K", "Half Marathon"])
  category: string;               // 'NORMAL' | 'PERFORMANCE' | 'EXTRA'
  elevation: string;              // Course profile (e.g. "Rolling Hills (+85m)")
  driveTimeFromHalifax: string;   // Driving time from metro (e.g. "15 min", "1 hr 45 min")
  mapsUrl: string;                // Direct Google Maps routing deep link
  description: string;            // 2-3 sentence race description
  organizer: string;              // Host club or organizing committee
  registrationUrl: string;        // Registration link (e.g. Race Roster, Atlantic Chip)
  resultsUrl: string;             // Results URL (e.g. Atlantic Chip)
  isBostonQualifier: boolean;     // Course certified as a Boston Marathon qualifier
  image: string;                  // High-resolution photography URL
}
```

### Community & Clubs Schema (`src/data/communityData.js`)

Each running club in the `runClubsData` array adheres to this schema:

```typescript
interface ClubItem {
  id: number;                     // Unique identifier (1 to 27)
  name: string;                   // Official club name
  city: string;                   // City or town (e.g. "Halifax", "Sydney", "Lunenburg")
  region: string;                 // 'Halifax Metro' | 'Cape Breton' | 'Annapolis Valley' | 'South Shore' | 'Northern NS' | 'Province-wide'
  location: string;               // Meeting spot (e.g. "Sullivan's Pond gazebo")
  meets: string;                  // Weekly schedule (e.g. "Tuesdays 6:00 PM")
  focus: string;                  // Club description and focus
  contact: string;                // Display contact text (e.g. "hfxroadhammers.com")
  website: string;                // Destination URL or contact URI (e.g. mailto:, tel:)
  linkType: string;               // 'website' | 'facebook' | 'instagram' | 'whatsapp' | 'email' | 'phone'
  tags: string[];                 // Hashtags (e.g. ["Track", "Marathon", "Competitive"])
}
```

### Board & Life Members Schema

```typescript
interface BoardMember {
  role: string;                   // Executive role (President, VP, Treasurer, etc.)
  name: string;                   // Full name
  bio: string;                    // Brief background
  image: string;                  // Portrait photo URL
}

type LifeMember = string;         // Full name string of inductee
```

---

## 3. Date & Time Utility Functions

Located in `src/data/eventsData.js`:

```javascript
// 1. Check if an event date is upcoming or completed
export const isEventPending = (isoDate) => {
  return new Date(isoDate) >= new Date();
};

// 2. Compute absolute day difference
export const getEventDaysDelta = (isoDate) => {
  const diffMs = new Date(isoDate) - new Date();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

// 3. Conversational timing string
export const getEventRelativeTime = (isoDate) => {
  const days = getEventDaysDelta(isoDate);
  if (days <= 0) return 'Today!';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `In ${days} days`;
  if (days < 30) {
    const weeks = Math.round(days / 7);
    return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'} (${days} days)`;
  }
  const months = Math.round(days / 30);
  return `In ${months} ${months === 1 ? 'month' : 'months'} (${days} days)`;
};

// 4. Compact badge label
export const getEventRelativeTimeCompact = (isoDate) => {
  const days = getEventDaysDelta(isoDate);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `In ${days}d`;
  if (days < 30) return `In ${Math.round(days / 7)}w`;
  return `In ${Math.round(days / 30)}mo`;
};
```

---

## 4. How to Add or Modify Data

### Adding an Event:
1. Open `src/data/eventsData.js`.
2. Add a new entry to `eventsData` conforming to `EventItem`.
3. Set `isoDate` in `YYYY-MM-DDTHH:MM:SS` format.
4. Set `category` to `'NORMAL'`, `'PERFORMANCE'`, or `'EXTRA'`.
5. Changes hot-reload immediately in the local development server.

### Adding a Run Club:
1. Open `src/data/communityData.js`.
2. Add a new entry to `runClubsData` conforming to `ClubItem`.
3. Choose a valid `region` and `linkType`.
4. The club directory, regional counts, and pagination update automatically.
