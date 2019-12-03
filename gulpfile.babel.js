import del from 'del';
import favicons from 'favicons';
import gulp from 'gulp';
import inject from 'gulp-inject';
import log from 'fancy-log';

import * as faviconsConfig from './config/favicons.json';

const path = {
    iconsFrom: 'src/assets/logo.svg',
    iconsTo: 'public/icons',
    index: 'public/index.html',
    public: 'public',
}

export const clean = () => del([
    path.iconsTo,
]);

export const genIcons = () => {
    return gulp.src(path.iconsFrom)
        .pipe(favicons.stream(faviconsConfig))
        .on('error', log)
        .pipe(gulp.dest(path.iconsTo));
};

export const injectIcons = () => {
    return gulp.src(path.index)
        .pipe(inject(gulp.src([`${path.iconsTo}/${faviconsConfig.html}`]), {
            starttag: '<!-- inject:icons -->',
            transform: (filepath, file) => {
                return file.contents.toString();
            }
        }))
        .pipe(gulp.dest(path.public));
}

export default gulp.series(
    clean,
    genIcons,
    injectIcons,
);
