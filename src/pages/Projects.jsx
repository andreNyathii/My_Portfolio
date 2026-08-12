import { Link } from 'react-router-dom'

// ============================================================
// DATA STRUCTURES
// ============================================================

// The devicon URLs for our tech stack icons.
const icons = {
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  csharp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  dotnet: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  cplusplus: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  arduino: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
  postgres: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  kicad: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg', // generic placeholder for kicad
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
}

const projectsData = [
  {
    title: 'EasySchedule',
    subtitle: 'Agentic Workforce Scheduling System',
    type: 'Freelance Architecture',
    description: 'Designed a deterministic enterprise scheduling backend using Domain-Driven Design and Clean Architecture. Integrated Google OR-Tools constraint solver to optimize employee shifts against complex real-world constraints (role matching, availability, weekly hour caps). Leveraged Microsoft Semantic Kernel and Google Gemini Pro to enable interactive "chat-with-your-business" capabilities while strictly enforcing domain restrictions.',
    tech: [
      { name: 'C#', url: icons.csharp },
      { name: '.NET 9', url: icons.dotnet },
      { name: 'PostgreSQL', url: icons.postgres },
    ]
  },
  {
    title: 'EcoNode Telemetry',
    subtitle: 'End-to-End IoT Data Logger',
    type: 'Full-Stack & Hardware (Concept)',
    description: 'Architected a complete industrial data logging pipeline bridging custom hardware and web infrastructure. Designed an ESP32-based PCB in KiCad for sensor integration and reliable data sampling. Built a C# ASP.NET Core backend to ingest real-time MQTT telemetry, exposing a secure REST API for a React/Tailwind frontend dashboard that visualizes equipment health.',
    tech: [
      { name: 'React', url: icons.react },
      { name: 'C#', url: icons.csharp },
      { name: '.NET', url: icons.dotnet },
      { name: 'C++', url: icons.cplusplus },
    ]
  },
  {
    title: 'Accessible Alarm System',
    subtitle: 'Multimodal Alert Device for the Hearing-Impaired',
    type: 'Embedded Systems',
    description: 'Designed and prototyped a custom electronic alarm system utilizing multimodal sensory feedback (haptic, visual, and audible). Engineered around an ATmega328P microcontroller running a finite state machine, interfacing with an I2C OLED display and a DS3231 RTC for precision timekeeping. Designed the power stage with an N-Channel MOSFET to drive high-current PWM vibration motors.',
    tech: [
      { name: 'C', url: icons.c },
      { name: 'C++', url: icons.cplusplus },
      { name: 'Arduino', url: icons.arduino },
    ]
  },
  {
    title: 'Autonomous Suitcase',
    subtitle: 'Self-Following Luggage System',
    type: 'Hardware Prototyping',
    description: 'Led an engineering team to design, program, and prototype a hands-free autonomous travel suitcase with active user-following capabilities. Sourced and integrated electronic hardware including Arduino microcontrollers, ultrasonic sensor arrays, and motor drivers. Developed embedded navigation code for obstacle avoidance and coordinated system-wide control loop validation.',
    tech: [
      { name: 'C++', url: icons.cplusplus },
      { name: 'Arduino', url: icons.arduino },
    ]
  },
  {
    title: 'Fleet Tracker',
    subtitle: 'Real-Time Telemetry Dashboard',
    type: 'Web Application',
    description: 'Architected high-level system diagrams defining telemetry data flow from embedded vehicular units to web dashboards. Co-developed the web application utilizing React.js, integrating REST APIs for real-time asset tracking and location visualization.',
    tech: [
      { name: 'React', url: icons.react },
      { name: 'Python', url: icons.python },
      { name: 'JS', url: icons.javascript },
    ]
  }
]

const servicesData = [
  {
    title: 'Full-Stack Web MVP',
    desc: 'From zero to deployed. I build responsive React frontends powered by robust C# .NET or Node.js backends.'
  },
  {
    title: 'Embedded Firmware & IoT',
    desc: 'C/C++ firmware development for ESP32, ATmega, and Arduino ecosystems, bridging edge devices to cloud APIs.'
  },
  {
    title: 'Custom PCB Layout',
    desc: 'Schematic capture and PCB routing using KiCad and EAGLE for specialized hardware prototypes.'
  },
  {
    title: 'AI Integration',
    desc: 'Integrating LLMs (Gemini, Semantic Kernel) safely into business logic without compromising system constraints.'
  }
]

// ============================================================
// COMPONENT
// ============================================================
function Projects() {
  return (
    <div className="bg-dark min-h-screen">
      
      {/* ======================================================
          HERO SECTION
         ====================================================== */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
            Portfolio
          </span>
          <h1 className="font-italiana text-6xl md:text-7xl text-cream mt-4 tracking-[0.04em] leading-[1.1]">
            Selected <span className="text-gold">Works.</span>
          </h1>
          <p className="text-cream/40 text-sm mt-6 max-w-lg mx-auto font-light leading-relaxed">
            A showcase of my engineering journey—spanning low-level embedded hardware, deterministic backend architecture, and modern web interfaces.
          </p>
        </div>
      </section>

      {/* ======================================================
          PROJECTS LIST (Alternating Layout)
         ====================================================== */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-24 md:gap-32">
          {projectsData.map((project, index) => {
            // Determine if the layout should be flipped (every odd index)
            const isReversed = index % 2 !== 0

            return (
              <div 
                key={project.title} 
                className={`flex flex-col gap-10 md:gap-16 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
              >
                
                {/* Left Side (or Right if reversed): Text Content */}
                <div className="flex-1 flex flex-col gap-5">
                  <span className="text-gold/50 text-[10px] tracking-[0.4em] uppercase">
                    {project.type}
                  </span>
                  
                  <div>
                    <h2 className="font-italiana text-4xl text-cream tracking-wide mb-2">
                      {project.title}
                    </h2>
                    <h3 className="text-cream/40 text-sm tracking-wider font-light">
                      {project.subtitle}
                    </h3>
                  </div>

                  <p className="text-cream/60 text-sm leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Shine-on-hover Tech Icons */}
                  <div className="flex gap-4 mt-4">
                    {project.tech.map(t => (
                      <div key={t.name} className="group relative cursor-default">
                        <img 
                          src={t.url} 
                          alt={t.name} 
                          className="w-7 h-7 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        />
                        {/* Tooltip on hover */}
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                          {t.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side (or Left if reversed): Abstract Visual representation */}
                <div className="flex-1 w-full relative">
                  {/* We use a frosted glass container as a placeholder for actual project screenshots */}
                  <div className="aspect-[4/3] rounded bg-white/[0.01] border border-white/[0.04] p-8 flex items-center justify-center relative overflow-hidden group">
                    {/* Decorative glow inside the card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Minimalist wireframe/abstract graphic */}
                    <div className="w-full h-full border border-white/[0.03] rounded-sm flex items-center justify-center relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />
                      <span className="font-italiana text-cream/10 text-2xl tracking-[0.2em] group-hover:text-cream/20 transition-colors duration-500">
                        {project.title.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </section>

      {/* ======================================================
          FREELANCE & SERVICES SECTION
         ====================================================== */}
      <section className="py-24 px-8 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cream/20 text-[10px] tracking-[0.6em] uppercase">
              Business & Collaboration
            </span>
            <h2 className="font-italiana text-4xl text-cream mt-3 tracking-[0.06em]">
              Freelance Services
            </h2>
            <div className="w-12 h-px bg-gold/40 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map(service => (
              <div key={service.title} className="p-8 rounded border border-white/[0.04] hover:border-gold/[0.1] hover:bg-gold/[0.02] transition-all duration-300">
                <h3 className="text-gold text-sm tracking-[0.2em] uppercase mb-4">
                  {service.title}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-block px-8 py-3 border border-gold/20 text-gold font-italiana text-sm tracking-[0.2em] uppercase rounded hover:bg-gold/[0.08] transition-all duration-300">
              Discuss a Project
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================
          PHILANTHROPY & PERSONAL NOTE (GoFundMe)
         ====================================================== */}
      <section className="py-32 px-8 border-t border-white/5 relative overflow-hidden">
        {/* Soft bottom glow for this specific section to make it feel distinct */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gold/[0.02] blur-[80px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="text-gold/50 text-[10px] tracking-[0.6em] uppercase block mb-6">
            Community & Support
          </span>
          <h2 className="font-italiana text-3xl md:text-4xl text-cream tracking-wide mb-8">
            A Personal Note
          </h2>
          
          <div className="bg-dark border border-white/[0.08] rounded p-8 md:p-12 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold/30" />
            
            <p className="text-cream/70 text-sm leading-loose font-light mb-6">
              I am currently in my final year of Electrical and Electronics Engineering. Recently, I contracted perimyocarditis, a heart condition that has temporarily impacted my ability to take on standard full-time physical work while I recover. Alongside managing my own final-year university expenses, I am also financially supporting my younger brother through his final year of high school.
            </p>
            <p className="text-cream/70 text-sm leading-loose font-light mb-8">
              If you appreciate my engineering work, or if you are in a position to support a developer crossing the finish line, any contribution goes directly toward our tuition and my medical recovery. I am actively taking on freelance web and embedded contracts in the meantime.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
              {/* Note: This is an external <a> tag, not a React <Link>, because it leaves the site */}
              <a 
                href="https://gofundme.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-3 bg-gold/[0.12] border border-gold/30 text-gold font-italiana text-sm tracking-[0.2em] uppercase rounded hover:bg-gold/[0.2] transition-all duration-300 text-center"
              >
                Support My GoFundMe
              </a>
              <Link 
                to="/contact"
                className="px-8 py-3 border border-white/10 text-cream/50 font-italiana text-sm tracking-[0.2em] uppercase rounded hover:text-cream hover:border-white/30 transition-all duration-300 text-center"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Projects
