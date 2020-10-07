const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");

const rev = require("gulp-rev");

gulp.task("css", function () {
  console.log("Minifying CSS");
  // ** means every files in the given directory
  gulp
    .src("./assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));
});
