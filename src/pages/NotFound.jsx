// NotFound.jsx — the custom 404 page.
//
// WHY THIS EXISTS:
// React Router renders nothing when a URL doesn't match any defined <Route>.
// This page is registered with the wildcard path ("*") in App.jsx, which means
// it catches every URL that fell through all the other routes.
// Instead of a blank screen or a generic browser error, the user sees a branded
// page that keeps them in the experience and gives them a clear path back.

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function NotFound() {
  return (
    <div className="bg-dark min-h-screen flex items-center justify-center px-8">

      <Helmet>
        <title>Page Not Found · Mduduzi André Nyathi</title>
        <meta name="description" content="This page doesn't exist. Navigate back to the portfolio of Mduduzi André Nyathi." />
      </Helmet>

      {/* Ambient glow — matches the style used in Hero sections across the site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.025] blur-[120px]" />
      </div>

      {/* Centred content block */}
      <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-md">

        {/* The 404 number — large Italiana display, gold accent on the zeros */}
        <p className="font-italiana text-[120px] leading-none text-cream/[0.06] tracking-[0.1em] select-none">
          404
        </p>

        {/* Decorative rule — same gold hairline used across all sections */}
        <div className="w-12 h-px bg-gold/40" />

        {/* Heading */}
        <h1 className="font-italiana text-4xl text-cream tracking-[0.05em] -mt-2">
          Page Not Found
        </h1>

        {/* Body text */}
        <p className="text-cream/35 text-sm leading-relaxed font-light">
          The page you're looking for doesn't exist or has been moved. Head back to the homepage.
        </p>

        {/* CTA back to home — reuses the same button pattern from across the site */}
        <Link
          to="/"
          className="mt-2 px-10 py-3.5 bg-gold/[0.08] border border-gold/20 text-gold font-italiana text-sm tracking-[0.2em] uppercase rounded hover:bg-gold/[0.18] hover:border-gold/40 transition-all duration-300"
        >
          Back to Home
        </Link>

      </div>
    </div>
  )
}

export default NotFound
