var gulp = require("gulp");
var jasmine = require("gulp-jasmine");

gulp.task("test", function() {
	gulp.src("/tests/*.js")
		.pipe(jasmine());
});
