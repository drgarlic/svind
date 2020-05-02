const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const favicons = require('favicons');
const faviconsConfig = require('./gulp/favicons.json');
const fs = require('fs');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const packageJson = require('./package.json');
const postcss = require('gulp-postcss');
const replace = require('gulp-string-replace');
const tailwindcss = require('tailwindcss');
const webp = require('gulp-webp');

const updateServiceWorker = () => {
    const filesToPreCache = [
        '/',
        '/index.html',
        '/tailwind.css',
        ...fs.readdirSync('public/build')
            .filter(e => ! e.endsWith('.map'))
            .map(e => '/build/' + e),
    ];

    return gulp.src('public/service-worker.js')
        .pipe(replace(/'cache-.*'/, `'cache-${packageJson.name}-${(+new Date).toString(36)}'`))
        .pipe(replace(/filesToPreCache = \[(.*\n)*\]/, `filesToPreCache = [\n    '${filesToPreCache.join('\',\n    \'')}'\n]`))
        .pipe(gulp.dest('public'));
};
exports.updateServiceWorker = updateServiceWorker;

const generateFavicons = () => {
    faviconsConfig.appName = packageJson.name;
    faviconsConfig.appShortName = packageJson.name;
    faviconsConfig.appDescription = packageJson.description;
    faviconsConfig.developerName = packageJson.author.name;
    faviconsConfig.developerURL = packageJson.author.url;
    faviconsConfig.version = packageJson.version;
    faviconsConfig.url = packageJson.homepage;

    return gulp.src('gulp/favicon.*')
        .pipe(favicons.stream(faviconsConfig))
        .pipe(gulp.dest(`public${faviconsConfig.path}`));
};
exports.generateFavicons = generateFavicons;

const tailwind = () => {
    return gulp.src('gulp/tailwind.css')
        .pipe(postcss([
            tailwindcss(),
            autoprefixer()
        ]))
        .pipe(gulp.dest('public'));
};
exports.tailwind = tailwind;

const optimizeCss = () => {
    return gulp.src('public/tailwind.css')
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest('public'));
};
exports.optimizeCss = optimizeCss;

const generateWebps = () => {
    return gulp.src('public/assets/**/*')
        .pipe(webp({
            quality: 90,
        }))
        .pipe(gulp.dest('public/assets'));
};
exports.generateWebps = generateWebps;

const injectFavicons = () => {
    return gulp.src('public/index.html')
        .pipe(inject(gulp.src([`public${faviconsConfig.path}${faviconsConfig.html}`]), {
            starttag: '<!-- inject:favicons -->',
            transform: (filepath, file) => {
                return file.contents.toString();
            }
        }))
        .pipe(gulp.dest('public'));
};
exports.injectFavicons = injectFavicons;

const optimizeImages = () => {
    return gulp.src('public/**/*.+(jpeg|jpg|png|gif)')
        .pipe(imagemin())
        .pipe(gulp.dest('public'));
};
exports.optimizeImages = optimizeImages;

const dev = gulp.series(
    tailwind,
    generateWebps,
);
exports.dev = dev;

const prod = gulp.series(
    dev,
    optimizeCss,
    updateServiceWorker,
    generateFavicons,
    injectFavicons,
    optimizeImages,
);
exports.prod = prod;

exports.default = dev;
