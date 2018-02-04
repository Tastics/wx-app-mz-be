// 运行环境
process.env.PORT = '8889';
process.env.NODE_ENV || (process.env.NODE_ENV = 'development');

var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')
// var nunjucks = require('nunjucks');
var rfs = require('rotating-file-stream');
var configs = require('./configs');
var database = configs['database'];
var routePrefix = configs['route']['routePrefix']
var routes = require('./routes');

var app = express();

//注册app工具
app.set('database', database);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.set('view engine', 'html');
// app.engine('html', require('ejs').__express);
// app.engine('html', require('jade').__express);
// nunjucks.configure(path.join(__dirname, 'views'), {
//     autoescape: true,
//     express: app
// });
// app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
ejs.delimiter = '$';
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');

// 日志
var logDir = path.join(__dirname, 'log');
fs.existsSync(logDir) || fs.mkdirSync(logDir);
var logStream = rfs('access.log', {
    interval: '1d',
    path: logDir
})
app.use(logger('dev'));
app.use(logger('dev', {stream: logStream}));


// uncomment after placing your favicon in /public
// process.env.NODE_ENV === 'development' ? app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) : app.use(favicon(path.join(__dirname, 'statics', 'favicon.ico')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 开发环境静态目录
switch (process.env.NODE_ENV) {
    case 'development':
        app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(`${routePrefix}/webroot`, express.static(path.join(__dirname, 'public')));
        break;
    default:
        app.use(favicon(path.join(__dirname, 'statics', 'favicon.ico')));
        // 生产环境静态目录
        app.use(`${routePrefix}/webroot`, express.static(path.join(__dirname, 'statics')));
}

// 路由
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
