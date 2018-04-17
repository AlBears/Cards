import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";

const $ = require("gulp-load-plugins")();

gulp.task("server:clean", cb => {
	rimraf("./build", () => cb());
});

gulp.task("server:build",
	gulp.series(
		"server:clean",
		compileServer
	));

function compileServer() {
	return gulp.src("./src/server/**/*.js")
		.pipe($.changed("./build"))
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write(".", {sourceRoot: path.join(__dirname, "src", "server")}))
		.pipe(gulp.dest("./build"));
}