# Run Nova Scotia — Local Development Guide

This guide provides instructions for setting up, running, and modifying the Run Nova Scotia web application locally.

---

## Table of Contents

1. [System Prerequisites](#1-system-prerequisites)
2. [Getting Started](#2-getting-started)
3. [NPM Scripts Reference](#3-npm-scripts-reference)
4. [Vite Configuration](#4-vite-configuration)
5. [Tailwind CSS & Styling Standards](#5-tailwind-css--styling-standards)
6. [Best Practices for Contributing](#6-best-practices-for-contributing)

---

## 1. System Prerequisites

Before running the application, make sure your development environment has:
- **Node.js**: `v18.0.0` or higher (`v20+ LTS` recommended). Check version:
  ```bash
  node -v
  ```
- **npm**: `v9.0.0` or higher. Check version:
  ```bash
  npm -v
  ```
- **Git**: Installed and accessible in your shell. Check version:
  ```bash
  git --version
  ```

---

## 2. Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zodman/run-nova-scotia.git
   cd run-nova-scotia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```
   http://localhost:3000/
   ```

---

## 3. NPM Scripts Reference

All project commands are defined in `package.json`:

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts the local dev server on port `3000` with instant HMR. |
| `npm run build` | `vite build` | Compiles the production bundle to `dist/` with relative asset paths. |
| `npm run preview` | `vite preview` | Locally serves the compiled `dist/` bundle on port `4173` to test production output. |

---

## 4. Vite Configuration (`vite.config.js`)

The project uses Vite 6 configured for zero-configuration deployments:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL: Emits relative asset paths for cPanel and GitHub Pages
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-dom/client', 
      'lucide-react', 
      'react/jsx-dev-runtime'
    ],
  },
  server: {
    port: 3000,
    host: true,
    open: false
  }
});
```

### Why `base: './'` is Critical
Setting `base: './'` ensures all bundle links in `index.html` look like `./assets/index-[hash].js` rather than absolute paths `/assets/index-[hash].js`. This allows the application to be deployed to:
- A root domain (`https://yourdomain.com/`)
- A subfolder on cPanel (`https://yourdomain.com/run-ns/`)
- GitHub Pages project sites (`https://username.github.io/run-nova-scotia/`)
All without changing a single line of code!

---

## 5. Tailwind CSS & Styling Standards

The project uses Tailwind CSS 3.4 configured in `tailwind.config.js`:

### Custom Color Palette
- **`volt` (Sunbeam Yellow)**: `#FEF000` — Signature high-energy brand accent.
- **`ocean` (Ocean Blue)**: `#0ea5e9` / `#0284c7` — Coastal Atlantic Nova Scotia accent.
- **`dark-950`**: `#040b17` — Deepest canvas background.
- **`dark-850`**: `#0b1627` — Elevated card and navbar background.
- **`dark-750`**: `#132238` — Card borders and subtle separators.

### Custom Fonts
- **`font-athletic`**: Montserrat, bold condensed tracking for headings, tags, and badges.
- **`font-sans`**: Open Sans, clean legibility for descriptions and prose.
- **`font-mono`**: Monospace styling for dates, drive times, and chip timing figures.

---

## 6. Best Practices for Contributing

1. **Keep IDs intact**: Essential navigation anchors and interactive elements use semantic IDs (`#events`, `#clubs`, `#community-section`). Preserve these IDs when editing components.
2. **Accessible Links**: All external links should open with `target="_blank"` and `rel="noopener noreferrer"`.
3. **Contrast Compliance**: Badges using `bg-volt` (`#FEF000`) must always use dark text (`text-black font-bold`) to ensure high contrast and WCAG AAA compliance.
4. **Always verify the build**: Before committing code, run:
   ```bash
   npm run build
   ```
   Ensure there are zero linting, TypeScript, or bundling errors.
