// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Roboto", "ui-sans-serif", "system-ui"],
          thai: ["Mitr", "sans-serif"],
          heading: ["Mitr", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  