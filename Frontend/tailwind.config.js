/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        secondary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        accent: "#ffc107", // yellow for stars / highlights
        background: "#f8f9fa",
        text: {
          dark: "#333333",
          light: "#666666",
        },
        surface: "#ffffff",
        border: "#e5e7eb",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.06)",
        card: "0 8px 24px rgba(0, 0, 0, 0.08)",
        hover: "0 10px 28px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #667eea, #764ba2)",
      },
    },
  },
  plugins: [],
};
