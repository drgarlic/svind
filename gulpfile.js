const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const favicons = require('favicons');
const faviconsConfig = require('./gulp/favicons.json');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const packageJson = require('./package.json');
const postcss = require('gulp-postcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const replace = require('gulp-string-replace');
const tailwindcss = require('tailwindcss');
const webp = require('gulp-webp');

faviconsConfig.appName = packageJson.name;
faviconsConfig.appShortName = packageJson.name;
faviconsConfig.appDescription = packageJson.description;
faviconsConfig.developerName = packageJson.author.name;
faviconsConfig.developerURL = packageJson.author.url;
faviconsConfig.version = packageJson.version;
faviconsConfig.url = packageJson.homepage;

faviconsLogo = 'public/assets/svg/logo.svg';
faviconsDestination = `public${faviconsConfig.path}`;

const updateServiceWorker = () => {
    // Show the version update banner:

    // - On all version changes
    // const version = packageJson.version;

    // - On major and minor version changes
    const version = packageJson.version.substr(0, packageJson.version.lastIndexOf('.'));

    // - Only on major version changes
    // const version = packageJson.version.split('.')[0];

    return gulp.src('public/service-worker.js')
        .pipe(replace(/'cache-.*'/, `'cache-${packageJson.name}-${version}'`))
        .pipe(gulp.dest('public'));
};

const tailwind = () => {
    return gulp.src('gulp/tailwind.css')
        .pipe(postcss([
            tailwindcss(),
            autoprefixer()
        ]))
        .pipe(gulp.dest('public'));
};

const optimizeCss = () => {
    const purgecssConfig = {
        content: [
            './public/index.html',
            './src/**/*.svelte'
        ],
        defaultExtractor: (content) => {
            const matches = content.match(/[\w-/.:]+(?<!:)/g) || [];
            // Special Svelte case when binding a class
            return matches.map(match => match.startsWith('class:') ? match.substr(6) : match);
        }
    };

    return gulp.src('public/tailwind.css')
        .pipe(postcss([
            purgecss(purgecssConfig),
            cssnano()
        ]))
        .pipe(gulp.dest('public'));
};

const generateWebps = () => {
    return gulp.src('public/assets/**/*')
        .pipe(webp({
            quality: 90,
        }))
        .pipe(gulp.dest('public/assets'));
};

const generateFavicons = () => {
    return gulp.src(faviconsLogo)
        .pipe(favicons.stream(faviconsConfig))
        .pipe(gulp.dest(faviconsDestination));
};

const injectFavicons = () => {
    return gulp.src('public/index.html')
        .pipe(inject(gulp.src([`${faviconsDestination}${faviconsConfig.html}`]), {
            starttag: '<!-- inject:favicons -->',
            transform: (filepath, file) => {
                return file.contents.toString();
            }
        }))
        .pipe(gulp.dest('public'));
};

const optimizeImages = () => {
    return gulp.src('public/**/*.+(jpeg|jpg|png|gif)')
        .pipe(imagemin())
        .pipe(gulp.dest('public'));
};

const dev = gulp.series(
    updateServiceWorker,
    tailwind,
    generateWebps,
);

const prod = gulp.series(
    dev,
    optimizeCss,
    generateFavicons,
    injectFavicons,
    optimizeImages,
);

exports.dev = dev;
exports.prod = prod;
exports.default = dev;
