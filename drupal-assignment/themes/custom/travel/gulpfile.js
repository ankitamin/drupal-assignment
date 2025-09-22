const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const cached = require("gulp-cached");
const prettier = require("gulp-prettier");

// Paths
const paths = {
  scss: "scss/**/*.scss",
  css: "css"
};

// Compile SCSS
function styles() {
  return gulp.src(["scss/**/*.scss", "!scss/**/_*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css));
}

// Watch SCSS
function watchFiles() {
  gulp.watch(paths.scss, styles);
}

// Format SCSS using Prettier
function formatScss() {
  return gulp.src(paths.scss)
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest("scss"));
}

// Build task
const build = gulp.series(styles);

// Default task
exports.styles = styles;
exports.watch = gulp.series(styles, watchFiles);
exports.format = formatScss;
exports.build = build;
exports.default = exports.watch;
