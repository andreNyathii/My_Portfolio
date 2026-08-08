import { NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'

// Our nav pages as an array of objects.
// label = display text | path = URL it navigates to
const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact',  path: '/contact' },
]

function Navbar() {
  return (
    // === THE NAV BAR CONTAINER ===
    // fixed top-0 left-0  → locks it to the top of the viewport, doesn't scroll away
    // w-full              → stretches full screen width
    // z-50                → z-index 50 → sits visually above all page content
    // bg-dark/75          → our custom dark color (#0D0D0D) at 75% opacity
    //                       the remaining 25% lets the page content slightly bleed through
    // backdrop-blur-md    → blurs whatever is BEHIND the navbar (the frosted glass look)
    //                       "md" = medium blur. Options: sm, md, lg, xl
    // border-b border-white/5 → a hairline bottom border in white at 5% opacity
    //                           subtle separator between navbar and page content
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/75 backdrop-blur-md border-b border-white/5">

      {/* === INNER ROW === */}
      {/* relative         → makes this div a "positioning anchor" */}
      {/*                    Children with position:absolute will be placed relative to THIS div */}
      {/* px-10 py-5       → padding: 2.5rem left/right, 1.25rem top/bottom */}
      {/*                    py-5 gives the navbar more vertical presence/height */}
      {/* flex items-center → lays children in a horizontal row, vertically centered */}
      <div className="relative px-10 py-5 flex items-center">

        {/* === LOGO (left-anchored) === */}
        {/* NavLink to="/"  → clicking logo goes home, no page reload */}
        {/* flex items-center → centers the image vertically within the link */}
        <NavLink to="/" className="flex items-center">

          {/* === LOGO CROPPING WRAPPER === */}
          {/* The Logo.jpg file has a cream/white border baked INTO the image itself. */}
          {/* We can't remove it with CSS border:none — it's pixel data in the file. */}
          {/* The solution: create a "viewport window" div that's slightly smaller */}
          {/* than the image, then zoom the image so its edges (with the white border) */}
          {/* get pushed outside the window. overflow-hidden clips them off. */}
          {/*                                                                          */}
          {/* overflow-hidden → hides anything that extends beyond this div's edges   */}
          {/* h-9             → height: 2.25rem (36px) — slimmer for an elegant bar   */}
          {/* w-20            → width: 5rem (80px) — the clipping window width         */}
          {/* rounded-sm      → very slight rounding on the logo clip box              */}
          <div className="overflow-hidden h-9 w-20 rounded-sm">
            {/* scale-[1.18] → zooms 118%, pushing ALL four white border edges outside */}
            {/*   scale-110 (10%) wasn't enough — the right border was still showing.  */}
            {/*   scale-[1.18] uses Tailwind's arbitrary value syntax: scale-[VALUE]   */}
            {/*   Arbitrary values let you use ANY number, not just preset ones.        */}
            {/*   Any Tailwind class can take an arbitrary value using square brackets: */}
            {/*   w-[237px], text-[13px], bg-[#ff0000], etc.                           */}
            {/* object-cover → fills the container, crops from edges as needed         */}
            {/* w-full h-full → stretches image to fill its parent completely          */}
            {/* transition-transform duration-300 → smoothly animates scale changes    */}
            {/* hover:scale-[1.22] → zooms slightly more on hover (subtle interaction) */}
            <img
              src={Logo}
              alt="André Nyathi Logo"
              className="w-full h-full object-cover scale-[1.18] hover:scale-[1.22] transition-transform duration-300"
            />
          </div>
        </NavLink>

        {/* === NAV LINKS — Perfectly Centered === */}
        {/* This uses the absolute centering trick: */}
        {/*   absolute          → removes from normal flow, positioned vs parent div  */}
        {/*   left-1/2          → moves the LEFT EDGE of this element to the 50% mark */}
        {/*   -translate-x-1/2  → shifts it back LEFT by 50% of its OWN width        */}
        {/*   Combined: the element's center = the parent's center. Always.           */}
        {/*   top-1/2 -translate-y-1/2 → same trick on the vertical axis             */}
        {/*   flex gap-1        → row layout, 0.25rem gap between each item           */}
        <ul className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 list-none">

          {/* .map() loops over navLinks. For each object in the array, it returns JSX. */}
          {/* The (link) parameter is the current loop item: { label, path }           */}
          {/* key={link.path} → React's required unique ID per list item               */}
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                // end → only relevant on the "/" home link.
                // Without it: since EVERY url starts with "/", the Home link
                // would ALWAYS be considered active, even on /about or /projects.
                // end={true} means: only match if the url is EXACTLY "/", nothing more.
                // end={link.path === '/'} evaluates the === comparison and passes the result:
                //   "/" === "/" → true for home link
                //   "/about" === "/" → false for other links
                end={link.path === '/'}

                // className on NavLink can be a function.
                // React Router calls it with an object { isActive }.
                // isActive is a boolean: true if this link's path = current URL.
                // We use it to conditionally apply different styles.
                className={({ isActive }) =>
                  [
                    // --- Shared base styles (always applied) ---

                    // font-italiana → our custom font registered in tailwind.config.js
                    // This maps to font-family: 'Italiana', serif
                    'font-italiana',

                    // text-lg → font-size: 1.125rem (18px). Bigger navbar = slightly bigger text.
                    'text-lg',

                    // tracking-[0.2em] → letter-spacing: 0.2em (wider than normal tracking-widest)
                    // Arbitrary value because Tailwind's preset tracking-widest = 0.1em,
                    // but Italiana needs more breathing room to look elegant
                    'tracking-[0.2em]',

                    // uppercase → transforms text to ALL CAPS (HOME, ABOUT, etc.)
                    'uppercase',

                    // px-5 py-2 → padding inside the box: 1.25rem horizontal, 0.5rem vertical
                    // More padding = bigger box (as you requested)
                    'px-5 py-2',

                    // rounded → border-radius: 0.25rem. More rounded than rounded-sm.
                    // Options from least to most round: none < sm < DEFAULT < md < lg < xl < full
                    'rounded',

                    // transition-all → animates ALL changing CSS properties simultaneously
                    // duration-300 → the animation takes 300ms
                    'transition-all duration-300',

                    // --- Conditional styles based on isActive ---
                    isActive
                      // ACTIVE STATE — the currently visited page
                      // text-gold         → our custom gold color (#C9913A) from tailwind.config
                      // bg-gold/[0.06]      → gold background at only 6% opacity (barely a tint)
                      // border              → 1px solid border on all four sides
                      // border-gold/[0.1]  → gold border at just 10% opacity — whisper-thin
                      //                      This is the key change: /25 was too assertive,
                      //                      /[0.1] makes it feel like a ghost outline, very refined
                      ? 'text-gold bg-gold/[0.06] border border-gold/[0.1]'

                      // INACTIVE STATE — all other links not currently visited
                      // text-cream/40       → cream at 40% opacity (dimmer than before — more elegant)
                      // hover:text-cream/80 → on hover, brightens to 80% opacity
                      // hover:bg-white/[0.04] → barely visible white tint on hover
                      // border border-transparent → invisible border, same 1px thickness as active
                      //   Why? Without this, inactive links would "jump" by 1px when
                      //   they become active and gain a border. This prevents that layout shift.
                      : 'text-cream/40 hover:text-cream/80 hover:bg-white/[0.04] border border-transparent',
                  ].join(' ')
                  // .join(' ') → turns the array into a single space-separated string
                  // e.g. ['font-italiana', 'text-base', 'px-5'].join(' ')
                  // → 'font-italiana text-base px-5'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
