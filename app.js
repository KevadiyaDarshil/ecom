var createError = require('http-errors');
var express = require('express');
var mongoos = require('mongoose')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product')
var reviewRouter = require('./routes/review')
var wishlistRouter = require('./routes/wishlist')
var viewOrderRouter = require('./routes/viewOrder')
var orderRouter = require('./routes/order')


// mongoos.connect('mongodb://localhost:27017/ecom')
mongoos.connect('mongodb+srv://kevadiyadarshil13:inYq1p9V1wQlEzvB@mycluster.i6cpq.mongodb.net/MongooseCRUD?retryWrites=true&w=majority&appName=myCluster')
  .then(() => {

    console.log("conected");

  })
  .catch((err) => {
    console.log(err);


  })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter)
app.use('/wishlist', wishlistRouter)
app.use('/order', orderRouter)
app.use('/viewOrder', viewOrderRouter)

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
