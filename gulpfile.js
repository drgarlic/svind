const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const favicons = require('favicons');
const faviconsConfig = require('./gulp/favicons/config.json');
const fs = require('fs');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const packageJson = require('./package.json');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-string-replace');
const tailwindcss = require('tailwindcss');
const webp = require('gulp-webp');

const updateServiceWorker = () => {
    const root = 'dist';

    const skip = [
        'favicons',
    ];

    const flatDeep = arr => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);

    const tree = (root) => fs.readdirSync(root, { withFileTypes: true })
        .filter(element => ! skip.includes(element.name) && ! element.name.endsWith('.map'))
        .map(element => element.isDirectory()
            ? tree(`${root}/${element.name}`)
            : `${root}/${element.name}`);

    const listAllFiles = flatDeep(fs.readdirSync(root, { withFileTypes: true })
        .filter(dir => dir.isDirectory() && ! skip.includes(dir.name))
        .map(dir => tree(`${root}/${dir.name}`)))
        .map(path => path.substring(root.length));

    const filesToPreCache = [
        '/',
        '/index.html',
        ...listAllFiles,
    ];

    return gulp.src(`${root}/service-worker.js`)
        .pipe(replace(/'cache-.*'/, `'cache-${packageJson.name}-${(+new Date).toString(36)}'`))
        .pipe(replace(/filesToPreCache = \[(.*\n)*\]/, `filesToPreCache = [\n    '${filesToPreCache.join('\',\n    \'')}'\n]`))
        .pipe(gulp.dest(root));
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

    return gulp.src('gulp/favicons/icon.*')
        .pipe(favicons.stream(faviconsConfig))
        .pipe(gulp.dest(`public${faviconsConfig.path}`));
};
exports.generateFavicons = generateFavicons;

const clean = () => {
    return del([
        'dist',
        'public/**/*.webp',
    ]);
};
exports.clean = clean;

const generateWebps = () => {
    return gulp.src('public/**/*')
        .pipe(webp({
            quality: 90,
        }))
        .pipe(gulp.dest('public'));
};
exports.generateWebps = generateWebps;

const injectFavicons = () => {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src([`public${faviconsConfig.path}${faviconsConfig.html}`]), {
            starttag: '<!-- inject:favicons -->',
            transform: (filepath, file) => {
                return file.contents.toString();
            }
        }))
        .pipe(gulp.dest('./'));
};
exports.injectFavicons = injectFavicons;

const cleanFaviconsHTML = () => {
    return del([
        'public/favicons/*.html',
    ]);
};
exports.cleanFaviconsHTML = cleanFaviconsHTML;

const optimizeImages = () => {
    return gulp.src('public/**/*.+(jpeg|jpg|png|gif)')
        .pipe(imagemin())
        .pipe(gulp.dest('public'));
};
exports.optimizeImages = optimizeImages;

const dev = gulp.series(
    clean,
    generateWebps,
);
exports.dev = dev;

const prod = gulp.series(
    generateWebps,
    generateFavicons,
    injectFavicons,
    cleanFaviconsHTML,
    optimizeImages,
);
exports.prod = prod;

exports.default = dev;
