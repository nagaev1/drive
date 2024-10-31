/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "th-bg-primary": "#eeee",
        "th-bg-secondary": "#ffff",
        "th-bg-light": "#e2e8f0",
        "th-bg-medium": "#94a3b8 ",
        "th-bg-dark": "#1e293b",
        "th-accent": "#eeee",
      }
    },
  },
  plugins: [],
}