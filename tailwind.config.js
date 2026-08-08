/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C9913A",
        "gold-light": "#E0B060",
        cream: "#F5F0E8",
        dark: "#0D0D0D",
        "dark-2": "#1A1A1A",
      },
      fontFamily: {
        // font-sans → Inter (body text)
        sans: ["Inter", "sans-serif"],
        // font-italiana → Italiana (nav links, headings, display text)
        // This is how we create a custom Tailwind class from a font name
        italiana: ["Italiana", "serif"],
      },
    },
  },
  plugins: [],
}

