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
      // We use CSS variables here (defined in index.css) to support light/dark mode.
      // By mapping 'dark' and 'cream' to variables, we can flip the palette 
      // globally without needing to rewrite every single className in the JSX.
      colors: {
        gold:       "#C9913A",
        "gold-light": "#E0B060",
        cream:      "rgb(var(--color-cream) / <alpha-value>)",
        dark:       "rgb(var(--color-dark) / <alpha-value>)",
        "dark-2":   "rgb(var(--color-dark-2) / <alpha-value>)",
        white:      "rgb(var(--color-white) / <alpha-value>)",
      },
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
