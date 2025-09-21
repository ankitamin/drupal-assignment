const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const cached = require("gulp-cached");

// Paths
const paths = {
  scss: "scss/**/*.scss",   // SCSS folder
  css: "css"         // output directory
};

// Compile SCSS
function styles() {
  return gulp.src(["scss/**/*.scss", "!scss/**/_*.scss"]) // only non-underscore SCSS
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css)); // will output hero-banner.css if source is hero-banner.scss
}

// Watch SCSS
function watchFiles() {
  gulp.watch(paths.scss, styles);
}

exports.styles = styles;
exports.watch = gulp.series(styles, watchFiles);
exports.default = exports.watch;
