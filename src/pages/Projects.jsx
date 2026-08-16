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


// --- Accessible Alarm: KiCad-inspired PCB layout ---
// Inspired by the actual KiCad PCB for this project.
// Uses a dark navy substrate, gold traces (our brand colour), and
// AlarmViz — proper schematic layout.
// Signal flow: CoinCell → RTC → WiFi/Network  →  ATmega  ← OLED (I2C)
//                                                   ↑         ↑
//                                               Buttons    Buzzer + MOSFET
// All components sit in fixed schematic positions with connecting traces
// drawn sequentially. Signal pulses then travel those traces indefinitely.
function AlarmViz() {
  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes alarmTraceDraw { to { stroke-dashoffset: 0; } }
        @keyframes atmPulse {
          0%, 100% { r: 5; opacity: 0.7; }
          50%       { r: 11; opacity: 0.12; }
        }
        @keyframes netPulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.6; }
        }
      `}</style>

      {/* ── SCHEMATIC BACKGROUND ── dark slate, no PCB dots here for clarity */}
      <rect x="0" y="0" width="240" height="160" fill="#07080F" rx="2" />
      {/* Very faint grid — schematic paper feel */}
      {Array.from({length:9}, (_,r) =>
        <line key={`sg${r}`} x1="0" y1={r*20} x2="240" y2={r*20}
          stroke="#C9913A" strokeOpacity="0.04" strokeWidth="0.4"/>
      )}
      {Array.from({length:13}, (_,c) =>
        <line key={`sc${c}`} x1={c*20} y1="0" x2={c*20} y2="160"
          stroke="#C9913A" strokeOpacity="0.04" strokeWidth="0.4"/>
      )}

      {/* ══════════════════════ COMPONENTS ══════════════════════ */}

      {/* ── TOP CHAIN (left → right): CoinCell → RTC → WiFi Module ── */}

      {/* COIN CELL BATTERY — far left, schematic circle symbol */}
      {/* In schematics a battery is two parallel lines (long = +, short = -) */}
      <circle cx="18" cy="34" r="12" fill="none"
        stroke="#C9913A" strokeWidth="0.9" strokeOpacity="0.55" />
      {/* + plate */}
      <line x1="14" y1="30" x2="22" y2="30"
        stroke="#C9913A" strokeOpacity="0.7" strokeWidth="1.2" />
      {/* − plate (shorter) */}
      <line x1="16" y1="34" x2="20" y2="34"
        stroke="#C9913A" strokeOpacity="0.5" strokeWidth="0.7" />
      <text x="18" y="50" textAnchor="middle" fontSize="3.2"
        fill="#C9913A" opacity="0.45" fontFamily="monospace">CR2032</text>

      {/* DS3231 RTC — centre-left */}
      <rect x="50" y="22" width="36" height="24" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.85" strokeOpacity="0.6" rx="1" />
      {/* RTC left pins */}
      {[0,1,2].map(i => (
        <line key={`rl${i}`} x1="48" y1={27+i*6} x2="50" y2={27+i*6}
          stroke="#C9913A" strokeOpacity="0.5" strokeWidth="0.8"/>
      ))}
      {/* RTC right pins */}
      {[0,1,2].map(i => (
        <line key={`rr${i}`} x1="86" y1={27+i*6} x2="88" y2={27+i*6}
          stroke="#C9913A" strokeOpacity="0.5" strokeWidth="0.8"/>
      ))}
      <text x="68" y="33" textAnchor="middle" fontSize="4"
        fill="#C9913A" opacity="0.65" fontFamily="monospace">DS3231</text>
      <text x="68" y="40" textAnchor="middle" fontSize="3"
        fill="#C9913A" opacity="0.4" fontFamily="monospace">RTC</text>

      {/* WiFi / Network module — top right of chain */}
      {/* Schematic: two concentric arcs = antenna / wireless symbol */}
      <rect x="115" y="18" width="34" height="28" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.85" strokeOpacity="0.55" rx="1" />
      {/* Antenna arcs */}
      <path d="M 126,38 a 6,6 0 0,1 10,0" fill="none"
        stroke="#C9913A" strokeWidth="0.9" strokeOpacity="0.5"
        style={{animation:'netPulse 2s ease-in-out infinite'}} />
      <path d="M 122,42 a 10,10 0 0,1 18,0" fill="none"
        stroke="#C9913A" strokeWidth="0.7" strokeOpacity="0.35"
        style={{animation:'netPulse 2s ease-in-out 0.4s infinite'}} />
      <path d="M 118,46 a 14,14 0 0,1 26,0" fill="none"
        stroke="#C9913A" strokeWidth="0.5" strokeOpacity="0.2"
        style={{animation:'netPulse 2s ease-in-out 0.8s infinite'}} />
      {/* Left pin */}
      <line x1="113" y1="32" x2="115" y2="32"
        stroke="#C9913A" strokeOpacity="0.5" strokeWidth="0.8"/>
      <text x="132" y="25" textAnchor="middle" fontSize="3.2"
        fill="#C9913A" opacity="0.45" fontFamily="monospace">WiFi</text>

      {/* ══ ATmega328P — CENTRE, dominant IC ══ */}
      {/* Wide DIP package, centred horizontally, middle-lower */}
      <rect x="82" y="72" width="76" height="56" fill="#0C1220"
        stroke="#C9913A" strokeWidth="1.2" strokeOpacity="0.8" rx="1.5" />
      {/* Orientation notch */}
      <path d="M 82,90 a 6,6 0 0,0 0,-10" fill="none"
        stroke="#C9913A" strokeWidth="0.7" strokeOpacity="0.5" />
      {/* Left pins — 6 */}
      {[0,1,2,3,4,5].map(i => (
        <g key={`al${i}`}>
          <rect x="73" y={77+i*8} width="5" height="4" fill="none"
            stroke="#C9913A" strokeOpacity="0.3" strokeWidth="0.5"/>
          <line x1="78" y1={79+i*8} x2="82" y2={79+i*8}
            stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.9"/>
        </g>
      ))}
      {/* Right pins — 6 */}
      {[0,1,2,3,4,5].map(i => (
        <g key={`ar${i}`}>
          <rect x="158" y={77+i*8} width="5" height="4" fill="none"
            stroke="#C9913A" strokeOpacity="0.3" strokeWidth="0.5"/>
          <line x1="158" y1={79+i*8} x2="162" y2={79+i*8}
            stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.9"/>
        </g>
      ))}
      <text x="120" y="98" textAnchor="middle" fontSize="7"
        fill="#C9913A" opacity="0.8" fontFamily="monospace">ATmega</text>
      <text x="120" y="108" textAnchor="middle" fontSize="5.5"
        fill="#C9913A" opacity="0.5" fontFamily="monospace">328P</text>


      {/* MOSFET — right side, mid-height */}
      <rect x="196" y="72" width="22" height="30" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.75" strokeOpacity="0.5" rx="1" />
      {/* 3 pins right */}
      {[0,1,2].map(i => (
        <line key={`mfp${i}`} x1="218" y1={78+i*8} x2="222" y2={78+i*8}
          stroke="#C9913A" strokeOpacity="0.4" strokeWidth="0.8"/>
      ))}
      <text x="207" y="91" textAnchor="middle" fontSize="3.5"
        fill="#C9913A" opacity="0.45" fontFamily="monospace">NMOS</text>

      {/* BUZZER — bottom right, circular */}
      <circle cx="212" cy="137" r="14" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.8" strokeOpacity="0.45" />
      <circle cx="212" cy="137" r="7" fill="none"
        stroke="#C9913A" strokeWidth="0.5" strokeOpacity="0.28" />
      <text x="212" y="140" textAnchor="middle" fontSize="4"
        fill="#C9913A" opacity="0.5" fontFamily="monospace">BZ1</text>

      {/* XTAL — bottom centre */}
      <ellipse cx="120" cy="148" rx="11" ry="6" fill="#0C1220"
        stroke="#C9913A" strokeWidth="0.8" strokeOpacity="0.45" />
      <line x1="109" y1="148" x2="105" y2="148"
        stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.8"/>
      <line x1="131" y1="148" x2="135" y2="148"
        stroke="#C9913A" strokeOpacity="0.35" strokeWidth="0.8"/>
      <text x="120" y="151" textAnchor="middle" fontSize="3.2"
        fill="#C9913A" opacity="0.4" fontFamily="monospace">XTAL</text>

      {/* BUTTONS — bottom left row */}
      {['RST','UP','DN'].map((label, i) => (
        <g key={`btn${i}`}>
          <rect x={8+i*22} y={138} width="16" height="14" fill="#0C1220"
            stroke="#C9913A" strokeWidth="0.55" strokeOpacity="0.35" rx="1"/>
          <circle cx={16+i*22} cy={145} r="4" fill="none"
            stroke="#C9913A" strokeOpacity="0.3" strokeWidth="0.5"/>
          <text x={16+i*22} y={136} textAnchor="middle" fontSize="2.8"
            fill="#C9913A" opacity="0.35" fontFamily="monospace">{label}</text>
        </g>
      ))}

      {/* ══════════════════════ TRACES ══════════════════════ */}
      {/* Every trace is given a unique id for animateMotion signal pulses. */}
      {/* strokeDasharray/Offset + CSS animation = "draw-on" effect at load. */}

      {/* T_BATT: CoinCell → RTC (Vbat power rail) */}
      <path id="tBatt" d="M 30,34 H 50"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"
        strokeDasharray="100" strokeDashoffset="100"
        style={{animation:'alarmTraceDraw 0.4s ease-out 0.1s forwards'}} />

      {/* T_RTC_NET: RTC → WiFi module (I2C / data bus) */}
      <path id="tRtcNet" d="M 86,32 H 115"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"
        strokeDasharray="100" strokeDashoffset="100"
        style={{animation:'alarmTraceDraw 0.4s ease-out 0.35s forwards'}} />

      {/* T_NET_MCU: WiFi → ATmega (SPI / UART) — drops from top-right of WiFi to ATmega right-side pin */}
      <path id="tNetMcu" d="M 149,32 H 170 V 79 H 162"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.45" strokeLinecap="round"
        strokeDasharray="200" strokeDashoffset="200"
        style={{animation:'alarmTraceDraw 0.6s ease-out 0.6s forwards'}} />

      {/* T_RTC_MCU: RTC also connects directly to ATmega (I2C SDA/SCL) */}
      <path id="tRtcMcu" d="M 68,46 V 60 H 82 V 79"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round"
        strokeDasharray="200" strokeDashoffset="200"
        style={{animation:'alarmTraceDraw 0.6s ease-out 0.5s forwards'}} />


      {/* T_MOSFET: ATmega right → MOSFET (PWM) */}
      <path id="tMosfet" d="M 162,83 H 196"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.45" strokeLinecap="round"
        strokeDasharray="100" strokeDashoffset="100"
        style={{animation:'alarmTraceDraw 0.4s ease-out 0.9s forwards'}} />

      {/* T_BUZZ: ATmega right → Buzzer (PWM audio) */}
      <path id="tBuzz" d="M 162,91 H 178 V 137 H 198"
        fill="none" stroke="#C9913A" strokeWidth="1" strokeOpacity="0.45" strokeLinecap="round"
        strokeDasharray="200" strokeDashoffset="200"
        style={{animation:'alarmTraceDraw 0.6s ease-out 1.05s forwards'}} />

      {/* T_XTAL_L: ATmega → Crystal left pin */}
      <path id="tXtalL" d="M 100,128 V 148 H 109"
        fill="none" stroke="#C9913A" strokeWidth="0.9" strokeOpacity="0.38" strokeLinecap="round"
        strokeDasharray="100" strokeDashoffset="100"
        style={{animation:'alarmTraceDraw 0.4s ease-out 1.2s forwards'}} />

      {/* T_XTAL_R: ATmega → Crystal right pin */}
      <path id="tXtalR" d="M 140,128 V 148 H 131"
        fill="none" stroke="#C9913A" strokeWidth="0.9" strokeOpacity="0.38" strokeLinecap="round"
        strokeDasharray="100" strokeDashoffset="100"
        style={{animation:'alarmTraceDraw 0.4s ease-out 1.3s forwards'}} />

      {/* J_OLED: 4-pin vertical jumper header — left side, raised for clearance */}
      {/* Outer pins (VCC, SDA) sit wider apart; inner pins (GND, SCL) are tighter. */}
      {/* This produces the 45° fan-in trace routing below. */}

      {/* VCC — outer top: box y=74, nub exits at y=78 */}
      <rect x="10" y="74" width="9" height="9" fill="#0C1220"
        stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.75" />
      <line x1="19" y1="78" x2="23" y2="78"
        stroke="#C9913A" strokeOpacity="0.45" strokeWidth="0.7" />
      <text x="8" y="80" textAnchor="end" fontSize="2.8"
        fill="#C9913A" opacity="0.35" fontFamily="monospace">VCC</text>

      {/* GND — inner: box y=88, nub exits at y=92 */}
      <rect x="10" y="88" width="9" height="9" fill="#0C1220"
        stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.75" />
      <line x1="19" y1="92" x2="23" y2="92"
        stroke="#C9913A" strokeOpacity="0.45" strokeWidth="0.7" />
      <text x="8" y="94" textAnchor="end" fontSize="2.8"
        fill="#C9913A" opacity="0.35" fontFamily="monospace">GND</text>

      {/* SCL — inner: box y=96, nub exits at y=100 */}
      <rect x="10" y="96" width="9" height="9" fill="#0C1220"
        stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.75" />
      <line x1="19" y1="100" x2="23" y2="100"
        stroke="#C9913A" strokeOpacity="0.45" strokeWidth="0.7" />
      <text x="8" y="102" textAnchor="end" fontSize="2.8"
        fill="#C9913A" opacity="0.35" fontFamily="monospace">SCL</text>

      {/* SDA — outer bottom: box y=110, nub exits at y=114 */}
      <rect x="10" y="110" width="9" height="9" fill="#0C1220"
        stroke="#C9913A" strokeOpacity="0.55" strokeWidth="0.75" />
      <line x1="19" y1="114" x2="23" y2="114"
        stroke="#C9913A" strokeOpacity="0.45" strokeWidth="0.7" />
      <text x="8" y="116" textAnchor="end" fontSize="2.8"
        fill="#C9913A" opacity="0.35" fontFamily="monospace">SDA</text>

      {/* Connector label above the header */}
      <text x="14" y="71" textAnchor="middle" fontSize="2.8"
        fill="#C9913A" opacity="0.3" fontFamily="monospace">J_OLED</text>

      {/* ── 4 TRACES: jumper → ATmega left pins ──
          Arrivals at x=78 are equidistant 8px apart: y=84, 92, 100, 108.
          Middle two (GND, SCL) run straight — no deflection needed.
          Outer two (VCC, SDA) angle 45° toward the middle for 6px of x-travel,
          landing on the equidistant grid before running straight to the MCU.
          No trace crosses another. */}

      {/* tVCC: outer-top — angles DOWN 6px at 45°, then straight */}
      {/* Start (23,78) → corner (29,84) → MCU (78,84) */}
      <path id="tVCC" d="M 23,78 L 29,84 H 78"
        fill="none" stroke="#C9913A" strokeWidth="0.85" strokeOpacity="0.4" strokeLinecap="round"
        strokeDasharray="130" strokeDashoffset="130"
        style={{animation:'alarmTraceDraw 0.45s ease-out 1.4s forwards'}} />

      {/* tGND: inner — straight across */}
      {/* Start (23,92) → MCU (78,92) */}
      <path id="tGND" d="M 23,92 H 78"
        fill="none" stroke="#C9913A" strokeWidth="0.85" strokeOpacity="0.4" strokeLinecap="round"
        strokeDasharray="80" strokeDashoffset="80"
        style={{animation:'alarmTraceDraw 0.35s ease-out 1.5s forwards'}} />

      {/* tSCL: inner — straight across */}
      {/* Start (23,100) → MCU (78,100) */}
      <path id="tSCL" d="M 23,100 H 78"
        fill="none" stroke="#C9913A" strokeWidth="0.85" strokeOpacity="0.4" strokeLinecap="round"
        strokeDasharray="80" strokeDashoffset="80"
        style={{animation:'alarmTraceDraw 0.35s ease-out 1.55s forwards'}} />

      {/* tSDA: outer-bottom — angles UP 6px at 45°, then straight */}
      {/* Start (23,114) → corner (29,108) → MCU (78,108) */}
      <path id="tSDA" d="M 23,114 L 29,108 H 78"
        fill="none" stroke="#C9913A" strokeWidth="0.85" strokeOpacity="0.4" strokeLinecap="round"
        strokeDasharray="130" strokeDashoffset="130"
        style={{animation:'alarmTraceDraw 0.45s ease-out 1.6s forwards'}} />

      {/* T_BTNS: Buttons → ATmega bottom-left (GPIO) */}
      <path id="tBtns" d="M 38,138 V 132 H 78 V 128"
        fill="none" stroke="#C9913A" strokeWidth="0.9" strokeOpacity="0.35" strokeLinecap="round"
        strokeDasharray="150" strokeDashoffset="150"
        style={{animation:'alarmTraceDraw 0.5s ease-out 1.4s forwards'}} />

      {/* ══════════════════════ SIGNAL PULSES ══════════════════════ */}
      {/* CoinCell → RTC (power) */}
      <circle r="2" fill="#C9913A" opacity="0">
        <animateMotion dur="1s" begin="1.8s" repeatCount="indefinite"><mpath href="#tBatt"/></animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="1s" begin="1.8s" repeatCount="indefinite"/>
      </circle>

      {/* RTC → WiFi */}
      <circle r="2" fill="#C9913A" opacity="0">
        <animateMotion dur="1.4s" begin="2.2s" repeatCount="indefinite"><mpath href="#tRtcNet"/></animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="1.4s" begin="2.2s" repeatCount="indefinite"/>
      </circle>

      {/* WiFi → ATmega (data) */}
      <circle r="2" fill="#C9913A" opacity="0">
        <animateMotion dur="1.8s" begin="2.8s" repeatCount="indefinite"><mpath href="#tNetMcu"/></animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="1.8s" begin="2.8s" repeatCount="indefinite"/>
      </circle>

      {/* RTC → ATmega (I2C) */}
      <circle r="1.8" fill="#C9913A" opacity="0">
        <animateMotion dur="1.6s" begin="2.5s" repeatCount="indefinite"><mpath href="#tRtcMcu"/></animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="1.6s" begin="2.5s" repeatCount="indefinite"/>
      </circle>


      {/* ATmega → MOSFET (PWM) */}
      <circle r="1.8" fill="#C9913A" opacity="0">
        <animateMotion dur="0.9s" begin="3.4s" repeatCount="indefinite"><mpath href="#tMosfet"/></animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="0.9s" begin="3.4s" repeatCount="indefinite"/>
      </circle>
      <circle r="1.8" fill="#C9913A" opacity="0">
        <animateMotion dur="0.9s" begin="4.1s" repeatCount="indefinite"><mpath href="#tMosfet"/></animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="0.9s" begin="4.1s" repeatCount="indefinite"/>
      </circle>

      {/* ATmega → Buzzer */}
      <circle r="1.8" fill="#C9913A" opacity="0">
        <animateMotion dur="1.5s" begin="3.8s" repeatCount="indefinite"><mpath href="#tBuzz"/></animateMotion>
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="1.5s" begin="3.8s" repeatCount="indefinite"/>
      </circle>

      {/* Buttons → ATmega (event-driven, cream colour) */}
      <circle r="1.8" fill="#F5F0E8" opacity="0">
        <animateMotion dur="2s" begin="4.5s" repeatCount="indefinite"><mpath href="#tBtns"/></animateMotion>
        <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.85;1" dur="2s" begin="4.5s" repeatCount="indefinite"/>
      </circle>

      {/* OLED jumper → ATmega: 4 individual pulses, one per trace */}
      <circle r="1.6" fill="#C9913A" opacity="0">
        <animateMotion dur="1.3s" begin="3.1s" repeatCount="indefinite"><mpath href="#tVCC"/></animateMotion>
        <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.1;0.85;1" dur="1.3s" begin="3.1s" repeatCount="indefinite"/>
      </circle>
      <circle r="1.6" fill="#C9913A" opacity="0">
        <animateMotion dur="1.1s" begin="3.3s" repeatCount="indefinite"><mpath href="#tGND"/></animateMotion>
        <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.1;0.85;1" dur="1.1s" begin="3.3s" repeatCount="indefinite"/>
      </circle>
      <circle r="1.6" fill="#C9913A" opacity="0">
        <animateMotion dur="1.1s" begin="3.5s" repeatCount="indefinite"><mpath href="#tSCL"/></animateMotion>
        <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.1;0.85;1" dur="1.1s" begin="3.5s" repeatCount="indefinite"/>
      </circle>
      <circle r="1.6" fill="#C9913A" opacity="0">
        <animateMotion dur="1.3s" begin="3.7s" repeatCount="indefinite"><mpath href="#tSDA"/></animateMotion>
        <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.1;0.85;1" dur="1.3s" begin="3.7s" repeatCount="indefinite"/>
      </circle>

      {/* ATmega heartbeat glow */}
      <circle cx="120" cy="100" r="5" fill="#C9913A">
        <animate attributeName="r" values="5;11;5" dur="2.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.12;0.7" dur="2.8s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}

// --- Autonomous Suitcase: Top-down hallway navigation ---
// Scene: A corridor viewed from above. Two obstacles jut from opposing walls
// (like a luggage trolley from one side, a kiosk from the other).
// The user walks a realistic left-to-right path, squeezing between obstacles.
// The suitcase follows ~1.2s behind with ultrasonic sensing arcs pulsing forward.
function SuitcaseViz() {
  // HALLWAY GEOMETRY:
  // Corridor runs horizontally. Top wall y=30, bottom wall y=130.
  // Navigable corridor centre is y=80 (midpoint).
  //
  // OBSTACLES:
  //   Obs A: juts DOWN from top wall (x=75–105, y=30–68) — trolley/cart
  //   Obs B: juts UP from bottom wall (x=135–165, y=92–130) — kiosk/bin
  //
  // PATH LOGIC (left to right, one pass):
  //   1. Enter from left at corridor centre (x=8, y=80)
  //   2. Approach Obs A — dip below it (y rises to ~88)
  //   3. Squeeze through the gap between Obs A bottom (y=68) and corridor centre
  //      — travel at y=78, threading between the two obstacles
  //   4. Approach Obs B — rise above it (y drops to ~72)
  //   5. Exit corridor right side (x=232, y=80)
  const userPath = 'M 8,80 L 55,80 L 72,90 L 90,88 L 110,82 L 128,76 L 148,70 L 168,78 L 188,80 L 232,80'
  const suitPath = 'M 8,80 L 55,80 L 72,90 L 90,88 L 110,82 L 128,76 L 148,70 L 168,78 L 188,80 L 232,80'

  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes obsPulse {
          0%, 100% { fill-opacity: 0.07; }
          50%       { fill-opacity: 0.15; }
        }
      `}</style>

      {/* ── HALLWAY BACKGROUND ── */}
      <rect x="0" y="0" width="240" height="160" fill="#07080F" rx="2" />

      {/* Floor tiles inside corridor — subtle hatching */}
      {[0,1,2,3,4].map(i => (
        <line key={`ft${i}`} x1={i*50} y1="30" x2={i*50+50} y2="130"
          stroke="#F5F0E8" strokeOpacity="0.025" strokeWidth="0.5"/>
      ))}

      {/* ── CORRIDOR WALLS (solid lines top and bottom) ── */}
      {/* Top wall */}
      <rect x="0" y="0" width="240" height="30"
        fill="#F5F0E8" fillOpacity="0.04" />
      <line x1="0" y1="30" x2="240" y2="30"
        stroke="#F5F0E8" strokeOpacity="0.35" strokeWidth="1.5"/>
      <text x="8" y="20" fontSize="4"
        fill="#F5F0E8" opacity="0.18" fontFamily="monospace">WALL</text>

      {/* Bottom wall */}
      <rect x="0" y="130" width="240" height="30"
        fill="#F5F0E8" fillOpacity="0.04" />
      <line x1="0" y1="130" x2="240" y2="130"
        stroke="#F5F0E8" strokeOpacity="0.35" strokeWidth="1.5"/>
      <text x="8" y="145" fontSize="4"
        fill="#F5F0E8" opacity="0.18" fontFamily="monospace">WALL</text>

      {/* ── OBSTACLE A: juts DOWN from top wall (trolley / cart) ── */}
      {/* x=72–108, y=30–70 — leaves gap on south side before bottom wall */}
      <rect x="72" y="30" width="36" height="40"
        fill="#F5F0E8" fillOpacity="0.06" stroke="#F5F0E8" strokeOpacity="0.25" strokeWidth="1"
        style={{animation:'obsPulse 3s ease-in-out infinite'}} />
      {/* Trolley detail — two small wheel circles */}
      <circle cx="80" cy="66" r="3.5" fill="none" stroke="#F5F0E8" strokeOpacity="0.2" strokeWidth="0.7"/>
      <circle cx="100" cy="66" r="3.5" fill="none" stroke="#F5F0E8" strokeOpacity="0.2" strokeWidth="0.7"/>
      <line x1="80" y1="38" x2="100" y2="38"
        stroke="#F5F0E8" strokeOpacity="0.15" strokeWidth="0.6"/>
      <text x="90" y="52" textAnchor="middle" fontSize="4"
        fill="#F5F0E8" opacity="0.25" fontFamily="monospace">CART</text>

      {/* ── OBSTACLE B: juts UP from bottom wall (kiosk / bin) ── */}
      {/* x=132–168, y=90–130 — leaves gap on north side */}
      <rect x="132" y="90" width="36" height="40"
        fill="#F5F0E8" fillOpacity="0.06" stroke="#F5F0E8" strokeOpacity="0.25" strokeWidth="1"
        style={{animation:'obsPulse 3s ease-in-out 1.5s infinite'}} />
      {/* Kiosk detail — small screen rect */}
      <rect x="139" y="96" width="22" height="14" fill="none"
        stroke="#F5F0E8" strokeOpacity="0.15" strokeWidth="0.6"/>
      <text x="150" y="120" textAnchor="middle" fontSize="4"
        fill="#F5F0E8" opacity="0.25" fontFamily="monospace">KIOSK</text>

      {/* ── PLANNED PATH — faint dashed line the algorithm calculated ── */}
      <path d={userPath} fill="none"
        stroke="#C9913A" strokeWidth="0.8" strokeOpacity="0.18"
        strokeDasharray="5 4"/>

      {/* ── SUITCASE (lags 1.2s behind user) ── */}
      <g>
        {/* Ultrasonic arcs — pulse FORWARD (to the right) from suitcase */}
        {[0, 0.55, 1.1].map(offset => (
          <circle key={`arc${offset}`} r="5" fill="none"
            stroke="#C9913A" strokeWidth="0.85" opacity="0">
            <animateMotion dur="8s" begin={`${1.2 + offset*0.5}s`} repeatCount="indefinite">
              <mpath href="#suitPath"/>
            </animateMotion>
            <animate attributeName="r" values="5;22" dur="1.2s" begin={`${offset}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0" dur="1.2s" begin={`${offset}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Suitcase body — upright rectangle (top-down view) */}
        <rect x="-9" y="-11" width="18" height="22" rx="2"
          fill="#0C1220" stroke="#C9913A" strokeOpacity="0.75" strokeWidth="1.3">
          <animateMotion dur="8s" begin="1.2s" repeatCount="indefinite">
            <mpath href="#suitPath"/>
          </animateMotion>
        </rect>
        {/* Handle top */}
        <line x1="-5" y1="-11" x2="5" y2="-11"
          stroke="#C9913A" strokeOpacity="0.55" strokeWidth="1.2">
          <animateMotion dur="8s" begin="1.2s" repeatCount="indefinite">
            <mpath href="#suitPath"/>
          </animateMotion>
        </line>
        {/* Centre divider line */}
        <line x1="0" y1="-11" x2="0" y2="11"
          stroke="#C9913A" strokeOpacity="0.2" strokeWidth="0.5">
          <animateMotion dur="8s" begin="1.2s" repeatCount="indefinite">
            <mpath href="#suitPath"/>
          </animateMotion>
        </line>
      </g>

      {/* ── USER DOT ── */}
      <circle r="5" fill="#F5F0E8" opacity="0.85">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#userPath"/>
        </animateMotion>
      </circle>
      {/* USER label above the dot */}
      <text dy="-9" textAnchor="middle" fontSize="4.5"
        fill="#F5F0E8" opacity="0.4" fontFamily="monospace">USER
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#userPath"/>
        </animateMotion>
      </text>

      {/* Named paths (in <defs> so they don't render visually) */}
      <defs>
        <path id="userPath" d={userPath}/>
        <path id="suitPath" d={suitPath}/>
      </defs>

      {/* Entry/exit arrows */}
      <text x="4" y="84" fontSize="6" fill="#C9913A" opacity="0.25" fontFamily="monospace">›</text>
      <text x="228" y="84" fontSize="6" fill="#C9913A" opacity="0.25" fontFamily="monospace">›</text>

      {/* OVERHEAD label */}
      <text x="232" y="148" textAnchor="end" fontSize="4"
        fill="#F5F0E8" opacity="0.1" fontFamily="monospace">OVERHEAD VIEW</text>
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
    title: 'Web & CMS Development',
    desc: 'Custom websites, portfolios, and e-commerce stores built to perform. From WordPress and WooCommerce to fully bespoke React builds — designed to convert, structured to scale.',
  },
  {
    title: 'Full-Stack Web MVP',
    desc: 'From zero to deployed. I build responsive React frontends powered by robust C# .NET or Node.js backends.',
  },
  {
    title: 'Electronic Design',
    desc: 'Purpose-built schematic design and PCB layout using KiCad and EAGLE — from concept to manufacturable board for specialised hardware applications.',
  },
  {
    title: 'AI Integration',
    desc: 'Integrating large language models safely and precisely into business logic, enabling intelligent automation without compromising system constraints or reliability.',
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
