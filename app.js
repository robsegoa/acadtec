var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var load = require('express-load');
var mongoose = require('mongoose');
var flash = require('express-flash');
var moment = require('moment');
var expressValidator = require('express-validator');


//conexão com mongo
mongoose.connect('mongodb://localhost:27017/acadtec',function(err){
  if(err){
    console.log("Erro ao conectar no mongoDB: "+err);
  }else{
    console.log("Conexão com mongoDB efetuada com sucesso!");
  }
});

var app = express();

//middleware
var erros = require('./middleware/erros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
////////////////bloco inserido depois//////
app.use(expressValidator());
/////////////////////////////////////
app.use(cookieParser());
app.use(session({ secret: 'nodejsacadtec009933'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//helpers - tem que ser antes do carregamento do load
app.use(function(req,res,next){
  //sessão
  res.locals.session = req.session.usuario;
  res.locals.isLogged= req.session.usuario ? true : false;

  //moment
  res.locals.moment = moment;
  next();
});

//Essa 4 linhas abaixo foram comentadas pq as rotas foram criadas nos controladores para usar o load;
//var routes = require('./routes/index');
//var users = require('./routes/users');
//app.use('/', routes); 
//app.use('/users', users);

load('models').then('controllers').then('routes').into(app);

//middleware
//app.use(erros.notfound);
//app.use(erros.serverError


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});