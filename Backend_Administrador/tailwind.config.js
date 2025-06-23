/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#274a72",
        secondary: "#082c55",
      },
      backgroundColor: {
        primary: "#274a72",
        secondary: "#082c55",
      },
    },
  },
  plugins: [],
};
