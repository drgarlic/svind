const production = ! process.env.ROLLUP_WATCH;
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssimport = require('postcss-import');
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    postcssimport(),
    tailwindcss,
    autoprefixer,

    production && purgecss({
      content: [
        './**/index.html',
        './src/**/*.html',
        './src/**/*.jsx',
        './src/**/*.svelte',
        './src/**/*.vue'
      ],
      defaultExtractor: (content) => {
        const matches = content.match(/[\w-:/]+(?<!:)/g) || [];
        // Special Svelte case when binding a class
        return matches.map(match => match.startsWith('class:') ? match.substr(6) : match);
      }
    }),

    production && cssnano({
      preset: 'default',
    })
  ]
};
