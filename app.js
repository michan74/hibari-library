var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var config = require('dotenv').config();

var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var searchRouter = require('./routes/search');
var bookRouter = require('./routes/book');
var noteRouter = require('./routes/note');
var colorRouter = require('./routes/color');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

//セッションの設定
let sessionOption = {
  secret: 'my secret',  //暗号化に使われるキー
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }   //クッキーの保存期間：１時間
};
app.use(session(sessionOption));

app.use('/', indexRouter);
app.use('/menu', menuRouter);
//app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/book', bookRouter);
app.use('/note', noteRouter);
app.use('/color', colorRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
