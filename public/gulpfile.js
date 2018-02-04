/**
 * Created by cendawei
 * on 2017/12/1.
 */
'use strict';
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rev = require('gulp-rev');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var webpack = require("webpack");
var gulpEjs = require('gulp-ejs');
var devWebpackConfig = require('./configs/webpack.dev.config');
var prodWebpackConfig = require('./configs/webpack.product.config');
var routePrefix = require('./configs/route.path.config').apiPrefix

var buildJs = function () {
    var webpackConfig = process.env.NODE_ENV === 'development' ? devWebpackConfig : prodWebpackConfig;
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
    });
}

var applyDev = function () {
    process.env.NODE_ENV = 'development';
    gulp.src('build/js', {read: false})
        .pipe(clean());
    buildJs();
}

var rmdirSync = (function () {
    function iterator(url, dirs) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url);//收集目录
            inner(url, dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url);//直接删除文件
        }
    }

    function inner(path, dirs) {
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];) {
            iterator(path + "/" + el, dirs);
        }
    }

    return function (dir, cb) {
        cb = cb || function () {
            };
        var dirs = [];

        try {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];) {
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb()
        } catch (e) {//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();

gulp.task("clean", function (done) {
    rmdirSync("../statics/build/css", function (e) {
    })
    done()
})

gulp.task("set-dev", ['copy-views', 'copy-views-dev'], function (done) {
    applyDev()
    done()
})

gulp.task("set-build", ['copy-views', 'copy-views-prod'], function (done) {
    process.env.NODE_ENV = 'production';
    rmdirSync("../statics/build/js", function (e) {
    })
    buildJs();
    done()
})

gulp.task("webpack", function () {
    applyDev()
});

gulp.task('png', function () {
    var spritedirs = fs.readdirSync(path.resolve(__dirname + '/sprites/'));
    spritedirs.forEach(function (dir) {
        var subspritedirs = fs.readdirSync(path.resolve(__dirname + '/sprites/' + dir + '/'));
        subspritedirs.forEach(function (spritedir) {
            gulp.src('sprites/' + dir + '/' + spritedir + '/*.png').pipe(spritesmith({
                imgName: spritedir + '.png',
                cssName: spritedir + '.css'
            }))
                .pipe(gulp.dest('images/' + dir + '/'));
        })
    })
});

gulp.task('jpg', function () {
    var spritedirs = fs.readdirSync(path.resolve(__dirname + '/sprites/'));
    spritedirs.forEach(function (dir) {
        var subspritedirs = fs.readdirSync(path.resolve(__dirname + '/sprites/' + dir + '/'));
        subspritedirs.forEach(function (spritedir) {
            gulp.src('sprites/' + dir + '/' + spritedir + '/*.jpg').pipe(spritesmith({
                imgName: spritedir + '.jpg',
                cssName: spritedir + '.css'
            }))
                .pipe(gulp.dest('images/' + dir + '/'));
        })
    })
});

gulp.task('sass', function () {
    return gulp.src('./style/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('watch', ['set-dev', 'sass'], function () {
    gulp.watch('./style/sass/**/*.scss', ['sass']);
    gulp.watch('./components/**/*.vue', ['webpack']);
    gulp.watch('./js/**/*.js', ['webpack']);
    gulp.watch('./views/**/*.html', ['copy-views-dev']);
});


gulp.task('minifycss', ['clean', 'sass'], function () {
    return gulp.src('build/css/**/*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
        .pipe(rev())    //添加文件chunkhash
        .pipe(gulp.dest('../statics/build/css'))   //输出文件夹
        .pipe(rev.manifest())   //输出映射json文件
        .pipe(gulp.dest('../statics/build/css'));
});

gulp.task('minifyjs', ['clean'], function () {
    gulp.src('build/js/*.js')
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('../statics/build/js'));  //输出
});

gulp.task('copy-views', function () {
    return gulp.src("./views/**/*.html")
        .pipe(gulp.dest("../views"))
})

gulp.task('copy-statics', function () {
    gulp.src('images/**/*')
        .pipe(gulp.dest('../statics/images'))
    gulp.src('plugins/**/*')
        .pipe(gulp.dest('../statics/plugins'))
    gulp.src('*.ico')
        .pipe(gulp.dest('../statics'))
})

gulp.task('copy-views-dev', function () {
    return gulp.src('./views/**/*.html')
        .pipe(
            gulpEjs({
                env: 'development',
                routePrefix,
            })
        )
        .pipe(gulp.dest('./tmpViews'));
});

gulp.task('copy-views-prod', ['minifycss'], function () {
    return gulp.src('./views/**/*.html')
        .pipe(
            gulpEjs({
                env: 'production',
                routePrefix,
                cssMap: JSON.parse(fs.readFileSync('../statics/build/css/rev-manifest.json'))
            })
        )
        .pipe(gulp.dest('./tmpViews'));
});

gulp.task('dev', ['copy-views', 'sass', 'copy-views-dev', 'set-dev', 'watch']);

gulp.task('build', ['copy-views', 'clean', 'sass', 'minifycss', 'copy-views-prod', 'copy-statics', 'set-build'])