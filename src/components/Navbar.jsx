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
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Theme state: defaults to dark unless 'light' is in localStorage.
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light'
    }
    return false
  })

  // Apply or remove the '.light' class on the HTML root element
  // whenever the isLight state changes.
  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const close = () => setIsOpen(false)
  const toggleTheme = () => setIsLight(prev => !prev)

  // Reusable SVG icons for Sun (light mode) and Moon (dark mode)
  const ThemeIcon = () => isLight ? (
    // Moon Icon (shows when in light mode, to indicate switching to dark)
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ) : (
    // Sun Icon (shows when in dark mode, to indicate switching to light)
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  )

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-dark/75 backdrop-blur-md border-b border-white/5">
        <div className="relative px-8 py-5 flex items-center justify-between">

          {/* === LOGO === */}
          <NavLink to="/" onClick={close} className="flex items-center">
            <div className="overflow-hidden h-9 w-20 rounded-sm">
              <img
                src={Logo}
                alt="André Nyathi Logo"
                className="w-full h-full object-cover scale-[1.18] hover:scale-[1.22] transition-transform duration-300"
              />
            </div>
          </NavLink>

          {/* === DESKTOP NAV LINKS === */}
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

          {/* === RIGHT SIDE CONTROLS === */}
          <div className="flex items-center gap-4">
            {/* Desktop Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center p-2 text-cream/40 hover:text-gold transition-colors duration-300"
              aria-label="Toggle Light/Dark Mode"
            >
              <ThemeIcon />
            </button>

            {/* Mobile Hamburger Button */}
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

        </div>
      </nav>

      {/* === MOBILE FULL-SCREEN OVERLAY MENU === */}
      <div
        className={[
          'fixed inset-0 z-[60] bg-dark flex flex-col md:hidden',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {/* --- TOP BAR --- */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
          <NavLink to="/" onClick={close} className="flex items-center">
            <div className="overflow-hidden h-9 w-20 rounded-sm">
              <img
                src={Logo}
                alt="André Nyathi Logo"
                className="w-full h-full object-cover scale-[1.18]"
              />
            </div>
          </NavLink>

          <div className="flex items-center gap-4">
            {/* Mobile Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-cream/40 hover:text-gold transition-colors duration-300"
              aria-label="Toggle Light/Dark Mode"
            >
              <ThemeIcon />
            </button>

            {/* Close Button */}
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
        </div>

        {/* --- NAVIGATION LINKS --- */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={close}
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

        {/* --- FOOTER STRIP --- */}
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
