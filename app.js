var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var session = require('express-session');
var database = require('./common/database');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

app.set('trust proxy', 1) // trust first proxy
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/', indexRouter);
app.use('/user', userRouter);

module.exports = app;