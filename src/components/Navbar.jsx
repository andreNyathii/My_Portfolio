import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'

// ============================================================
// NAV LINKS DATA
// ============================================================
const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact',  path: '/contact' },
]

// ============================================================
// NAVBAR COMPONENT
// ============================================================
// This component now handles two layouts:
//   Desktop (md and above): the original centred glassmorphism bar.
//   Mobile (below md):      a hamburger button that opens a full-screen overlay menu.
//
// The overlay approach (vs. a dropdown) is preferred on mobile because:
//   - It gives the menu items room to breathe — large tap targets, comfortable spacing.
//   - It feels intentional and designed, not like an afterthought.
//   - It locks body scroll, preventing accidental page movement while navigating.
// ============================================================
function Navbar() {

  // isOpen tracks whether the mobile overlay menu is visible.
  // false = closed (default). true = open.
  const [isOpen, setIsOpen] = useState(false)

  // When the menu opens, lock the body scroll so the page doesn't
  // scroll beneath the overlay. The cleanup function restores scroll
  // when the component unmounts or isOpen changes back to false.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // close() is passed to all nav links in the overlay so clicking
  // any link also dismisses the menu.
  const close = () => setIsOpen(false)

  return (
    // React fragments (<> </>) let us return multiple top-level elements.
    // We need two: the fixed navbar bar and the overlay panel.
    <>

      {/* ============================================================
          THE FIXED NAVIGATION BAR (always visible at top)
         ============================================================ */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-dark/75 backdrop-blur-md border-b border-white/5">

        {/* justify-between on mobile (logo left, burger right).
            On md+ we override to justify-start since the links
            are absolutely centred and don't need space-between. */}
        <div className="relative px-8 py-5 flex items-center justify-between md:justify-start">

          {/* === LOGO ===
              Visible on all screen sizes (removed `hidden md:flex`).
              On mobile it anchors the left side of the navbar bar. */}
          <NavLink to="/" onClick={close} className="flex items-center">
            {/* The overflow-hidden wrapper clips the white border baked into
                the logo image. scale-[1.18] zooms past the border edges. */}
            <div className="overflow-hidden h-9 w-20 rounded-sm">
              <img
                src={Logo}
                alt="André Nyathi Logo"
                className="w-full h-full object-cover scale-[1.18] hover:scale-[1.22] transition-transform duration-300"
              />
            </div>
          </NavLink>

          {/* === DESKTOP NAV LINKS ===
              hidden on mobile (md:flex shows them at 768px+).
              Absolutely centred using the left-1/2 -translate-x-1/2 trick. */}
          <ul className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-1 list-none">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    [
                      'font-italiana text-lg tracking-[0.2em] uppercase px-5 py-2 rounded transition-all duration-300',
                      isActive
                        ? 'text-gold bg-gold/[0.06] border border-gold/[0.1]'
                        : 'text-cream/40 hover:text-cream/80 hover:bg-white/[0.04] border border-transparent',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* === HAMBURGER BUTTON (mobile only) ===
              md:hidden = only renders below 768px.
              Three lines of different widths (6 / 4 / 6) gives it a
              refined look vs. three identical bars.
              aria-label is required for screen readers and accessibility. */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex flex-col gap-[6px] p-2 group"
            aria-label="Open navigation menu"
          >
            <span className="block w-6 h-px bg-cream/50 group-hover:bg-gold transition-colors duration-300" />
            <span className="block w-4 h-px bg-cream/50 group-hover:bg-gold transition-colors duration-300 ml-auto" />
            <span className="block w-6 h-px bg-cream/50 group-hover:bg-gold transition-colors duration-300" />
          </button>

        </div>
      </nav>

      {/* ============================================================
          MOBILE FULL-SCREEN OVERLAY MENU
          z-[60] — sits above the navbar (z-50) so it covers everything.
          opacity + pointer-events are transitioned together to create a
          smooth fade-in / fade-out. When closed, pointer-events-none
          ensures nothing inside the hidden overlay is accidentally tappable.
         ============================================================ */}
      <div
        className={[
          'fixed inset-0 z-[60] bg-dark flex flex-col md:hidden',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >

        {/* --- TOP BAR inside overlay: logo + close button --- */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">

          {/* Logo inside overlay — clicking it navigates home AND closes menu */}
          <NavLink to="/" onClick={close} className="flex items-center">
            <div className="overflow-hidden h-9 w-20 rounded-sm">
              <img
                src={Logo}
                alt="André Nyathi Logo"
                className="w-full h-full object-cover scale-[1.18]"
              />
            </div>
          </NavLink>

          {/* Close (X) button — SVG drawn inline for zero dependency */}
          <button
            onClick={close}
            className="p-2 text-cream/40 hover:text-gold transition-colors duration-300"
            aria-label="Close navigation menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="17" y1="1" x2="1"  y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* --- NAVIGATION LINKS (vertical, centred in the remaining space) ---
            flex-1 makes this section expand to fill all space between the top
            bar and the footer strip below, keeping the links naturally centred. */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={close}
              // Each link staggers its fade-in when the menu opens.
              // style transitionDelay applies a per-item delay (0ms, 60ms, 120ms, 180ms).
              // When closing (isOpen false), delay is 0 so all fade out together.
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}
              className={({ isActive }) =>
                [
                  'font-italiana text-5xl tracking-[0.06em] uppercase py-4 px-8 rounded',
                  'transition-all duration-300',
                  isActive
                    ? 'text-gold'
                    : 'text-cream/40 hover:text-cream/90',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* --- FOOTER STRIP inside overlay: social links ---
            Anchored to the bottom of the overlay. Gives the user
            quick access to LinkedIn and GitHub without needing to navigate away. */}
        <div className="px-8 py-8 border-t border-white/5 flex gap-8 justify-center">
          <a
            href="https://www.linkedin.com/in/andrenyathi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/25 hover:text-gold text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/andreNyathii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/25 hover:text-gold text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
          >
            GitHub
          </a>
        </div>

      </div>

    </>
  )
}

export default Navbar
