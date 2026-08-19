# Agent Guidelines

## Project Overview
Personal portfolio for Mduduzi André Nyathi — Software Engineer & Embedded Developer.
Built with React + Vite, styled with Tailwind CSS v3.
Gold (#C9913A) / Black (#0D0D0D) / Cream (#F5F0E8) brand palette.

---

## Tech Stack
- **Framework**: React 18 (via Vite)
- **Styling**: Tailwind CSS v3 — use utility classes. Do NOT write plain CSS unless Tailwind cannot achieve it.
- **Routing**: React Router DOM v7
- **Fonts**: Italiana (display/headings) · Inter (body) — both from Google Fonts
- **Icons/Logos**: devicons CDN (`cdn.jsdelivr.net/gh/devicons/devicon/icons/`)

---

## Design Rules

### Colours — always use custom tokens, never raw hex in JSX
| Token | Value | Use for |
|-------|-------|---------|
| `gold` | `#C9913A` | Primary accent, active states, highlights |
| `gold-light` | `#E0B060` | Hover variants of gold |
| `cream` | `#F5F0E8` | Primary text |
| `dark` | `#0D0D0D` | Background |
| `dark-2` | `#1A1A1A` | Secondary background / cards |

Opacity modifiers: use Tailwind's `/` syntax — e.g. `text-cream/50`, `bg-gold/10`, `border-gold/[0.1]`.
Use arbitrary values (`/[0.07]`) when Tailwind preset steps (5, 10, 25...) are too coarse.

### Typography
- `font-italiana` — headings, nav links, CTA text, display text
- `font-sans` (Inter) — body, descriptions, tags, labels
- Prefer `tracking-[0.2em]` or wider for uppercase labels — generous spacing is key to the aesthetic.

### Spacing & Layout
- Use `max-w-5xl mx-auto` for main content containers.
- Section vertical padding: `py-24` standard, `py-32` or `py-36` for emphasis sections.
- Section dividers: `border-t border-white/5` — barely visible hairline.

### Active / Hover States
- Active nav: `text-gold bg-gold/[0.06] border border-gold/[0.1] rounded`
- Hover cards: `hover:border-gold/[0.12] hover:bg-white/[0.015]`
- Hover buttons: increase gold opacity slightly (`/10` → `/18`, `/20` → `/40`)
- Always include `transition-all duration-300` on interactive elements.

### Glassmorphism (Navbar)
- `bg-dark/75 backdrop-blur-md` — frosted glass navbar.
- `border-b border-white/5` — hairline bottom separator.

---

## Component Rules
- Keep components in `src/components/` — reusable UI pieces (Navbar, Cards, etc.)
- Keep pages in `src/pages/` — full route-level components
- Data (arrays of objects) should live OUTSIDE the component function, at the top of the file
- Use `NavLink` (with `isActive`) in the Navbar; use `Link` everywhere else
- Every interactive list must have a unique `key` prop

---

## Workflow
- Follow standard React best practices (hooks at top, no conditional hooks)
- Use semantic HTML: `<nav>`, `<section>`, `<h1>`–`<h3>`, `<main>`, `<footer>`
- **Update `CHANGELOG.md`** for every notable structural change or feature addition
- **Educate the developer** — every code block written must be explained in comments or prose. This is a non-negotiable part of the workflow. No silent code drops.
- Commit and push after completing meaningful milestones

---

## AI Collaboration Note
This project is built with Google Antigravity (Gemini / Claude) as an active pair-programming tool.
The developer is learning React, Tailwind, and modern web patterns through the build process.
All agent output must prioritise comprehension alongside implementation.

---

## Maintenance Notes

### Hardcoded Contact Email
The email address `andremdu48@gmail.com` is currently hardcoded in **three places**:
1. `src/pages/Contact.jsx` — the FormSubmit fetch endpoint (`/ajax/andremdu48@gmail.com`)
2. `src/pages/Contact.jsx` — the fallback error message shown to users
3. `src/pages/PrivacyPolicy.jsx` — the data controller contact address in the policy body

**If the contact email ever changes**, all three locations must be updated manually.
Future improvement: extract this into a single constant (e.g. `src/config.js`) and import it everywhere.
