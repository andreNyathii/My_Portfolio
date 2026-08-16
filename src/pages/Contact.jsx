import { useState } from 'react'

// ============================================================
// CONTACT PAGE COMPONENT
// ============================================================
function Contact() {
  // useState hook to manage form data.
  // We store all form fields in a single state object.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // UI states for the submission process
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  // Handle changes to any input field
  const handleChange = (e) => {
    // Destructure name and value from the target element (the input)
    const { name, value } = e.target
    // Update the state using the spread operator (...prev) to keep existing fields,
    // while overwriting the field that just changed using computed property syntax [name]
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the browser's default page reload behavior
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // FormSubmit.co allows us to send an email without a backend or API keys.
      // We use their /ajax/ endpoint to prevent the page from redirecting.
      const response = await fetch("https://formsubmit.co/ajax/andremdu48@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Portfolio Contact from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      const data = await response.json()

      if (response.ok && data.success === "true") {
        setSubmitStatus('success')
        // Clear the form only on success
        setFormData({ name: '', email: '', message: '' })
      } else {
        // If it's the very first time using this email, FormSubmit returns an error
        // asking you to check your email to activate it. We handle that edge case here.
        console.error("FormSubmit Error:", data)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error("Network Error:", error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Hide the status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <div className="bg-dark min-h-screen">
      {/* ======================================================
          HERO SECTION
          Full-width intro matching the About page style.
         ====================================================== */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        {/* Ambient background glow — purely decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[100px] -translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Top label */}
          <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
            Start a Conversation
          </span>

          {/* Main heading */}
          <h1 className="font-italiana text-6xl md:text-7xl text-cream mt-4 tracking-[0.04em] leading-[1.1]">
            Let's build
            <br />
            <span className="text-gold">together.</span>
          </h1>
        </div>
      </section>

      {/* ======================================================
          CONTACT CONTENT
          Two-column grid: Contact Info (left) + Form (right)
         ====================================================== */}
      <section className="px-8 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* LEFT COLUMN: Info & Phrasing */}
          <div className="flex flex-col gap-10">
            {/* The phrasing the user requested regarding collaboration & employment */}
            <div className="flex flex-col gap-4">
              <h2 className="font-italiana text-3xl text-cream tracking-wide">
                Available for full-time roles & technical collaboration.
              </h2>
              <div className="w-12 h-px bg-gold/40 my-2" />
              <p className="text-cream/50 text-sm leading-relaxed font-light">
                Whether you're looking for an engineer to join your team full-time/part time, or you need a freelance developer to help bring a specific digital or embedded project to life, I'm open to discussing how I can add value.
              </p>
            </div>

            {/* Direct contact details */}
            <div className="flex flex-col gap-6 mt-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <span className="text-gold/60 text-[10px] tracking-[0.3em] uppercase">Email</span>
                <a 
                  href="mailto:andremdu48@gmail.com" 
                  className="text-cream/80 hover:text-gold transition-colors duration-300 tracking-wide font-light"
                >
                  andremdu48@gmail.com
                </a>
              </div>
              
              {/* Location */}
              <div className="flex flex-col gap-1">
                <span className="text-gold/60 text-[10px] tracking-[0.3em] uppercase">Location</span>
                <span className="text-cream/80 tracking-wide font-light">
                  Kleve, Germany (Open to Relocation / Remote)
                </span>
              </div>

              {/* Social Links — using standard <a> tags to external sites */}
              <div className="flex gap-6 mt-2">
                <a href="https://www.linkedin.com/in/andrenyathi" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-gold text-sm tracking-[0.2em] uppercase transition-colors duration-300">
                  LinkedIn
                </a>
                <a href="https://github.com/andreNyathii" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-gold text-sm tracking-[0.2em] uppercase transition-colors duration-300">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Contact Form */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded p-8 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-cream/40 text-xs tracking-[0.2em] uppercase">
                  Name
                </label>
                {/* 
                  Form input styling:
                  bg-transparent — relies on the form's background
                  border-b — only a bottom line for that minimalist, elegant look
                  focus:border-gold — lights up gold when the user clicks in
                  outline-none — hides the browser's ugly default blue focus ring
                */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-white/10 py-2 text-cream font-light focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-cream/40 text-xs tracking-[0.2em] uppercase">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-white/10 py-2 text-cream font-light focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-cream/40 text-xs tracking-[0.2em] uppercase">
                  Message
                </label>
                {/* textarea allows multi-line input. resize-none stops the user from breaking our layout */}
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="bg-transparent border-b border-white/10 py-2 text-cream font-light focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  placeholder="How can we work together?"
                ></textarea>
              </div>

              {/* Status Message (Success/Error) */}
              {submitStatus === 'success' && (
                <div className="text-green-500 text-sm tracking-wider font-light">
                  Message sent successfully. I'll be in touch soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-400 text-sm tracking-wider font-light">
                  Activation required or error occurred. Check console or your email.
                </div>
              )}

              {/* Submit Button */}
              {/* disabled={isSubmitting} prevents spam clicks while the fetch is running */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 px-10 py-3.5 bg-gold/[0.08] border border-gold/20 text-gold font-italiana text-sm tracking-[0.2em] uppercase rounded hover:bg-gold/[0.18] hover:border-gold/40 transition-all duration-300 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Contact
