// MobileCTA.jsx — a fixed bottom bar visible only on mobile screens.
//
// WHY THIS EXISTS:
// On desktop, the navbar is always visible and the hero CTA buttons are
// reachable by scrolling up. On mobile, once a user scrolls down into your
// skills or projects section, there's no persistent way to contact you.
//
// This component solves that by anchoring a "Get In Touch" button to the
// very bottom of the viewport on mobile. It uses:
//   - fixed bottom-0   : stays pinned during scroll (not relative to page)
//   - left-0 right-0   : spans the full width of the screen
//   - md:hidden        : completely removed from the DOM on screens >= 768px
//                        (desktop already has the navbar and hero CTAs)
//   - z-50             : sits above all other content in the stacking order

import { Link } from 'react-router-dom'

function MobileCTA() {
  return (
    // The outer bar — full width, pinned to the bottom, hidden on desktop.
    // bg-dark/90 backdrop-blur-md → semi-transparent frosted glass effect,
    // matching the same glassmorphism treatment used on the navbar.
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-dark/90 backdrop-blur-md border-t border-white/[0.06] px-6 py-4">
      <Link
        to="/contact"
        // w-full → button spans the full width of the bar
        // text-center → centres the label inside the button
        className="block w-full text-center px-6 py-3 bg-gold/[0.10] border border-gold/25 text-gold font-italiana text-sm tracking-[0.2em] uppercase rounded hover:bg-gold/[0.20] hover:border-gold/45 transition-all duration-300"
      >
        Get In Touch
      </Link>
    </div>
  )
}

export default MobileCTA
