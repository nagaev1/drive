/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "th-primary": "#eeee",
        "th-bg": "#eeee",
        "th-bg-secondary": "#ffff",
        "th-accent": "#eeee",
      }
    },
  },
  plugins: [],
}