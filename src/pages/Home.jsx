// ============================================================
// Two new React hooks we're introducing here — explained below:
//
// useState(initialValue)
//   A "hook" is a special React function that gives components superpowers.
//   useState lets a component REMEMBER a value between renders.
//   It returns an array of two things:
//     [currentValue, functionToUpdateThatValue]
//   When you call the update function, React re-renders the component
//   with the new value — like a live refresh of just that part of the page.
//
// useEffect(callback, [dependencies])
//   Lets you run code as a "side effect" — meaning code that happens
//   OUTSIDE of rendering: timers, API calls, subscriptions, etc.
//   The second argument [] controls WHEN it runs:
//     []           → run once when the component first appears (mounts)
//     [someVar]    → run every time someVar changes
//     (nothing)    → run after every single render (rarely what you want)
// ============================================================
import { useState, useEffect } from 'react'

// Link — the basic navigation component from React Router.
// Unlike NavLink (which tracks active state), Link just navigates.
// Use NavLink in the Navbar, Link everywhere else.
import { Link } from 'react-router-dom'

// ============================================================
// DATA — defined outside the component so it's only created once,
// not recreated every time the component re-renders.
//
// These logos come from "devicons" — a public CDN of tech logos:
// https://devicon.dev
// URL pattern: .../icons/<name>/<name>-original.svg
// ============================================================
const techStack = [
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'C#',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  },
  {
    name: '.NET',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  },
  {
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Arduino',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Docker',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'Git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
]

// Project data pulled from your CV highlights.
// Same pattern as navLinks — array of objects, one per project.
const featuredProjects = [
  {
    title: 'EasySchedule',
    subtitle: 'Agentic Workforce Scheduling System',
    description:
      'Enterprise scheduling backend using Domain-Driven Design. Integrates Google OR-Tools constraint solver and Gemini Pro for interactive "chat-with-your-business" AI capabilities.',
    tags: ['C#', '.NET 9', 'PostgreSQL', 'OR-Tools', 'Gemini API'],
    type: 'Freelance',
  },
  {
    title: 'Autonomous Suitcase',
    subtitle: 'Self-Following Luggage System',
    description:
      'Led an engineering team to design and prototype a hands-free autonomous suitcase with active user-following, sensor-based obstacle avoidance, and embedded navigation.',
    tags: ['C/C++', 'Arduino', 'Embedded Systems', 'Sensor Arrays'],
    type: 'Rhine-Waal University',
  },
  {
    title: 'Fleet Tracker',
    subtitle: 'Real-Time Fleet Tracking Platform',
    description:
      'Architected full-stack fleet management system from telemetry data flow through embedded vehicular units up to real-time React web dashboards and REST APIs.',
    tags: ['React.js', 'Python', 'REST APIs', 'ESP Microcontrollers'],
    type: 'Petesso GmbH',
  },
]

// ============================================================
// THE COMPONENT
// ============================================================
function Home() {

  // useState — the typing animation state.
  // "displayed" = the string of characters currently visible on screen.
  // "setDisplayed" = the function we call to update it.
  // useState('') = starts as an empty string.
  const [displayed, setDisplayed] = useState('')

  // A second piece of state: whether the cursor blink should show.
  // true = still typing (show cursor), false = done (hide cursor).
  const [isTyping, setIsTyping] = useState(true)

  // The full string we're going to "type" out character by character.
  const tagline = 'Problem Solver.'

  // useEffect runs this once when Home mounts (appears on screen).
  // The [] at the end is the dependency array — empty means "run once only".
  useEffect(() => {
    // We use a variable to track which character index we're on.
    // This lives INSIDE useEffect so it's private to this timer.
    let index = 0

    // setInterval(fn, ms) → calls fn every ms milliseconds.
    // Each call adds one more character to the displayed string.
    const interval = setInterval(() => {
      // .slice(start, end) extracts part of a string.
      // slice(0, 1) → 'P'
      // slice(0, 2) → 'Pr'
      // slice(0, 3) → 'Pro'  ...and so on
      setDisplayed(tagline.slice(0, index + 1))
      index++

      // Once index reaches the last character, stop the interval.
      if (index === tagline.length) {
        clearInterval(interval)
        setIsTyping(false) // hide the cursor when done
      }
    }, 90) // 90ms per character ≈ comfortable "reading while typing" speed

    // Cleanup function: React calls this if the component UNMOUNTS
    // (e.g. user navigates away). Without it, the interval would keep
    // firing even though the component is gone — a "memory leak".
    return () => clearInterval(interval)
  }, []) // [] = run once on mount

  // ============================================================
  // RENDER — what the component actually draws
  // ============================================================
  return (
    // The outer wrapper. bg-dark = our custom #0D0D0D from tailwind.config.
    <div className="bg-dark">

      {/* ======================================================= */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================= */}
      {/* min-h-screen   → at least 100% viewport height           */}
      {/* flex flex-col  → stack children vertically               */}
      {/* items-center   → center children horizontally            */}
      {/* justify-center → center children vertically              */}
      {/* relative       → anchor for the absolute glow below      */}
      {/* overflow-hidden → stops the glow from causing scrollbars */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-8 text-center overflow-hidden">

        {/* Ambient glow — the soft radial highlight in the background.       */}
        {/* This is a placeholder for the animation that will go here later.  */}
        {/* absolute inset-0  → stretches to fill the parent section exactly  */}
        {/* pointer-events-none → mouse events (clicks, hover) pass through   */}
        {/*   this element to whatever is behind it. Important for UX.         */}
        <div className="absolute inset-0 pointer-events-none">
          {/* w-[700px] h-[700px] → arbitrary size using square brackets       */}
          {/* bg-gold/[0.04]      → gold at 4% opacity — very faint warm glow  */}
          {/* blur-[120px]        → heavy CSS blur — creates a soft cloud       */}
          {/* rounded-full        → makes the div a circle before blurring     */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.04] blur-[120px]" />
        </div>

        {/* All hero content sits above the glow using z-10 */}
        {/* z-10 → z-index: 10, above the z-index:0 default of the glow div */}
        {/* flex flex-col items-center gap-6 → vertical stack with 1.5rem gaps */}
        <div className="relative z-10 flex flex-col items-center gap-5">

          {/* Location badge */}
          {/* text-xs          → font-size: 0.75rem (12px)                  */}
          {/* tracking-[0.4em] → very wide letter-spacing (arbitrary value)  */}
          {/* uppercase        → all caps via CSS text-transform             */}
          {/* text-cream/30    → cream at 30% opacity                        */}
          <span className="text-cream/30 text-xs tracking-[0.4em] uppercase font-light">
            Kleve, Germany · Open to Work
          </span>

          {/* NAME */}
          {/* font-italiana → 'Italiana', serif — our elegant display font   */}
          {/* text-6xl      → 3.75rem (60px) on mobile                       */}
          {/* md:text-[7rem] → 7rem on screens ≥ 768px (arbitrary breakpoint value) */}
          {/* md: is Tailwind's "medium" breakpoint prefix.                   */}
          {/* Tailwind is MOBILE-FIRST: base classes target small screens,    */}
          {/* then md:, lg:, xl: override upward. This is the right approach  */}
          {/* because most web traffic is mobile.                             */}
          {/* leading-[1.1]  → line-height: 1.1 (tighter than default 1.5)   */}
          <h1 className="font-italiana text-6xl md:text-[7rem] text-cream leading-[1.1] tracking-[0.03em]">
            Mduduzi André
            <br />
            {/* The last name in gold — the accent color of your brand */}
            <span className="text-gold">Nyathi</span>
          </h1>

          {/* ROLE — the descriptor below the name */}
          <p className="text-cream/35 text-xs md:text-sm tracking-[0.4em] uppercase font-light">
            Software Engineer &nbsp;&nbsp;·&nbsp;&nbsp; Embedded Developer &nbsp;&nbsp;·&nbsp;&nbsp; Web Developer
          </p>

          {/* TAGLINE — the typing animation output */}
          {/* h-12 → fixed height so the layout doesn't jump as text grows   */}
          {/* flex items-center justify-center → keeps it centered at any length */}
          <div className="h-12 flex items-center justify-center">
            <span className="font-italiana text-3xl text-gold/70 italic tracking-[0.1em]">
              {/* {displayed} → React renders this JavaScript variable as text */}
              {displayed}

              {/* Blinking cursor — only shown while isTyping is true */}
              {/* The && operator: if left side is true, render right side. */}
              {/* If left is false, render nothing. It's React's shorthand if. */}
              {/* animate-pulse → Tailwind: fades opacity between 1 and 0.5, looping */}
              {isTyping && (
                <span className="animate-pulse text-gold ml-1">|</span>
              )}
            </span>
          </div>

          {/* CTA BUTTONS */}
          {/* flex-wrap       → buttons wrap to next line on small screens   */}
          {/* justify-center  → keeps them centered when wrapping            */}
          {/* gap-4           → 1rem gap between buttons                     */}
          <div className="flex flex-wrap gap-4 mt-3 justify-center">

            {/* PRIMARY — filled gold tint */}
            <Link
              to="/projects"
              // Lots happening here — let's break it down:
              // px-9 py-3.5   → generous padding for a comfortable click target
              // bg-gold/[0.08] → very transparent gold fill
              // border border-gold/20 → subtle gold outline
              // text-gold     → gold text
              // font-italiana + tracking + uppercase → consistent with navbar style
              // rounded       → slight corner rounding
              // hover:bg-gold/[0.18] → more visible fill on hover
              // hover:border-gold/40 → more visible border on hover
              // transition-all duration-300 → smooth animation on all properties
              className="px-9 py-3.5 bg-gold/[0.08] border border-gold/20 text-gold font-italiana text-sm tracking-[0.2em] uppercase rounded hover:bg-gold/[0.18] hover:border-gold/40 transition-all duration-300"
            >
              View My Work
            </Link>

            {/* SECONDARY — ghost style (no fill) */}
            <Link
              to="/contact"
              className="px-9 py-3.5 border border-cream/10 text-cream/40 font-italiana text-sm tracking-[0.2em] uppercase rounded hover:border-cream/30 hover:text-cream/70 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Scroll indicator — pinned to the bottom of the hero section */}
        {/* absolute bottom-10 → 2.5rem from the bottom of the section */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/20">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          {/* A vertical line that fades out — bg-gradient-to-b = gradient going downward */}
          {/* from-cream/20 → starts at 20% opacity at the top                           */}
          {/* to-transparent → fades to fully transparent at the bottom                  */}
          {/* w-px → width: 1px — a hairline                                             */}
          <div className="w-px h-12 bg-gradient-to-b from-cream/20 to-transparent" />
        </div>
      </section>

      {/* ======================================================= */}
      {/* 2. TECH STACK SECTION                                    */}
      {/* ======================================================= */}
      {/* py-24     → 6rem padding top and bottom (vertical breathing room) */}
      {/* border-t  → 1px top border                                        */}
      {/* border-white/5 → white at 5% opacity — barely visible divider     */}
      <section className="py-24 px-8 border-t border-white/5">
        {/* max-w-5xl → caps content at 64rem wide                          */}
        {/* mx-auto   → centers the block horizontally                      */}
        <div className="max-w-5xl mx-auto">

          {/* Section Label Pattern — used consistently across all sections  */}
          {/* Small uppercase label → large Italiana heading → gold rule     */}
          <div className="text-center mb-16">
            <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
              What I Work With
            </span>
            <h2 className="font-italiana text-4xl text-cream mt-3 tracking-[0.06em]">
              Tech Stack
            </h2>
            {/* Decorative divider line — w-12 h-px = a thin horizontal bar */}
            <div className="w-12 h-px bg-gold/40 mx-auto mt-5" />
          </div>

          {/* Tech logo grid */}
          {/* grid                → CSS Grid layout                          */}
          {/* grid-cols-3         → 3 columns on mobile (base/default)       */}
          {/* md:grid-cols-5      → 5 columns on screens ≥ 768px            */}
          {/* gap-4               → 1rem gap between all grid cells          */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {techStack.map((tech) => (
              // "group" is a Tailwind parent-hover utility:
              // Add "group" to the parent element, then use "group-hover:X"
              // on any child to apply X when the PARENT is hovered.
              // This lets the logo AND label both react to one hover target.
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-3 p-5 rounded border border-white/[0.06] hover:border-gold/[0.15] hover:bg-gold/[0.03] transition-all duration-300 cursor-default"
              >
                {/* Logo image from devicons CDN */}
                {/* grayscale          → CSS filter: removes color (greyed out at rest)  */}
                {/* group-hover:grayscale-0 → removes filter on parent hover (color returns) */}
                {/* opacity-40         → dim at rest                                     */}
                {/* group-hover:opacity-100 → full brightness on hover                  */}
                {/* scale-90           → very slightly smaller at rest                  */}
                {/* group-hover:scale-100 → full size on hover (subtle grow)            */}
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-9 h-9 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
                />
                <span className="text-[10px] tracking-[0.15em] uppercase text-cream/25 group-hover:text-cream/55 transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* 3. FEATURED PROJECTS                                     */}
      {/* ======================================================= */}
      <section className="py-24 px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
              Selected Work
            </span>
            <h2 className="font-italiana text-4xl text-cream mt-3 tracking-[0.06em]">
              Featured Projects
            </h2>
            <div className="w-12 h-px bg-gold/40 mx-auto mt-5" />
          </div>

          {/* grid-cols-1 md:grid-cols-3 → single column mobile, 3-column desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                // flex flex-col → vertical stack inside each card
                // flex-1 on description → makes it grow to fill available space,
                //   so all cards have equal height regardless of text length
                className="group flex flex-col gap-4 p-6 rounded border border-white/[0.06] hover:border-gold/[0.12] hover:bg-white/[0.015] transition-all duration-300"
              >
                {/* Type badge e.g. "Freelance", "University" */}
                <span className="text-gold/40 text-[10px] tracking-[0.35em] uppercase">
                  {project.type}
                </span>

                {/* Title + subtitle */}
                <div>
                  {/* group-hover:text-gold → title turns gold when the whole card is hovered */}
                  <h3 className="font-italiana text-xl text-cream/90 tracking-[0.04em] group-hover:text-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-cream/25 text-xs mt-1 tracking-wide font-light">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                {/* flex-1 → this element grows to take up remaining card height   */}
                {/*   so cards in a row stay the same height even with uneven text */}
                <p className="text-cream/35 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                {/* flex-wrap → tags wrap to next line if too many for one row */}
                {/* mt-auto   → pushes tags to the BOTTOM of the card always   */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-cream/20 tracking-wider border border-white/[0.06] px-2 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Link to full projects page */}
          <div className="text-center">
            <Link
              to="/projects"
              // inline-flex items-center gap-3 → puts text and arrow in a row, centered
              className="font-italiana text-sm tracking-[0.25em] uppercase text-cream/25 hover:text-gold transition-colors duration-300 inline-flex items-center gap-3"
            >
              View All Projects
              <span className="text-gold/40 transition-colors duration-300">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* 4. CTA BANNER                                            */}
      {/* ======================================================= */}
      <section className="py-36 px-8 border-t border-white/5 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-5">

          <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
            Open to Opportunities
          </span>

          <h2 className="font-italiana text-5xl md:text-6xl text-cream tracking-[0.04em] leading-[1.15]">
            Let's Build<br />
            <span className="text-gold">Something.</span>
          </h2>

          <p className="text-cream/30 text-sm leading-relaxed max-w-sm">
            Available for freelance projects, embedded systems contracts,
            and full-time engineering roles. Based in Kleve, Germany —
            open to remote and relocation.
          </p>

          <Link
            to="/contact"
            className="mt-3 px-10 py-3.5 bg-gold/[0.08] border border-gold/20 text-gold font-italiana text-sm tracking-[0.2em] uppercase rounded hover:bg-gold/[0.18] hover:border-gold/40 transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
