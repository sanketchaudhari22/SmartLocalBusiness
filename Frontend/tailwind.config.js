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
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Main brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neutral: {
          50: '#fafafa',  // Backgrounds
          100: '#f5f5f5', // Cards
          200: '#e5e5e5', // Borders
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373', // Text secondary
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717', // Text primary
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'md': '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 16px 0 rgba(0, 0, 0, 0.12)',
        'xl': '0 12px 24px 0 rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'sm': '0.25rem',   // 4px
        'DEFAULT': '0.5rem',    // 8px
        'md': '0.625rem',  // 10px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
