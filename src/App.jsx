// BrowserRouter: enables URL-based navigation in the browser
// Routes: the container that holds all our route definitions
// Route: maps a specific URL path to a component
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Our components & pages
import Navbar from './components/Navbar'
import MobileCTA from './components/MobileCTA'

// Code splitting: dynamically import pages only when their route is accessed.
// This splits the single large JavaScript bundle into smaller chunks,
// so the user only downloads the code they need for the page they are on.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// A simple loading screen to show while the next page's chunk is downloading.
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-dark">
      <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
    </div>
  )
}

function App() {
  return (
    // BrowserRouter wraps everything — it's what gives our app
    // awareness of the browser's URL bar
    <BrowserRouter>

      {/* Navbar is OUTSIDE <Routes> — this means it renders on EVERY page */}
      <Navbar />

      {/* MobileCTA is also outside <Routes> — renders on every page, but
          the component itself uses md:hidden so it only shows on mobile.
          Placing it here means we define it once instead of in every page. */}
      <MobileCTA />

      {/* pt-28 → increases top padding to match the taller navbar so content isn't hidden behind it */}
      {/* pb-20 → adds bottom padding so mobile content isn't hidden behind the sticky MobileCTA bar */}
      <main className="pt-28 pb-20 md:pb-0">

        {/* Suspense catches the "loading state" when a lazy-loaded component
            is being fetched from the server. It displays the fallback UI
            until the component is ready to render. */}
        <Suspense fallback={<PageLoader />}>
          {/* Routes looks at the current URL and renders the first <Route> that matches */}
          <Routes>
            {/* exact path "/" -> show Home */}
            <Route path="/" element={<Home />} />

            {/* path "/about" -> show About */}
            <Route path="/about" element={<About />} />

            {/* path "/projects" -> show Projects */}
            <Route path="/projects" element={<Projects />} />

            {/* path "/contact" -> show Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* path "/privacy" -> show Privacy Policy
                This is a real route, not a modal or overlay.
                It's a standalone page so it can be linked to and indexed. */}
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* The wildcard route — "*" matches every URL that didn't match above.
                Order matters: React Router checks routes top to bottom, so this
                must always be LAST. It's the safety net for unknown URLs. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

      </main>

    </BrowserRouter>
  )
}

export default App
