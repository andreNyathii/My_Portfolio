# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.3.0] — 2026-08-16

### Added
- **Framer Motion (`motion.dev`) Integration** — installed and integrated for declarative React animations and scroll reveals.
- **Dynamic Projects SVG Visuals** — custom domain-inspired inline SVG visual panels for all projects:
  - *EasySchedule*: Multi-phase constraint solver animation with gold-to-green state transitions.
  - *EcoNode Telemetry*: Real-time telemetry sine wave drawing with ESP32 & MQTT status indicators.
  - *Accessible Alarm*: KiCad-inspired PCB trace routing with active signal pulses using `animateMotion`.
  - *Autonomous Suitcase*: Top-down obstacle avoidance simulation with ultrasonic sensing arcs.
  - *Fleet Tracker*: Dot-matrix tracking map with pulsed node coordinates.
- **Scroll-Triggered Reveals** — wrapped project cards and philanthropy sections in `<motion.div>` with `whileInView` triggers.
- **Contact Page Form Integration** — FormSubmit.co integration with honeypot spam protection and validation states.
- **Feature Branching Workflow** — adopted standard Git branch workflow (`feat/motion-dev`).

### Changed
- `About.jsx` — modernized skills hierarchy and updated primary contact email.
- `Navbar.jsx` — added responsive hiding (`hidden md:flex`) to the logo container to prevent overlap on mobile viewports.
- Tech Stack grids across Home and Projects pages expanded with KiCad, EAGLE, Docker, and full-stack tools.

---

## [0.2.0] — 2026-08-08

### Added
- **Tailwind CSS v3** — installed and configured with custom design tokens (gold, cream, dark palette).
- **React Router DOM** — client-side routing with `BrowserRouter`, `Routes`, and `Route`.
- **Navbar component** (`src/components/Navbar.jsx`)
  - Fixed/frosted glass bar using `backdrop-blur` and `bg-dark/75`.
  - Logo with overflow-clip technique to remove baked-in white border from JPG.
  - Nav links centered absolutely using `left-1/2 -translate-x-1/2` trick.
  - Active link styling via `NavLink` `isActive` function — ghost box effect with gold tint.
  - **Italiana** (Google Fonts) as the display/nav font for an elegant serif feel.
- **Page scaffold** — placeholder components for `Home`, `About`, `Projects`, `Contact`.
- **Home page** (`src/pages/Home.jsx`)
  - Full-screen hero with typing animation (using `useState` + `useEffect`).
  - Tech stack grid with devicons CDN logos — greyscale-to-colour on hover using `group`/`group-hover`.
  - Featured Projects section — 3 cards from CV highlights (EasySchedule, Autonomous Suitcase, Fleet Tracker).
  - CTA banner — "Let's Build Something."
- **`tailwind.config.js`** — custom colours (`gold`, `gold-light`, `cream`, `dark`, `dark-2`) and font families (`italiana`, `sans`).
- **`AGENTS.md`** — updated to reflect Tailwind adoption and current design system.
- **`README.md`** — full rewrite with badges, colour palette, project structure, and setup.

### Changed
- `index.css` — replaced CSS variable system with Tailwind directives (`@tailwind base/components/utilities`) and updated font imports (Italiana + Inter).
- `App.jsx` — replaced Vite boilerplate with full router setup; `<Navbar>` rendered outside `<Routes>` for persistent display.

### Removed
- Default Vite boilerplate (`App.css`, placeholder logos, counter component).
- Old indigo-based colour palette.

---

## [0.1.0] — 2026-08-07

### Added
- Initial Vite + React scaffold via `create-vite@5`.
- Git repository initialised and connected to remote (`github.com/andreNyathii/My_Portfolio`).
- Dark mode CSS reset and Inter font base.
- `AGENTS.md` and `CHANGELOG.md` created.

### Removed
- Default Vite boilerplate (logos, counter component).
