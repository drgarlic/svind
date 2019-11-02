const production = ! process.env.ROLLUP_WATCH;
const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");
const postcssimport = require("postcss-import");
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    postcssimport(),
    tailwindcss,
    autoprefixer,

    production &&
      purgecss({
        content: [
          "./**/*.html",
          "./**/*.svelte"
        ],
        defaultExtractor: (content) => {
          const matches = content.match(/[A-Za-z0-9-_:/]+/g) || [];
          const res = matches.map(match => {
            if (match.startsWith("class:")) {
              return match.substr(6);
            }
            return match;
          });
          return res;
        }
      })
  ]
};
