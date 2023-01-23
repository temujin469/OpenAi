/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FFD369",
        secondary: "#03C988",
        mainDarkBg: "#222831",
        primaryDark: "#F48484",
        darkSecondary: "#E8D2A6",
        secondDarkBg: "#393E46",
        mainBg: "#7286D3",
        secondBg: "#8EA7E9",
        thirdDarkBg: "#2C3333",
        thirdBg: "#EEF1FF",
        mainDarkText: "#E3F6FF",
        mainText: "#222831",
      },
    },
  },
  plugins: [],
};
