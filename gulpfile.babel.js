import del from 'del';
import favicons from 'favicons';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import inject from 'gulp-inject';
import webp from 'gulp-webp';

import * as faviconsConfig from './config/favicons.json';

const path = {
    faviconsFrom: 'src/assets/svg/logo.svg',
    faviconsTo: `public${faviconsConfig.path}`,
}

export const clean = () => del([
    'public/assets',
]);

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

export const genFavicons = () => {
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
    copyAssets,
    generateWebps,
    genFavicons,
    injectFavicons,
    optimizeImages,
);
