/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--c-bg) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        fog: "rgb(var(--c-fog) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        rain: "#3AA0FF",
        wind: "#B98CF2",
        drainage: "#FF3B57",
        risk: {
          baixo: "#3DDC84",
          medio: "#F2C744",
          alto: "#F2884B",
          critico: "#E5484D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
