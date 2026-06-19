/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Source Han Sans CN"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: "#050D1C",
          900: "#0A1628",
          800: "#122447",
          700: "#1E3A5F",
          600: "#2A4F7D",
          500: "#366396",
        },
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
        },
        sky: {
          400: "#38BDF8",
          500: "#0EA5E9",
        },
        accent: {
          gold: "#F59E0B",
          green: "#10B981",
        },
        surface: {
          bg: "#F0F4F8",
          card: "#FFFFFF",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, #1D4ED8 0%, #0284C7 100%)",
        "gradient-navy": "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)",
        "gradient-hero": "linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2A4F7D 100%)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(10, 22, 40, 0.06)",
        "card-hover": "0 12px 40px rgba(10, 22, 40, 0.12)",
        btn: "0 4px 12px rgba(37, 99, 235, 0.35)",
        "btn-hover": "0 8px 20px rgba(37, 99, 235, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "scroll-x": "scroll-x 40s linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
