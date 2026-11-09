const config = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#13233A",
        teal: "#0E6E73",
        coral: "#FF6B57",
        mist: "#EEF3F4",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
