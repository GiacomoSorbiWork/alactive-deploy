/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        primaryContainer: "#080707",
        secondary: "#9E80F3",
        secondaryContainer: "#717070",
        activeButton: "#825CF0",
        filterContainer: "#232323",
        disabledButton: "#717070",
        nonAllowedButton: "#FFFFFF1a",
      },
      fontWeight: {
        semibold: "600",
      },
      fontSize: {
        "title-large": "40px",
        "title-medium": "32px",
        "title-small": "22px",
        "label-large": "20px",
        "label-medium": "16px",
        "label-small": "14px",
        "body-large": "20px",
        "body-medium": "16px",
        "body-small": "14px",
      },
      borderRadius: {
        rounded: "30px",
        big: "8px",
        normal: "6px",
      },
      padding: {
        big: "14px 24px",
        small: "10px 16px",
        normal: "10px",
        clear: "8px 0px",
        selected: "11px 0px",
        rounded: "5px 10px",
      },
      gap: {
        big: "16px",
        normal: "10px",
        small: "8px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  plugins: [],
};
