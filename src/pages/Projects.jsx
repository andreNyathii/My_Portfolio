import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// ============================================================
// ICON DICTIONARY
// ============================================================
// Each key maps to a devicon or simpleicons CDN URL.
// Adding them all here keeps the data section clean and avoids
// repeating long URLs throughout the file.
const icons = {
  react:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  csharp:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  dotnet:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  cplusplus:  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  python:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  arduino:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
  postgres:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  docker:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  git:        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  nodejs:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  c:          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  kicad:      'https://cdn.simpleicons.org/kicad/C9913A', // KiCad has its own simpleicon, using our gold
  github:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  tailwind:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
}

// ============================================================
// ANIMATED SVG VISUAL COMPONENTS
// ============================================================
// These are pure JSX/SVG components — no images, no external deps.
// Each is thematically designed to represent its project domain.
// CSS animations are written inline via <style> tags scoped to
// each component. This avoids polluting the global stylesheet.

// --- EasySchedule: Animated scheduling grid ---
// Represents the shift-scheduling algorithm filling employee slots.
// Blocks "slide in" on a staggered delay, mimicking OR-Tools solving.
// The "solved" green — muted, premium, in-pocket with the gold palette.
// Desaturated enough to feel intentional, not garish.
const SOLVED_GREEN = '#4A8C68'

// ScheduleViz: Dynamic scheduling algorithm visualisation.
// Phase 1 (0-2s): Blocks appear gold — "being considered" by OR-Tools.
// Phase 2 (2-5s): Some blocks move/shuffle — constraint solving in progress.
// Phase 3 (5s+): Blocks settle and turn green — constraint satisfied.
// This cycle repeats, showing the continuous optimisation loop.
function ScheduleViz() {
  // Each shift block has: grid position, a staggered appear delay,
  // a shuffle (movement) animation that kicks in mid-cycle,
  // and a green "solved" colour that fades in after shuffling.
  // We define them as fixed data so the animation is deterministic.
  const shifts = [
    // Row 0 — Employee 1
    { id:'s00', x:21, y:25,  appearDelay:'0s',    shuffleX:21,  shuffleY:25,  solveDelay:'2.8s' },
    { id:'s01', x:57, y:25,  appearDelay:'0.15s', shuffleX:93,  shuffleY:25,  solveDelay:'3.1s' },
    { id:'s03', x:129,y:25,  appearDelay:'0.3s',  shuffleX:57,  shuffleY:25,  solveDelay:'3.4s' },
    { id:'s04', x:165,y:25,  appearDelay:'0.45s', shuffleX:165, shuffleY:25,  solveDelay:'3.0s' },
    { id:'s05', x:201,y:25,  appearDelay:'0.6s',  shuffleX:201, shuffleY:25,  solveDelay:'3.6s' },
    // Row 1 — Employee 2
    { id:'s10', x:21, y:57,  appearDelay:'0.8s',  shuffleX:21,  shuffleY:57,  solveDelay:'3.2s' },
    { id:'s12', x:93, y:57,  appearDelay:'0.95s', shuffleX:57,  shuffleY:89,  solveDelay:'3.5s' },
    { id:'s13', x:129,y:57,  appearDelay:'1.1s',  shuffleX:129, shuffleY:57,  solveDelay:'3.8s' },
    { id:'s15', x:201,y:57,  appearDelay:'1.25s', shuffleX:201, shuffleY:57,  solveDelay:'3.3s' },
    // Row 2 — Employee 3
    { id:'s21', x:57, y:89,  appearDelay:'1.4s',  shuffleX:93,  shuffleY:57,  solveDelay:'4.0s' },
    { id:'s22', x:93, y:89,  appearDelay:'1.55s', shuffleX:57,  shuffleY:57,  solveDelay:'3.7s' },
    { id:'s24', x:165,y:89,  appearDelay:'1.7s',  shuffleX:165, shuffleY:89,  solveDelay:'4.2s' },
    // Row 3 — Employee 4
    { id:'s30', x:21, y:121, appearDelay:'1.9s',  shuffleX:21,  shuffleY:121, solveDelay:'4.4s' },
    { id:'s32', x:93, y:121, appearDelay:'2.05s', shuffleX:129, shuffleY:121, solveDelay:'4.1s' },
    { id:'s34', x:165,y:121, appearDelay:'2.2s',  shuffleX:165, shuffleY:121, solveDelay:'4.6s' },
    { id:'s35', x:201,y:121, appearDelay:'2.35s', shuffleX:201, shuffleY:121, solveDelay:'4.3s' },
  ]

  return (
    <svg viewBox="0 0 240 155" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        /* Phase 1: Block appears from left (scaleX 0 → 1), gold fill */
        @keyframes blockAppear {
          0%   { opacity:0; transform: scaleX(0); }
          100% { opacity:1; transform: scaleX(1); }
        }
        /* Phase 2: Block wiggles/moves — simulates being shuffled by solver */
        /* We can't easily animate x/y in CSS, so we use a translate shimmy */
        @keyframes blockShimmy {
          0%   { transform: translateX(0px); opacity: 1; }
          20%  { transform: translateX(-4px); }
          40%  { transform: translateX(6px); }
          60%  { transform: translateX(-2px); }
          80%  { transform: translateX(3px); }
          100% { transform: translateX(0px); opacity: 1; }
        }
        /* Phase 3: Block fill transitions from gold to green — constraint satisfied */
        @keyframes blockSolve {
          0%   { fill: #C9913A; fill-opacity: 0.18; }
          100% { fill: ${SOLVED_GREEN}; fill-opacity: 0.28; }
        }
        @keyframes headerPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
        /* Optimising dot: fast blink during solving, slow when done */
        @keyframes solvingBlink {
          0%, 49% { opacity: 0.9; }
          50%, 100% { opacity: 0.1; }
        }
      `}</style>

      {/* Day column headers */}
      {['M','T','W','T','F','S'].map((d, i) => (
        <text key={`h${i}`} x={36 + i * 36} y={14} textAnchor="middle" fontSize="6.5"
          fill="#C9913A" opacity="0.5" fontFamily="monospace"
          style={{ animation:`headerPulse 3s ease-in-out ${i*0.15}s infinite` }}>{d}</text>
      ))}

      {/* Employee row labels */}
      {['E1','E2','E3','E4'].map((e, i) => (
        <text key={`r${i}`} x={9} y={37 + i * 32} textAnchor="middle" fontSize="5.5"
          fill="#F5F0E8" opacity="0.2" fontFamily="monospace">{e}</text>
      ))}

      {/* Empty cell grid — always visible as faint outlines */}
      {[0,1,2,3].flatMap(r => [0,1,2,3,4,5].map(c => (
        <rect key={`cell${r}${c}`}
          x={20 + c * 36} y={22 + r * 32} width={32} height={24}
          fill="none" stroke="#F5F0E8" strokeOpacity="0.04" rx="2" />
      )))}

      {/* Animated shift blocks — each goes through appear → shimmy → solve */}
      {shifts.map(s => (
        <g key={s.id}>
          {/*
            Layer 1: The gold "pending" block.
            Appears first, then fades out as the green block fades in.
            animation-fill-mode: both → the initial state holds before delay fires.
          */}
          <rect
            x={s.x} y={s.y} width={30} height={22} rx="2"
            fill="#C9913A" fillOpacity="0"
            style={{
              transformOrigin: `${s.x}px ${s.y}px`,
              animation: [
                `blockAppear 0.35s ease-out ${s.appearDelay} both`,
                `blockShimmy 0.6s ease-in-out calc(${s.appearDelay} + 1.2s) 1 both`,
              ].join(', '),
            }}
          >
            {/* fillOpacity animates from 0.18 → 0 as the solve animation fires */}
            <animate attributeName="fill-opacity"
              values="0;0.18;0.18;0"
              keyTimes="0;0.1;0.8;1"
              dur="6s" begin={s.appearDelay} repeatCount="indefinite" />
            <animate attributeName="fill"
              values="#C9913A;#C9913A;${SOLVED_GREEN}"
              keyTimes="0;0.6;1"
              dur="6s" begin={s.appearDelay} repeatCount="indefinite" />
          </rect>

          {/*
            Layer 2: The green "solved" block.
            Fades in after the shimmy, signalling the constraint is satisfied.
          */}
          <rect
            x={s.x} y={s.y} width={30} height={22} rx="2"
            fill={SOLVED_GREEN} fillOpacity="0"
          >
            <animate attributeName="fill-opacity"
              values="0;0;0.28;0.28;0"
              keyTimes="0;0.55;0.65;0.9;1"
              dur="6s" begin={s.solveDelay} repeatCount="indefinite" />
          </rect>
        </g>
      ))}

      {/* OPTIMISING label + blinking dot — bottom right */}
      <circle cx="226" cy="148" r="2.5" fill="#C9913A">
        <animate attributeName="opacity" values="0.9;0.1;0.9" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <text x="220" y="151" fontSize="5" fill="#C9913A" opacity="0.5"
        fontFamily="monospace" textAnchor="end">OPTIMISING</text>
    </svg>
  )
}

// --- EcoNode Telemetry: Live telemetry trace + PCB silhouettes ---
// A sine wave being "drawn" from left to right, with small component
// silhouettes (capacitor, IC) framing the edges. Represents the bridge
// between hardware sensing and software visualisation.
function EcoNodeViz() {
  // Pre-compute sine wave points for the SVG path
  const points = []
  for (let x = 0; x <= 200; x += 4) {
    const y = 80 + Math.sin((x / 200) * Math.PI * 4) * 25
    points.push(`${x + 20},${y}`)
  }
  const pathD = `M ${points.join(' L ')}`

  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Grid background — represents a scope/dashboard */}
      {[0,1,2,3].map(i => (
        <line key={`gh${i}`} x1="20" y1={40 + i * 25} x2="220" y2={40 + i * 25}
          stroke="#F5F0E8" strokeOpacity="0.04" strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4].map(i => (
        <line key={`gv${i}`} x1={20 + i * 50} y1="30" x2={20 + i * 50} y2="140"
          stroke="#F5F0E8" strokeOpacity="0.04" strokeWidth="0.5" />
      ))}

      {/* Axis labels */}
      <text x="18" y="28" fontSize="5" fill="#C9913A" opacity="0.4" fontFamily="monospace">°C</text>
      <text x="200" y="148" fontSize="5" fill="#C9913A" opacity="0.4" fontFamily="monospace">t(s)</text>

      {/* The animated telemetry wave */}
      {/* stroke-dasharray = total path length approximation, animates to 0 offset = "draws" the line */}
      <path
        d={pathD}
        fill="none"
        stroke="#C9913A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 2.5s ease-in-out forwards' }}
      />

      {/* Secondary faint trace — represents a second sensor channel */}
      <path
        d={`M 20,90 ${points.map((p, i) => {
          const [x, y] = p.split(',')
          return `L ${x},${parseFloat(y) + 15}`
        }).join(' ')}`}
        fill="none"
        stroke="#F5F0E8"
        strokeWidth="0.5"
        strokeOpacity="0.1"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'drawLine 3s ease-in-out 0.5s forwards' }}
      />

      {/* Live indicator dot at the end of the trace */}
      <circle cx="220" cy="80" r="3" fill="#C9913A" opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="2.2s" fill="freeze" />
        <animate attributeName="r" values="3;5;3" dur="1.5s" begin="2.5s" repeatCount="indefinite" />
      </circle>

      {/* ESP32 chip silhouette — top left corner */}
      <rect x="6" y="6" width="18" height="14" fill="none" stroke="#C9913A" strokeOpacity="0.2" strokeWidth="0.8" rx="1" />
      {[0,1,2].map(i => (
        <line key={`p${i}`} x1="4" y1={9 + i * 3} x2="6" y2={9 + i * 3} stroke="#C9913A" strokeOpacity="0.2" strokeWidth="0.8" />
      ))}
      {[0,1,2].map(i => (
        <line key={`p2${i}`} x1="24" y1={9 + i * 3} x2="26" y2={9 + i * 3} stroke="#C9913A" strokeOpacity="0.2" strokeWidth="0.8" />
      ))}
      <text x="15" y="15" textAnchor="middle" fontSize="4" fill="#C9913A" opacity="0.3" fontFamily="monospace">MCU</text>

      {/* MQTT status label */}
      <text x="220" y="20" textAnchor="end" fontSize="5" fill="#C9913A" opacity="0.4" fontFamily="monospace">MQTT</text>
      <text x="220" y="27" textAnchor="end" fontSize="5" fill="#C9913A" opacity="0.6" fontFamily="monospace">
        LIVE
        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.2s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}

// --- Accessible Alarm: KiCad-inspired PCB layout ---
// Inspired by the actual KiCad PCB for this project.
// Uses a dark navy substrate, gold traces (our brand colour), and
// cream/white component outlines. animateMotion drives signal dots
// along each trace — each representing a live data bus (I2C, PWM, SPI).
function AlarmViz() {
  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes alarmTraceDraw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* PCB substrate — slightly blued dark, like the KiCad dark theme */}
      <rect x="0" y="0" width="240" height="160" fill="#080D18" rx="3" opacity="0.85" />

      {/* PCB dot matrix grid — matches KiCad's background dots */}
      {Array.from({ length: 18 }, (_, r) =>
        Array.from({ length: 28 }, (_, c) => (
          <circle key={`pcbdot${r}${c}`}
            cx={4 + c * 8.4} cy={4 + r * 8.7} r="0.35"
            fill="#C9913A" opacity="0.07" />
        ))
      )}

      {/* Board edge — the PCB outline */}
      <rect x="4" y="4" width="232" height="152" fill="none"
        stroke="#C9913A" strokeWidth="1" strokeOpacity="0.35" rx="2" />

      {/* ======= COMPONENTS ======= */}

      {/* GND pour — large circular pad, top-left (inspired by the coin-cell/GND pad) */}
      <circle cx="24" cy="24" r="13" fill="#C9913A" fillOpacity="0.04"
        stroke="#C9913A" strokeWidth="0.8" strokeOpacity="0.45" />
      <circle cx="24" cy="24" r="7" fill="none"
        stroke="#C9913A" strokeWidth="0.6" strokeOpacity="0.3" />
      <text x="24" y="27" textAnchor="middle" fontSize="4"
        fill="#C9913A" opacity="0.55" fontFamily="monospace">GND</text>

      {/* DS3231 RTC — left side, small IC (like in your PCB) */}
      <rect x="7" y="58" width="34" height="22" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.8" strokeOpacity="0.5" rx="1" />
      {[0,1,2,3].map(i => (
        <g key={`rtcpin${i}`}>
          <line x1="5" y1={62 + i*5} x2="7" y2={62 + i*5}
            stroke="#C9913A" strokeOpacity="0.45" strokeWidth="0.9" />
          <line x1="41" y1={62 + i*5} x2="43" y2={62 + i*5}
            stroke="#C9913A" strokeOpacity="0.45" strokeWidth="0.9" />
        </g>
      ))}
      <text x="24" y="69" textAnchor="middle" fontSize="3.8"
        fill="#C9913A" opacity="0.55" fontFamily="monospace">DS3231</text>
      <text x="24" y="75" textAnchor="middle" fontSize="3.2"
        fill="#C9913A" opacity="0.35" fontFamily="monospace">RTC</text>

      {/* OLED header — top-centre (pin strip like OLED_PINS in image) */}
      <rect x="82" y="8" width="50" height="11" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.7" strokeOpacity="0.4" rx="1" />
      {[0,1,2,3,4,5].map(i => (
        <circle key={`oledpin${i}`}
          cx={86 + i * 8} cy="13" r="2.2" fill="none"
          stroke="#C9913A" strokeOpacity="0.45" strokeWidth="0.6" />
      ))}
      <text x="107" y="7" textAnchor="middle" fontSize="3"
        fill="#C9913A" opacity="0.35" fontFamily="monospace">OLED_PINS</text>

      {/* AVR-ISP header — right of OLED (programming port) */}
      <rect x="143" y="8" width="28" height="16" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.7" strokeOpacity="0.35" rx="1" />
      {[0,1,2].map(i => (
        <g key={`isp${i}`}>
          <circle cx={148 + i*8} cy="13" r="2" fill="none"
            stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.6" />
          <circle cx={148 + i*8} cy="19" r="2" fill="none"
            stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.6" />
        </g>
      ))}
      <text x="157" y="7" textAnchor="middle" fontSize="2.8"
        fill="#C9913A" opacity="0.3" fontFamily="monospace">AVR-ISP</text>

      {/* ===== ATmega328P — CENTRAL IC (wide DIP package) ===== */}
      {/* This is the dominant component, like in your image */}
      <rect x="78" y="52" width="84" height="56" fill="#0C1220"
        stroke="#C9913A" strokeWidth="1.1" strokeOpacity="0.75" rx="1.5" />
      {/* Pin notch (IC orientation marker) */}
      <path d="M 78,72 a 7,7 0 0,0 0,-12" fill="none"
        stroke="#C9913A" strokeWidth="0.7" strokeOpacity="0.5" />
      {/* Left pins — 7 per side */}
      {[0,1,2,3,4,5,6].map(i => (
        <g key={`atml${i}`}>
          <rect x="69" y={56 + i*7} width="5" height="4" fill="none"
            stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.5" />
          <line x1="74" y1={58 + i*7} x2="78" y2={58 + i*7}
            stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.9" />
        </g>
      ))}
      {/* Right pins */}
      {[0,1,2,3,4,5,6].map(i => (
        <g key={`atmr${i}`}>
          <rect x="162" y={56 + i*7} width="5" height="4" fill="none"
            stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.5" />
          <line x1="162" y1={58 + i*7} x2="166" y2={58 + i*7}
            stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.9" />
        </g>
      ))}
      <text x="120" y="77" textAnchor="middle" fontSize="6"
        fill="#C9913A" opacity="0.75" fontFamily="monospace">ATmega</text>
      <text x="120" y="86" textAnchor="middle" fontSize="5"
        fill="#C9913A" opacity="0.5" fontFamily="monospace">328P</text>

      {/* Crystal — oval, below ATmega centre (like Y1 in image) */}
      <ellipse cx="120" cy="122" rx="12" ry="7" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.8" strokeOpacity="0.45" />
      <line x1="108" y1="122" x2="103" y2="122"
        stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.8" />
      <line x1="132" y1="122" x2="137" y2="122"
        stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.8" />
      <text x="120" y="125" textAnchor="middle" fontSize="3.5"
        fill="#C9913A" opacity="0.45" fontFamily="monospace">XTAL</text>

      {/* MOSFET — top right (like AO3400A in image) */}
      <rect x="192" y="20" width="20" height="28" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.7" strokeOpacity="0.45" rx="1" />
      <line x1="212" y1="26" x2="217" y2="26"
        stroke="#C9913A" strokeOpacity="0.4" strokeWidth="0.8" />
      <line x1="212" y1="32" x2="217" y2="32"
        stroke="#C9913A" strokeOpacity="0.4" strokeWidth="0.8" />
      <line x1="212" y1="38" x2="217" y2="38"
        stroke="#C9913A" strokeOpacity="0.4" strokeWidth="0.8" />
      <text x="202" y="36" textAnchor="middle" fontSize="3.5"
        fill="#C9913A" opacity="0.4" fontFamily="monospace">NMOS</text>

      {/* Buzzer — circular component, right side (like BZ1) */}
      <circle cx="208" cy="100" r="16" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.8" strokeOpacity="0.45" />
      <circle cx="208" cy="100" r="9" fill="none"
        stroke="#C9913A" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="208" y="103" textAnchor="middle" fontSize="4"
        fill="#C9913A" opacity="0.5" fontFamily="monospace">BZ1</text>

      {/* Button row — bottom (BTN_RST / UP / DN / SEL) */}
      {['RST','UP','DN','SEL'].map((label, i) => (
        <g key={`btn${i}`}>
          <rect x={22 + i * 26} y={136} width="18" height="16" fill="#0C1220"
            stroke="#C9913A" strokeWidth="0.6" strokeOpacity="0.35" rx="1" />
          <circle cx={31 + i * 26} cy={144} r="4.5" fill="none"
            stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.5" />
          <text x={31 + i * 26} y={134} textAnchor="middle" fontSize="2.8"
            fill="#C9913A" opacity="0.35" fontFamily="monospace">{label}</text>
        </g>
      ))}

      {/* USB-C — bottom left */}
      <rect x="7" y="136" width="16" height="16" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.6" strokeOpacity="0.35" rx="3" />
      <text x="15" y="147" textAnchor="middle" fontSize="3"
        fill="#C9913A" opacity="0.3" fontFamily="monospace">USB-C</text>

      {/* ======= TRACES (drawn on load, then signal pulses run forever) ======= */}

      {/* T1: OLED → ATmega  (I2C data bus) */}
      <path id="at1" d="M 107,19 V 38 H 95 V 52"
        fill="none" stroke="#C9913A" strokeWidth="1.1" strokeOpacity="0.45" strokeLinecap="round"
        strokeDasharray="300" strokeDashoffset="300"
        style={{ animation: 'alarmTraceDraw 0.7s ease-out 0.2s forwards' }} />

      {/* T2: DS3231 RTC → ATmega  (I2C) */}
      <path id="at2" d="M 41,65 H 60 V 70 H 78"
        fill="none" stroke="#C9913A" strokeWidth="1.1" strokeOpacity="0.45" strokeLinecap="round"
        strokeDasharray="300" strokeDashoffset="300"
        style={{ animation: 'alarmTraceDraw 0.7s ease-out 0.45s forwards' }} />

      {/* T3: ATmega → MOSFET  (PWM gate drive) */}
      <path id="at3" d="M 162,60 H 176 V 34 H 192"
        fill="none" stroke="#C9913A" strokeWidth="1.1" strokeOpacity="0.45" strokeLinecap="round"
        strokeDasharray="300" strokeDashoffset="300"
        style={{ animation: 'alarmTraceDraw 0.7s ease-out 0.7s forwards' }} />

      {/* T4: ATmega → Buzzer  (PWM audio) */}
      <path id="at4" d="M 162,76 H 178 V 100 H 192"
        fill="none" stroke="#C9913A" strokeWidth="1.1" strokeOpacity="0.45" strokeLinecap="round"
        strokeDasharray="300" strokeDashoffset="300"
        style={{ animation: 'alarmTraceDraw 0.7s ease-out 0.95s forwards' }} />

      {/* T5a: ATmega → Crystal (left pin) */}
      <path id="at5a" d="M 96,108 V 122 H 108"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"
        strokeDasharray="200" strokeDashoffset="200"
        style={{ animation: 'alarmTraceDraw 0.5s ease-out 1.2s forwards' }} />

      {/* T5b: ATmega → Crystal (right pin) */}
      <path id="at5b" d="M 144,108 V 122 H 132"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"
        strokeDasharray="200" strokeDashoffset="200"
        style={{ animation: 'alarmTraceDraw 0.5s ease-out 1.35s forwards' }} />

      {/* T6: Buttons → ATmega  (GPIO lines) */}
      <path id="at6" d="M 31,136 V 128 H 82 V 108"
        fill="none" stroke="#C9913A" strokeWidth="0.9" strokeOpacity="0.35" strokeLinecap="round"
        strokeDasharray="250" strokeDashoffset="250"
        style={{ animation: 'alarmTraceDraw 0.6s ease-out 1.55s forwards' }} />

      {/* ======= SIGNAL PULSES — animateMotion dots travelling the traces ======= */}
      {/*
        Each <circle> carries a small glowing dot.
        <animateMotion> moves it along the named <path> using <mpath href>.
        begin delay is staggered so pulses feel organic, not simultaneous.
        repeatCount="indefinite" keeps them looping forever.
      */}

      {/* Pulse: OLED → ATmega (I2C) */}
      <circle r="2" fill="#C9913A" opacity="0.9">
        <animateMotion dur="1.6s" begin="1.5s" repeatCount="indefinite">
          <mpath href="#at1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.05;0.9;1" dur="1.6s" begin="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Pulse: RTC → ATmega (I2C) */}
      <circle r="2" fill="#C9913A" opacity="0.9">
        <animateMotion dur="1.9s" begin="2.0s" repeatCount="indefinite">
          <mpath href="#at2" />
        </animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.05;0.9;1" dur="1.9s" begin="2.0s" repeatCount="indefinite" />
      </circle>

      {/* Pulse: ATmega → MOSFET (PWM) — faster, it's a high-freq signal */}
      <circle r="1.8" fill="#C9913A" opacity="0.9">
        <animateMotion dur="1.2s" begin="2.3s" repeatCount="indefinite">
          <mpath href="#at3" />
        </animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.05;0.9;1" dur="1.2s" begin="2.3s" repeatCount="indefinite" />
      </circle>
      {/* Second PWM pulse slightly offset */}
      <circle r="1.8" fill="#C9913A" opacity="0.9">
        <animateMotion dur="1.2s" begin="2.9s" repeatCount="indefinite">
          <mpath href="#at3" />
        </animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.05;0.9;1" dur="1.2s" begin="2.9s" repeatCount="indefinite" />
      </circle>

      {/* Pulse: ATmega → Buzzer (audio PWM) */}
      <circle r="1.8" fill="#C9913A" opacity="0.9">
        <animateMotion dur="1.5s" begin="2.6s" repeatCount="indefinite">
          <mpath href="#at4" />
        </animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.05;0.9;1" dur="1.5s" begin="2.6s" repeatCount="indefinite" />
      </circle>

      {/* Pulse: Button → ATmega (GPIO interrupt) — slower, event-driven */}
      <circle r="1.8" fill="#F5F0E8" opacity="0.7">
        <animateMotion dur="2.2s" begin="3.5s" repeatCount="indefinite">
          <mpath href="#at6" />
        </animateMotion>
        <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.05;0.9;1" dur="2.2s" begin="3.5s" repeatCount="indefinite" />
      </circle>

      {/* Pulsing glow at ATmega core — heartbeat of the MCU */}
      <circle cx="120" cy="80" r="5" fill="#C9913A" opacity="0.7">
        <animate attributeName="r" values="5;10;5" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

// --- Autonomous Suitcase: Top-down navigation with obstacles ---
// Shows an overhead floor plan view. Static obstacle blocks (furniture/walls)
// are placed around the space. The USER dot follows a path that navigates
// AROUND the obstacles. The suitcase follows the user with a lag.
// Ultrasonic arcs pulse from the suitcase front, representing its sensors.
function SuitcaseViz() {
  // The user's navigation waypoints — deliberately routed around the obstacle blocks.
  // These are (cx, cy) keyframe positions as a fraction of the 9s animation.
  // Path: Start centre → dodge right around block1 → squeeze past block2 →
  //       curve around block3 → return home.
  const userPath = 'M 60,80 L 85,55 L 115,50 L 150,65 L 168,90 L 155,118 L 120,125 L 80,110 L 60,80'
  // Suitcase follows the same path but with a slight delay (lag effect)
  const suitPath = 'M 60,80 L 85,55 L 115,50 L 150,65 L 168,90 L 155,118 L 120,125 L 80,110 L 60,80'

  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes suitArc {
          0%   { r: 6; opacity: 0.55; }
          100% { r: 28; opacity: 0; }
        }
        @keyframes obstaclePulse {
          0%, 100% { fill-opacity: 0.08; }
          50%       { fill-opacity: 0.14; }
        }
      `}</style>

      {/* Floor tile grid — top-down architectural view */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`fh${i}`} x1="0" y1={i * 24} x2="240" y2={i * 24}
          stroke="#F5F0E8" strokeOpacity="0.04" strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <line key={`fv${i}`} x1={i * 27} y1="0" x2={i * 27} y2="160"
          stroke="#F5F0E8" strokeOpacity="0.04" strokeWidth="0.5" />
      ))}

      {/* ======= OBSTACLE BLOCKS (furniture / walls) ======= */}
      {/*
        These are fixed rectangular objects in the space.
        The user's path visibly routes around all of them.
        They have a subtle fill pulse to feel "physical" rather than drawn.
      */}

      {/* Block 1 — large obstacle, upper-left area */}
      <rect x="12" y="28" width="42" height="28" rx="2"
        fill="#F5F0E8" fillOpacity="0.06" stroke="#F5F0E8" strokeOpacity="0.15" strokeWidth="0.8"
        style={{ animation: 'obstaclePulse 4s ease-in-out infinite' }} />
      <text x="33" y="44" textAnchor="middle" fontSize="4"
        fill="#F5F0E8" opacity="0.2" fontFamily="monospace">OBS</text>

      {/* Block 2 — mid-top corridor narrower */}
      <rect x="100" y="14" width="26" height="22" rx="2"
        fill="#F5F0E8" fillOpacity="0.06" stroke="#F5F0E8" strokeOpacity="0.15" strokeWidth="0.8"
        style={{ animation: 'obstaclePulse 4s ease-in-out 1s infinite' }} />
      <text x="113" y="27" textAnchor="middle" fontSize="4"
        fill="#F5F0E8" opacity="0.2" fontFamily="monospace">OBS</text>

      {/* Block 3 — right side wall section */}
      <rect x="186" y="52" width="46" height="56" rx="2"
        fill="#F5F0E8" fillOpacity="0.06" stroke="#F5F0E8" strokeOpacity="0.15" strokeWidth="0.8"
        style={{ animation: 'obstaclePulse 4s ease-in-out 2s infinite' }} />
      <text x="209" y="82" textAnchor="middle" fontSize="4"
        fill="#F5F0E8" opacity="0.2" fontFamily="monospace">OBS</text>

      {/* Block 4 — bottom-centre obstacle */}
      <rect x="90" y="134" width="58" height="20" rx="2"
        fill="#F5F0E8" fillOpacity="0.06" stroke="#F5F0E8" strokeOpacity="0.15" strokeWidth="0.8"
        style={{ animation: 'obstaclePulse 4s ease-in-out 3s infinite' }} />
      <text x="119" y="147" textAnchor="middle" fontSize="4"
        fill="#F5F0E8" opacity="0.2" fontFamily="monospace">OBS</text>

      {/* ======= FAINT PLANNED PATH LINE ======= */}
      {/* Shows the calculated navigation route — the algorithm's output */}
      <path d={userPath} fill="none"
        stroke="#C9913A" strokeWidth="0.7" strokeOpacity="0.15"
        strokeDasharray="4 4" />

      {/* ======= SUITCASE (lags behind user) ======= */}
      <g>
        {/* Ultrasonic sensor arcs — 3 cascading pulses */}
        {[0, 0.5, 1].map(offset => (
          <circle key={`arc${offset}`} r="6" fill="none"
            stroke="#C9913A" strokeWidth="0.9" opacity="0">
            <animateMotion dur="9s" begin={`${offset * 3}s`} repeatCount="indefinite">
              <mpath href="#suitcasePath" />
            </animateMotion>
            <animate attributeName="r" values="6;28" dur="1.4s" repeatCount="indefinite" begin={`${offset}s`} />
            <animate attributeName="opacity" values="0.55;0" dur="1.4s" repeatCount="indefinite" begin={`${offset}s`} />
          </circle>
        ))}

        {/* Suitcase body — top-down silhouette */}
        <rect x="-10" y="-12" width="20" height="24" rx="2"
          fill="none" stroke="#C9913A" strokeOpacity="0.7" strokeWidth="1.2">
          <animateMotion dur="9s" begin="1.5s" repeatCount="indefinite">
            <mpath href="#suitcasePath" />
          </animateMotion>
        </rect>
        {/* Handle nub */}
        <line x1="-4" y1="-12" x2="4" y2="-12"
          stroke="#C9913A" strokeOpacity="0.5" strokeWidth="1">
          <animateMotion dur="9s" begin="1.5s" repeatCount="indefinite">
            <mpath href="#suitcasePath" />
          </animateMotion>
        </line>
      </g>

      {/* ======= USER DOT (leads the suitcase) ======= */}
      <circle r="5" fill="#F5F0E8" opacity="0.8">
        <animateMotion dur="9s" repeatCount="indefinite">
          <mpath href="#userPath" />
        </animateMotion>
      </circle>
      {/* USER label travels with the dot */}
      <text dy="-9" textAnchor="middle" fontSize="4.5"
        fill="#F5F0E8" opacity="0.35" fontFamily="monospace">USER
        <animateMotion dur="9s" repeatCount="indefinite">
          <mpath href="#userPath" />
        </animateMotion>
      </text>

      {/* Named paths — referenced by animateMotion above */}
      <defs>
        <path id="userPath" d={userPath} />
        <path id="suitcasePath" d={suitPath} />
      </defs>

      {/* OVERHEAD label */}
      <text x="228" y="12" textAnchor="end" fontSize="4.5"
        fill="#F5F0E8" opacity="0.12" fontFamily="monospace">OVERHEAD</text>
    </svg>
  )
}

// --- Fleet Tracker: Live map pings ---
// A dot-matrix grid with location markers appearing and fading
// at different coordinates. One highlighted "active" ping tracks
// across the grid, representing real-time asset tracking.
function FleetViz() {
  // Pre-defined ping locations to animate
  const pings = [
    { cx: 50,  cy: 40,  delay: '0s',    dur: '3s' },
    { cx: 150, cy: 70,  delay: '0.8s',  dur: '3.5s' },
    { cx: 90,  cy: 110, delay: '1.6s',  dur: '3s' },
    { cx: 190, cy: 50,  delay: '0.4s',  dur: '4s' },
    { cx: 70,  cy: 130, delay: '2s',    dur: '3.5s' },
    { cx: 200, cy: 120, delay: '1.2s',  dur: '3s' },
  ]

  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes pingPulse {
          0%   { r: 3; opacity: 0.8; }
          70%  { r: 14; opacity: 0; }
          100% { r: 3; opacity: 0; }
        }
        @keyframes dotAppear {
          0%   { opacity: 0; }
          10%  { opacity: 0.7; }
          80%  { opacity: 0.7; }
          100% { opacity: 0; }
        }
        @keyframes activePing {
          0%   { cx: 50; cy: 40; }
          33%  { cx: 150; cy: 70; }
          66%  { cx: 90; cy: 110; }
          100% { cx: 50; cy: 40; }
        }
      `}</style>

      {/* Map grid */}
      {[0,1,2,3,4,5].map(i => (
        <line key={`h${i}`} x1="10" y1={20 + i * 26} x2="230" y2={20 + i * 26}
          stroke="#F5F0E8" strokeOpacity="0.05" strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`v${i}`} x1={10 + i * 30} y1="10" x2={10 + i * 30} y2="150"
          stroke="#F5F0E8" strokeOpacity="0.05" strokeWidth="0.5" />
      ))}

      {/* Intersection dots — subtle map nodes */}
      {[0,1,2,3,4,5].flatMap(r =>
        [0,1,2,3,4,5,6,7].map(c => (
          <circle key={`d${r}${c}`} cx={10 + c * 30} cy={20 + r * 26} r="1"
            fill="#F5F0E8" opacity="0.06" />
        ))
      )}

      {/* Animated location pings */}
      {pings.map((p, i) => (
        <g key={i}>
          {/* Expanding ring */}
          <circle cx={p.cx} cy={p.cy} r="3" fill="none" stroke="#C9913A" strokeWidth="1">
            <animate attributeName="r" values="3;16" dur={p.dur} begin={p.delay} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur={p.dur} begin={p.delay} repeatCount="indefinite" />
          </circle>
          {/* Center dot */}
          <circle cx={p.cx} cy={p.cy} r="2.5" fill="#C9913A">
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur={p.dur} begin={p.delay} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* "Active" tracked vehicle — gold, larger, with label */}
      <circle cx="150" cy="70" r="5" fill="#C9913A" opacity="0.9">
        <animate attributeName="cx" values="50;150;90;50" dur="9s" repeatCount="indefinite" />
        <animate attributeName="cy" values="40;70;110;40" dur="9s" repeatCount="indefinite" />
      </circle>

      {/* REST API label */}
      <text x="228" y="148" textAnchor="end" fontSize="5" fill="#C9913A" opacity="0.4" fontFamily="monospace">REST API</text>
      {/* Live dot */}
      <circle cx="220" cy="15" r="2.5" fill="#C9913A">
        <animate attributeName="opacity" values="1;0.1;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <text x="215" y="19" textAnchor="end" fontSize="5" fill="#C9913A" opacity="0.5" fontFamily="monospace">LIVE</text>
    </svg>
  )
}

// ============================================================
// PROJECT DATA
// ============================================================
// tech arrays now fully reflect the tools actually used.
// vizComponent holds the corresponding animated SVG component above.
const projectsData = [
  {
    title: 'EasySchedule',
    subtitle: 'Agentic Workforce Scheduling System',
    type: 'Freelance Architecture',
    description:
      'Designed a deterministic enterprise scheduling backend using Domain-Driven Design and Clean Architecture. Integrated Google OR-Tools constraint solver to optimise employee shifts against complex real-world constraints (role matching, availability, weekly hour caps). Leveraged Microsoft Semantic Kernel and Google Gemini Pro to enable interactive "chat-with-your-business" capabilities while strictly enforcing domain restrictions.',
    tech: [
      { name: 'C#',         url: icons.csharp },
      { name: '.NET 9',     url: icons.dotnet },
      { name: 'PostgreSQL', url: icons.postgres },
      { name: 'Python',     url: icons.python },     // OR-Tools is Python-based
      { name: 'Docker',     url: icons.docker },
      { name: 'Git',        url: icons.git },
    ],
    // Reference to the SVG component function — called below in JSX
    Viz: ScheduleViz,
  },
  {
    title: 'EcoNode Telemetry',
    subtitle: 'End-to-End IoT Data Logger',
    type: 'Full-Stack & Hardware (Concept)',
    description:
      'Architected a complete industrial data logging pipeline bridging custom hardware and web infrastructure. Designed an ESP32-based PCB in KiCad for sensor integration and reliable data sampling. Built a C# ASP.NET Core backend to ingest real-time MQTT telemetry, exposing a secure REST API for a React/Tailwind frontend dashboard that visualises equipment health.',
    tech: [
      { name: 'React',   url: icons.react },
      { name: 'Tailwind',url: icons.tailwind },
      { name: 'C#',      url: icons.csharp },
      { name: '.NET',    url: icons.dotnet },
      { name: 'C++',     url: icons.cplusplus },
      { name: 'KiCad',   url: icons.kicad },
      { name: 'Arduino', url: icons.arduino },     // ESP32 via Arduino framework
      { name: 'Git',     url: icons.git },
    ],
    Viz: EcoNodeViz,
  },
  {
    title: 'Accessible Alarm System',
    subtitle: 'Multimodal Alert Device for the Hearing-Impaired',
    type: 'Embedded Systems',
    description:
      'Designed and prototyped a custom electronic alarm system utilising multimodal sensory feedback (haptic, visual, and audible). Engineered around an ATmega328P microcontroller running a finite state machine, interfacing with an I2C OLED display and a DS3231 RTC for precision timekeeping. Designed the power stage with an N-Channel MOSFET to drive high-current PWM vibration motors. Full schematic and PCB layout designed in KiCad.',
    tech: [
      { name: 'C',       url: icons.c },
      { name: 'C++',     url: icons.cplusplus },
      { name: 'Arduino', url: icons.arduino },
      { name: 'KiCad',   url: icons.kicad },      // schematic + PCB design
      { name: 'Git',     url: icons.git },
    ],
    Viz: AlarmViz,
  },
  {
    title: 'Autonomous Suitcase',
    subtitle: 'Self-Following Luggage System',
    type: 'Hardware Prototyping',
    description:
      'Led an engineering team to design, program, and prototype a hands-free autonomous travel suitcase with active user-following capabilities. Sourced and integrated electronic hardware including Arduino microcontrollers, ultrasonic sensor arrays, and motor drivers. Developed embedded navigation code for obstacle avoidance and coordinated system-wide control loop validation. Designed electronic layouts and component schematics in KiCad.',
    tech: [
      { name: 'C++',     url: icons.cplusplus },
      { name: 'Arduino', url: icons.arduino },
      { name: 'KiCad',   url: icons.kicad },      // electronic layout design
      { name: 'Git',     url: icons.git },
    ],
    Viz: SuitcaseViz,
  },
  {
    title: 'Fleet Tracker',
    subtitle: 'Real-Time Telemetry Dashboard',
    type: 'Web Application',
    description:
      'Architected high-level system diagrams defining telemetry data flow from embedded vehicular units to web dashboards. Co-developed the web application utilising React.js, integrating REST APIs for real-time asset tracking and location visualisation.',
    tech: [
      { name: 'React',  url: icons.react },
      { name: 'Python', url: icons.python },
      { name: 'JS',     url: icons.javascript },
      { name: 'Git',    url: icons.git },
    ],
    Viz: FleetViz,
  },
]

const servicesData = [
  {
    title: 'Full-Stack Web MVP',
    desc: 'From zero to deployed. I build responsive React frontends powered by robust C# .NET or Node.js backends.',
  },
  {
    title: 'Embedded Firmware & IoT',
    desc: 'C/C++ firmware development for ESP32, ATmega, and Arduino ecosystems, bridging edge devices to cloud APIs.',
  },
  {
    title: 'Custom PCB Layout',
    desc: 'Schematic capture and PCB routing using KiCad and EAGLE for specialised hardware prototypes.',
  },
  {
    title: 'AI Integration',
    desc: 'Integrating LLMs (Gemini, Semantic Kernel) safely into business logic without compromising system constraints.',
  },
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
            A showcase of my engineering journey — spanning low-level embedded hardware, deterministic backend architecture, and modern web interfaces.
          </p>
        </div>
      </section>

      {/* ======================================================
          PROJECTS LIST (Alternating Layout)
         ====================================================== */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-24 md:gap-32">

          {projectsData.map((project, index) => {
            // Alternate the layout direction every project
            // index 0 → text left, visual right
            // index 1 → visual left, text right (flex-row-reverse)
            const isReversed = index % 2 !== 0

            // Pull the viz component out as a variable so we can call it as JSX
            const Viz = project.Viz

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className={`flex flex-col gap-10 md:gap-16 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
              >

                {/* ---- TEXT SIDE ---- */}
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

                  {/* ---- SHINE-ON-HOVER TECH ICONS ---- */}
                  {/* Icons sit in grayscale at low opacity by default.              */}
                  {/* On hover of the parent group, they snap to full color + scale. */}
                  {/* The tooltip label fades in below the icon.                     */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    {project.tech.map(t => (
                      <div key={t.name} className="group relative cursor-default">
                        <img
                          src={t.url}
                          alt={t.name}
                          className="w-7 h-7 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        />
                        {/* Tooltip — absolute positioned, appears below the icon */}
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                          {t.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ---- ANIMATED SVG VISUAL SIDE ---- */}
                {/* The frosted glass container frames the SVG animation.           */}
                {/* overflow-hidden clips anything the SVG draws outside its bounds. */}
                <div className="flex-1 w-full relative">
                  <div className="aspect-[4/3] rounded bg-white/[0.01] border border-white/[0.04] relative overflow-hidden group">
                    {/* Hover glow overlay — activates on hovering the card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                    {/* Corner bracket accents — decorative engineering frame */}
                    <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/20 z-10" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/20 z-10" />
                    {/* The animated SVG component for this project */}
                    <div className="absolute inset-0 p-4">
                      <Viz />
                    </div>
                  </div>
                </div>

              </motion.div>
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gold/[0.02] blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto relative z-10 text-center"
        >
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
        </motion.div>
      </section>

    </div>
  )
}

export default Projects
