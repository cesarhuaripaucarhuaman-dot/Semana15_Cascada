/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        // Paleta propia: tres colores, dos intensidades cada uno
        marca: {
          500: "#0e7c70",
          700: "#094f47",
        },
        acento: {
          500: "#d97706",
          700: "#b45309",
        },
        tinta: {
          100: "#e8edf3",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
