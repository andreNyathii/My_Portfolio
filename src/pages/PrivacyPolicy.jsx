// PrivacyPolicy.jsx
//
// WHY THIS EXISTS (legally):
// Germany enforces the EU's GDPR (General Data Protection Regulation).
// This site collects personal data via the contact form (name, email, message).
// GDPR Article 13 requires that data subjects (the people filling in your form)
// are informed at the point of collection about:
//   - What data is collected
//   - Who processes it and where
//   - The legal basis for processing
//   - How long it's retained
//   - Their rights (access, deletion, correction)
//
// This page covers exactly that. It's honest, plain-language, and accurate
// to the actual tools in use (FormSubmit only — no analytics yet).

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Each section of the policy is structured as a data object so the JSX
// stays clean and the content is easy to update in one place.
const sections = [
  {
    title: 'Who is responsible for this site?',
    body: `This portfolio is operated by Mduduzi André Nyathi, based in Kleve, Germany. For any data-related enquiries, you may contact me at andremdu48@gmail.com.`,
  },
  {
    title: 'What data is collected and why?',
    body: `The only personal data collected on this site is submitted voluntarily through the contact form. When you send a message, the following data is processed: your name, your email address, and the content of your message. This data is used solely to respond to your enquiry and for no other purpose.`,
  },
  {
    title: 'Who processes your data?',
    body: `Contact form submissions are handled by FormSubmit (formsubmit.co), a third-party email relay service. Your data is transmitted to their servers to deliver the message to my inbox. FormSubmit does not store your data permanently and does not use it for marketing. For their full data handling policy, visit formsubmit.co.`,
  },
  {
    title: 'Legal basis for processing',
    body: `Processing is carried out on the basis of your consent (GDPR Article 6(1)(a)) — you voluntarily submit the form — and on the basis of legitimate interest (GDPR Article 6(1)(f)) in being able to respond to professional enquiries.`,
  },
  {
    title: 'How long is data retained?',
    body: `Messages received via the contact form are retained in my email inbox only as long as necessary to address the enquiry. I do not maintain a separate database of submitted contact data.`,
  },
  {
    title: 'Your rights under GDPR',
    body: `You have the right to access, correct, or request deletion of any personal data I hold about you. You also have the right to object to processing and to lodge a complaint with the relevant supervisory authority (in Germany: the Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen). To exercise any of these rights, contact me at andremdu48@gmail.com.`,
  },
  {
    title: 'Cookies and tracking',
    body: `This site does not use cookies, tracking scripts, or analytics tools of any kind. No user behaviour is recorded or profiled.`,
  },
  {
    title: 'Changes to this policy',
    body: `This policy may be updated if new data processing activities are introduced (for example, if analytics are added in future). Any changes will be reflected on this page with an updated date below.`,
  },
]

function PrivacyPolicy() {
  return (
    <div className="bg-dark min-h-screen">

      <Helmet>
        <title>Privacy Policy · Mduduzi André Nyathi</title>
        <meta name="description" content="Privacy policy for the portfolio of Mduduzi André Nyathi. Covers contact form data handling in compliance with GDPR." />
      </Helmet>

      {/* ======================================================
          HERO SECTION
         ====================================================== */}
      <section className="relative pt-32 pb-16 px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">Legal</span>
          <h1 className="font-italiana text-5xl text-cream mt-4 tracking-[0.04em] leading-[1.1]">
            Privacy Policy
          </h1>
          {/* Last updated date — update this manually whenever the policy changes */}
          <p className="text-cream/25 text-xs tracking-wider font-light mt-4">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* ======================================================
          POLICY CONTENT
         ====================================================== */}
      <section className="py-16 px-8 pb-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">

          {/* Intro statement */}
          <p className="text-cream/50 text-base leading-relaxed font-light">
            This privacy policy explains how personal data is handled on this website in accordance with the EU General Data Protection Regulation (GDPR).
          </p>

          {/* Policy sections — mapped from the data array above */}
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              {/* Gold hairline rule + section heading — same pattern as the rest of the site */}
              <div className="w-8 h-px bg-gold/30" />
              <h2 className="font-italiana text-2xl text-cream tracking-[0.04em]">
                {section.title}
              </h2>
              <p className="text-cream/45 text-sm leading-relaxed font-light">
                {section.body}
              </p>
            </div>
          ))}

          {/* Navigation back — keeps the user in the site rather than hitting the back button */}
          <div className="flex gap-6 pt-4 border-t border-white/5">
            <Link
              to="/"
              className="text-cream/30 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-cream/30 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

        </div>
      </section>

    </div>
  )
}

export default PrivacyPolicy
