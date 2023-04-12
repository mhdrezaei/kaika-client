const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kaika: {
          black: "#161616",
          gray: "#888888",
          yellow: "#de8504",
        },
      },
    },
  },
  plugins: [],
});
