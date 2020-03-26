import del from 'del';
import favicons from 'favicons';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import inject from 'gulp-inject';
import replace from 'gulp-string-replace';
import webp from 'gulp-webp';

import * as faviconsConfig from './config/favicons.json';
import * as packageJson from './package.json';

faviconsConfig.appName = packageJson.name;
faviconsConfig.appShortName = packageJson.name;
faviconsConfig.appDescription = packageJson.description;
faviconsConfig.developerName = packageJson.author.name;
faviconsConfig.developerURL = packageJson.author.url;
faviconsConfig.version = packageJson.version;
faviconsConfig.url = packageJson.homepage;

const path = {
    faviconsFrom: 'src/assets/svg/logo.svg',
    faviconsTo: `public${faviconsConfig.path}`,
}

export const clean = () => del([
    'public/assets',
]);

export const updateServiceWorker = () => {
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

export const copyAssets = () => {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('public/assets'));
}

export const generateWebps = () => {
    return gulp.src('public/assets/**/*')
        .pipe(webp({
            quality: 90,
        }))
        .pipe(gulp.dest('public/assets'));
}

export const generateFavicons = () => {
    return gulp.src(path.faviconsFrom)
        .pipe(favicons.stream(faviconsConfig))
        .pipe(gulp.dest(path.faviconsTo));
};

export const injectFavicons = () => {
    return gulp.src('public/index.html')
        .pipe(inject(gulp.src([`${path.faviconsTo}${faviconsConfig.html}`]), {
            starttag: '<!-- inject:favicons -->',
            transform: (filepath, file) => {
                return file.contents.toString();
            }
        }))
        .pipe(gulp.dest('public'));
}

export const optimizeImages = () => {
    return gulp.src('public/**/*.+(jpeg|jpg|png|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('public'));
}

export default gulp.series(
    clean,
    updateServiceWorker,
    copyAssets,
    generateWebps,
    generateFavicons,
    injectFavicons,
    optimizeImages,
);
