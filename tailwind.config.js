// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ["./src/**/*.tsx"],
  // https://github.com/tailwindlabs/tailwindcss-forms
  plugins: [require("@tailwindcss/forms")],
  theme: {
    fontFamily: {
      sans: ["Space Grotesk"],
    },
  }
};
