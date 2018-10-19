const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const config = {
    root: './src',
    css: {
        watch: '/precss/**/*.less',
        src: '/precss/styles.less',
        dest: '/css'
    },
    smartgrid: {
        src: './smartgrid.js',
        dest: '/precss'
    },
    js: {
        watch: '/prejs/**/*.js',
        src: '/prejs/**/*.js',
        dest: '/js'
    }
};

gulp.task('css', function(){

    gulp.src(config.root + config.css.src)
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['>0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 1
        }))
        .pipe(gulp.dest(config.root + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));

});

gulp.task('js', function(){
    gulp.src(['./src/prejs/jquery-3.3.1.min.js', './src/prejs/owl.carousel.min.js', './src/prejs/scripts.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(babel({
			presets: ['env']
        }))
        .on('error', console.error.bind(console))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.root + config.js.dest))
});

gulp.task('watch', ['js', 'css', 'browserSync'], function(){

    gulp.watch(config.root + config.css.watch, ['css']);
    gulp.watch(config.root + config.js.watch, ['js']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch(config.smartgrid.src, ['grid']);

});

gulp.task('browserSync', function(){

    browserSync.init({
        server: {
            baseDir: config.root
        }
    });

});

gulp.task('grid', function(){

    delete require.cache[require.resolve(config.smartgrid.src)];
    let options = require(config.smartgrid.src);
    smartgrid(config.root + config.smartgrid.dest, options);

});