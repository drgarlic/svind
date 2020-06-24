const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        tailwindcss,
        autoprefixer,
        process.env.NODE_ENV === 'production' && cssnano({
            preset: 'default',
        })
    ]
};
