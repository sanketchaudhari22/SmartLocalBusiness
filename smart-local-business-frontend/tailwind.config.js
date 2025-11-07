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
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        secondary: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        accent: "#F97316",
        background: "#F9FAFB",
        border: "#E5E7EB",
        surface: "#FFFFFF", // ✅ added for Navbar bg
        text: "#111827",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 16px rgba(0,0,0,0.06)",
        soft: "0 4px 10px rgba(0,0,0,0.04)", // ✅ added for Navbar shadow
      },
    },
  },
  plugins: [],
};
