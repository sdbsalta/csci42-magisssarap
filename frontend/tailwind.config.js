/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          10: "#f6d1d1",
          20: "#f0b2b3",
          30: "#e98c8d",
          40: "#e16567",
          50: "#db2728",
          DEFAULT: "#d2181b",
          60: "#af1417",
          70: "#8c1012",
          80: "#690c0e", 
          90: "#460809",
          100: "#2a0505"
        },
        yellow: {
          10: "#fff3ce",
          20: "#ffeaad",
          30: "#ffe084",
          40: "#fed65a",
          50: "#fecb31",
          DEFAULT: "#fec108",
          60: "#d4a107",
          70: "#a98105",
          80: "#7f6104",
          90: "#554003",
          100: "#332702"
        },
        cream: {
          10: "#fffcf9",
          20: "#fffbf4",
          30: "#fff9ef",
          40: "#fff6ea",
          50: "#fff4e4",
          DEFAULT: "#fff2df",
          60: "#d5caba",
          70: "#aaa195",
          80: "#807970",
          90: "#55514a",
          100: "#33302d"
        },
        white: "#FEFEFE",
        black: {
          10: "#d3d4d8",
          20: "#b6b7be",
          30: "#92939e",
          40: "#6e6f7d",
          50: "#494b5d",
          DEFAULT: "#25273c",
          60: "#1f2132",
          70: "#191a28",
          80: "#13141e",
          90: "#0c0d14",
          100: "#07080c"
        },
      },
      fontFamily: {
        splineSansMono: ['"Spline Sans Mono"', 'serif']
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [require("daisyui")],
}

