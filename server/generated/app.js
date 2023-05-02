var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


//importing the routers for the routes
var lobbyRouter = require('./routes/lobby');
var usersRouter = require('./routes/users');
var codeblockRouter = require('./routes/codeblock');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares below
const corsObj = {
  origin: ["http://localhost:3000", "https://move-task-frontend.onrender.com"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}

app.use(cors(corsObj));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//setting routes from routers
app.use('/', lobbyRouter);
app.use('/users', usersRouter);
app.use('/codeblock', codeblockRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
