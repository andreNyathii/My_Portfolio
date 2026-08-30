// ============================================================
// SCROLL TO TOP
//
// React Router does not scroll to the top of the page on navigation.
// This is intentional — it lets apps with tabbed layouts preserve
// scroll position when switching between tabs.
//
// For a portfolio site where every page is a fresh, full-length view,
// we always want the user to land at the top. This component fixes that.
//
// How it works:
//   1. useLocation() returns the current route object. It changes
//      every time the user navigates to a new URL.
//   2. useEffect runs its callback whenever `pathname` changes.
//   3. window.scrollTo(0, 0) instantly jumps the page to the top-left origin.
//   4. The component renders nothing (returns null) — it has no visible UI.
//      It exists purely for its side-effect.
// ============================================================

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
