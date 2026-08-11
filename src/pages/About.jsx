// Link is used here for the CTA button that navigates to /contact.
// We use Link (not NavLink) because we don't need active-state styling on this page.
import { Link } from 'react-router-dom'

// ============================================================
// DATA — defined outside the component so it is created once
// and not re-instantiated on every render cycle.
// ============================================================

// Work experience entries pulled directly from CV.
// Listed in reverse chronological order: most recent first.
// Each entry maps cleanly to a card in the timeline section.
const experience = [
  {
    period: '09/2025 - 05/2026',
    company: 'Halter Automation',
    location: 'Issum, Germany',
    role: 'Software Engineer',
    bullets: [
      'Engineered and customized HMI (Human-Machine Interface) systems for industrial deployment, enhancing operational monitoring and control.',
      'Built custom internal tools and utilities using C#, .NET framework, and WinForms to optimize deployment workflows.',
      'Implemented multi-language features (internationalization) into HMI software architectures to support global deployments.',
      'Developed automated Python scripts for data sampling, log parsing, and environment configuration, reducing manual processing effort.',
    ],
    stack: ['C#', 'Python', 'ASP.NET', 'MercurialHg', 'WinForms', 'SQL', 'Node.js', 'UI/UX Design', 'Integration Testing'],
  },
  {
    period: '04/2023 - Present',
    company: 'Freelance',
    location: 'Kleve, Germany',
    role: 'Freelance Web Developer',
    bullets: [
      'Delivered end-to-end web applications tailored to client specifications, utilizing both CMS platforms (WordPress/PHP) and custom React/JavaScript builds.',
      'Led discovery workshops with non-technical clients to map business requirements into application architecture, site structure, and UI design.',
      'Implemented secure e-commerce systems, custom API endpoints, and responsive layouts across customer platforms.',
    ],
    stack: ['React.js', 'JavaScript', 'HTML5/CSS3', 'PHP', 'WordPress', 'REST API Design', 'Client Communication'],
  },
  {
    period: '06/2021 - 01/2022',
    company: 'Petesso GMBH',
    location: 'Dortmund, Germany',
    role: 'Software Development Intern',
    bullets: [
      'Executed research and feasibility planning for two major development projects: an Embedded Sensor Suit and a Web-based Fleet Tracking system.',
      'Co-developed the company fleet tracking web application, integrating REST APIs with frontend UI component.',
      'Delivered technical progress presentations, authored system specifications, and participated in sprint reviews.',
    ],
    stack: ['React.js', 'Python', 'C', 'ATmega & ESP Microcontrollers', 'Figma', 'REST APIs', 'Code Testing'],
  },
]

// Education entries from CV.
// Rhine-Waal appears twice — Electrical and Electronics Engineering and BSc Electronics.
const education = [
  {
    period: '06/2019 - Present',
    institution: 'Rhine Waal University of Applied Sciences',
    location: 'Kleve, Germany',
    degree: 'Electrical and Electronics Engineering',
    note: 'Expected Graduation - 01.03.2027 · GPA: 2.5',
    highlights: [
      'Specializations: C, C++, MATLAB, Embedded Systems, Hardware Design, Microelectronic Control Systems, Audio Speech Processing.',
      'Led multidisciplinary engineering teams through full lifecycle project development from requirement definition to functional build.',
    ],
  },
  {
    period: '09/2015 - 06/2019',
    institution: 'Rhine Waal University of Applied Sciences',
    location: 'Kleve, Germany',
    degree: 'BSc Electronics',
    note: 'Transferred focus to complete degree in Electrical and Electronics Engineering',
    highlights: [
      'Specializations: Low Power Design, Power Electronics, Digital Electronics Circuits, Signal Transmission, VHDL.',
    ],
  },
]

// Skill categories: a structured breakdown of capabilities grouped by domain.
// Exact match with CV Skills & Technical Capabilities section.
const skillGroups = [
  {
    label: 'AI Fluency',
    skills: ['Gemini CLI', 'Google Antigravity', 'Claude Code', 'LLM API Integration', 'Google AI Studio', 'AI Assisted Engineering'],
  },
  {
    label: 'Core Backend & Databases',
    skills: ['C# (.NET Core/8/9, ASP.NET Web API, WinForms)', 'Entity Framework Core (EF Core)', 'SQL', 'Node.js API Design', 'Google OR-Tools (Linear Programming)'],
  },
  {
    label: 'Frontend & CMS',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Modern JavaScript (ES6+)', 'PHP', 'WordPress'],
  },
  {
    label: 'Embedded & Hardware',
    skills: ['Embedded C', 'C/C++', 'KiCad', 'EAGLE Schematic & PCB Design', 'Microcontrollers (Arduino, ESP Series, ATmega Series)', 'Industrial HMI Design'],
  },
  {
    label: 'DevOps & Tools',
    skills: ['Git', 'GitHub Actions', 'Docker', 'CI/CD', 'Figma', 'Test-Driven Development (TDD)'],
  },
  {
    label: 'Languages',
    skills: ['English (Native / Full Professional)', 'German (B1 - actively expanding)', 'Zulu (C1)'],
  },
]

// ============================================================
// REUSABLE SECTION HEADING COMPONENT
//
// A small component defined within this file for local reuse.
// It renders the consistent label > title > gold-rule pattern
// used across every section on this page and on Home.
//
// Props:
//   label  — small uppercase descriptor above the heading
//   title  — the main Italiana heading text
//   align  — 'left' or 'center' (defaults to 'left')
// ============================================================
function SectionHeading({ label, title, align = 'left' }) {
  // Derive alignment classes from the align prop.
  // This is a conditional ternary: if align === 'center', use center classes, else left.
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    // flex flex-col — stacks the three elements vertically
    // gap-3 — 0.75rem spacing between label, title, and rule
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
        {label}
      </span>
      <h2 className="font-italiana text-4xl text-cream tracking-[0.06em]">
        {title}
      </h2>
      {/* Decorative horizontal rule — w-12 h-px creates a 1px-tall 3rem-wide line */}
      <div className="w-12 h-px bg-gold/40" />
    </div>
  )
}

// ============================================================
// ABOUT PAGE COMPONENT
// ============================================================
function About() {
  return (
    <div className="bg-dark min-h-screen">

      {/* ======================================================
          HERO SECTION
          Full-width intro: name, role, and executive summary.
          overflow-hidden prevents the ambient glow from creating scrollbars.
         ====================================================== */}
      <section className="relative py-32 px-8 overflow-hidden border-b border-white/5">

        {/* Ambient background glow — purely decorative.
            pointer-events-none ensures it does not interfere with mouse interaction.
            The absolute + inset-0 combination stretches it to fill the parent section. */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[100px] translate-x-1/3 -translate-y-1/3" />
        </div>

        {/* max-w-5xl mx-auto — caps content width at 64rem and centers it horizontally.
            This is the standard container used across the entire site. */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Top label */}
          <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
            About Me
          </span>

          {/* Name heading */}
          {/* mt-4 — 1rem top margin to separate from the label above */}
          <h1 className="font-italiana text-6xl md:text-7xl text-cream mt-4 tracking-[0.04em] leading-[1.1]">
            Mduduzi André
            <br />
            {/* The last name rendered in gold — the single accent per section rule */}
            <span className="text-gold">Nyathi</span>
          </h1>

          {/* Role descriptor */}
          <p className="text-cream/35 text-sm tracking-[0.35em] uppercase font-light mt-6">
            Software Engineer &nbsp;&nbsp;·&nbsp;&nbsp; Embedded & Web Developer &nbsp;&nbsp;·&nbsp;&nbsp; Kleve, Germany
          </p>

          {/* Personal statement / Executive Summary — two-column grid on desktop, single column on mobile.
              md:grid-cols-2 — two equal columns at the md breakpoint (768px and above).
              gap-12 — 3rem gap between columns. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-14">

            {/* Left column: primary statement (from Executive Summary) */}
            <div className="flex flex-col gap-5">
              {/* text-lg leading-relaxed — slightly larger body text with comfortable line height */}
              <p className="text-cream/60 text-lg leading-relaxed font-light">
                Software Engineer and Embedded & Web Developer with Work and Study experience in Industrial Automation Software, Full-Stack Development, and Object-Oriented Design.
              </p>
              <p className="text-cream/45 text-base leading-relaxed font-light">
                Proficient in .NET Framework (.NET Core, WinForms, Web API), SQL database design, React.js, schematic/PCB design (KiCad/EAGLE), and CMS customization (WordPress/PHP).
              </p>
            </div>

            {/* Right column: secondary statement + quick facts */}
            <div className="flex flex-col gap-5">
              <p className="text-cream/45 text-base leading-relaxed font-light">
                Hands-on experience with Git, Mercurial (Hg), and continuous integration workflows. Native/Fluent English, Intermediate German (B1 - actively expanding). Excellent communicator capable of bridging business logic between technical development teams and non-technical clients.
              </p>

              {/* Quick-facts grid — 2 items per row using grid */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { label: 'Based In',    value: 'Kleve, Germany' },
                  { label: 'Email',       value: 'andrenyathi@gmail.com' },
                  { label: 'Languages',   value: 'EN · DE (B1) · ZU' },
                  { label: 'Graduation',  value: '01.03.2027' },
                ].map((item) => (
                  // Each fact is a small bordered card.
                  // key={item.label} — required unique identifier for list-rendered elements.
                  <div key={item.label} className="flex flex-col gap-1 p-3 border border-white/[0.06] rounded">
                    <span className="text-[10px] text-cream/25 tracking-[0.3em] uppercase">{item.label}</span>
                    <span className="text-cream/70 text-sm font-light">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================
          SKILLS SECTION
          Skills grouped by domain, displayed as tag clusters.
         ====================================================== */}
      <section className="py-24 px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col gap-14">

          <SectionHeading label="Capabilities" title="Skills" />

          {/* Skill group grid — 1 column mobile, 2 columns desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-4">

                {/* Group label — acts as a sub-heading for each domain */}
                <span className="text-gold/60 text-xs tracking-[0.3em] uppercase font-light">
                  {group.label}
                </span>

                {/* Tag cluster — flex-wrap lets tags flow to new lines as needed */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      // Each skill is rendered as a bordered pill tag.
                      // px-3 py-1 — compact padding inside each tag.
                      // rounded-sm — very slight corner rounding.
                      // border border-white/[0.08] — near-invisible border.
                      // hover:border-gold/20 — border brightens slightly on hover.
                      // transition-colors — animates the border colour change.
                      className="text-cream/45 text-xs tracking-wider border border-white/[0.08] px-3 py-1 rounded-sm hover:border-gold/20 hover:text-cream/65 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          EXPERIENCE SECTION
          Timeline of professional roles, most recent first.
         ====================================================== */}
      <section className="py-24 px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col gap-14">

          <SectionHeading label="Professional History" title="Experience" />

          {/* Timeline — uses a left border as the visual "track" of the timeline.
              border-l border-white/[0.06] — hairline left border down the full column. */}
          <div className="flex flex-col gap-0 border-l border-white/[0.06] ml-2">
            {experience.map((job, index) => (
              // Each job entry sits beside the timeline track.
              // pl-8 — pushes content 2rem right of the border track.
              // pb-12 — space below each entry before the next.
              // last:pb-0 — removes bottom padding from the final entry.
              <div
                key={index}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline node — a small dot sitting on the track line.
                    absolute positions it relative to the job entry div.
                    -left-[5px] aligns it to sit centred on the border track.
                    top-1 offsets it slightly from the top for visual alignment. */}
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border border-gold/40 bg-dark" />

                {/* Entry header — period and company on the same row (desktop) */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-5">
                  <div>
                    <h3 className="font-italiana text-2xl text-cream tracking-[0.04em]">
                      {job.role}
                    </h3>
                    {/* Company and location separated by a middle dot */}
                    <p className="text-gold/60 text-xs tracking-[0.25em] uppercase mt-1">
                      {job.company} &nbsp;·&nbsp; {job.location}
                    </p>
                  </div>
                  <span className="text-cream/20 text-xs tracking-[0.2em] font-light shrink-0">
                    {job.period}
                  </span>
                </div>

                {/* Bullet points — each rendered as a styled list item */}
                <ul className="flex flex-col gap-2.5 mb-5">
                  {job.bullets.map((bullet, i) => (
                    // key={i} — index is acceptable as a key when list order never changes
                    <li key={i} className="flex gap-3 text-cream/40 text-sm leading-relaxed font-light">
                      {/* Custom bullet: a small dash in gold */}
                      <span className="text-gold/40 mt-0.5 shrink-0">—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech stack tags for this role */}
                <div className="flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] text-cream/20 tracking-wider border border-white/[0.06] px-2 py-0.5 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          EDUCATION SECTION
          Same timeline pattern as experience, reused for consistency.
         ====================================================== */}
      <section className="py-24 px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col gap-14">

          <SectionHeading label="Academic Background" title="Education" />

          <div className="flex flex-col gap-0 border-l border-white/[0.06] ml-2">
            {education.map((entry, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0">

                {/* Timeline node — same styling as the experience section */}
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border border-gold/40 bg-dark" />

                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-5">
                  <div>
                    <h3 className="font-italiana text-2xl text-cream tracking-[0.04em]">
                      {entry.degree}
                    </h3>
                    <p className="text-gold/60 text-xs tracking-[0.25em] uppercase mt-1">
                      {entry.institution} &nbsp;·&nbsp; {entry.location}
                    </p>
                  </div>
                  <span className="text-cream/20 text-xs tracking-[0.2em] font-light shrink-0">
                    {entry.period}
                  </span>
                </div>

                {/* Italicised note — GPA, transfer note, graduation date */}
                <p className="text-gold/40 text-xs tracking-wider mb-4 font-light">
                  {entry.note}
                </p>

                {/* Highlight list — academic specialisations */}
                <ul className="flex flex-col gap-2">
                  {entry.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-cream/35 text-sm leading-relaxed font-light">
                      <span className="text-gold/40 mt-0.5 shrink-0">—</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          PERSONAL SECTION
          Hobbies, interests, and what exists outside the work.
          Based on CV "Hobbies & Interests" section.
          Kept intentionally sparse — this section breathes.
         ====================================================== */}
      <section className="py-24 px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto">

          <SectionHeading label="Outside the Work" title="Personal" />

          {/* Two-column layout: quote left, interests right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-14">

            {/* Left — executive summary quote */}
            <div className="flex flex-col gap-6">
              {/* blockquote — semantic HTML element for quoted content */}
              <blockquote className="border-l-2 border-gold/30 pl-6">
                <p className="font-italiana text-2xl text-cream/70 leading-relaxed tracking-[0.03em] italic">
                  "Bridging business logic between technical development teams and non-technical clients."
                </p>
              </blockquote>
              <p className="text-cream/35 text-sm leading-relaxed font-light pl-6">
                Work and study experience in Industrial Automation Software, Full-Stack Development, and Object-Oriented Design. Outside of work, active in sports, music, and continuous learning.
              </p>
            </div>

            {/* Right — interest tags, styled consistently with skill tags */}
            <div className="flex flex-col gap-6">
              <span className="text-cream/20 text-[10px] tracking-[0.5em] uppercase">Interests</span>
              <div className="flex flex-wrap gap-3">
                {['E-Sports', 'Basketball', 'Football', 'Guitar', 'Cinema', 'Music'].map((interest) => (
                  <span
                    key={interest}
                    className="text-cream/40 text-sm tracking-wider border border-white/[0.07] px-4 py-2 rounded font-light hover:border-gold/20 hover:text-cream/60 transition-colors duration-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA SECTION
          Mirrors the Home page CTA for consistency.
          Every page should end with a clear next action.
         ====================================================== */}
      <section className="py-32 px-8 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-5">
          <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
            Work Together
          </span>
          <h2 className="font-italiana text-5xl text-cream tracking-[0.04em] leading-[1.15]">
            Let's Talk.
          </h2>
          <p className="text-cream/30 text-sm leading-relaxed max-w-sm">
            Open to freelance contracts, embedded systems projects,
            and full-time engineering roles. References available upon request.
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

export default About
