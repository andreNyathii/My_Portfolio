/**
 * tailwind.config.js
 *
 * This file is Tailwind's central configuration.
 * Tailwind reads it at build time to generate the final CSS bundle.
 * Every custom colour, font, or spacing value defined here becomes
 * a usable class anywhere in the project's JSX files.
 *
 * @type {import('tailwindcss').Config}
 * The JSDoc annotation above gives editors (VS Code) type hints
 * so autocomplete works when editing this file.
 */
export default {

  // content: tells Tailwind which files to scan for class usage.
  // Tailwind is a "tree-shaker" — it only generates CSS for classes
  // it actually finds in these files. This keeps the final CSS bundle small.
  // "**" = any folder depth. "*.{js,ts,jsx,tsx}" = those file extensions.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    // extend: adds to Tailwind's defaults rather than replacing them.
    // Without extend, defining colours here would remove ALL of Tailwind's
    // built-in colours (red, blue, green, etc). Extend keeps them available.
    extend: {

      // Custom colour tokens.
      // Once defined here, these become usable Tailwind classes:
      //   bg-gold, text-cream, border-dark, bg-dark-2, etc.
      // Opacity variants work automatically:
      //   text-cream/50, bg-gold/10, border-gold/[0.07]
      colors: {
        gold:       "#C9913A",   // Primary accent — active states, highlights, CTA
        "gold-light": "#E0B060", // Lighter gold — hover states
        cream:      "#F5F0E8",   // Primary text colour
        dark:       "#0D0D0D",   // Page background
        "dark-2":   "#1A1A1A",   // Secondary background — cards, sidebars
      },

      // Custom font family tokens.
      // These map a short class name to a full font stack.
      // font-italiana  → font-family: 'Italiana', serif
      // font-sans      → font-family: 'Inter', sans-serif  (overrides Tailwind's default sans)
      //
      // The font itself still needs to be loaded via @import in index.css.
      // This config only tells Tailwind what class name to generate — it does not
      // load or embed the font file itself.
      fontFamily: {
        sans:      ["Inter", "sans-serif"],
        italiana:  ["Italiana", "serif"],
      },
    },
  },

  // plugins: array of Tailwind plugins for additional utilities.
  // Currently empty — no third-party Tailwind plugins are in use.
  plugins: [],
}
