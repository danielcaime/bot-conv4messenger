
/**
 * dcaime
 */

 //modules
var express = require('express');
const bodyParser = require('body-parser')
var  path = require('path');

module.exports = {
  log: require('./lib/log'),
  Wit: require('./lib/wit'),
  interactive: require('./lib/interactive')
};


//routes
var index = require('./routes/index');
//var search = require('./routes/search');
var webhooks = require('./routes/webhooks');
//
const app = express();

/* ----------  Static Assets  ---------- */

app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

//views
app.set('view engine', 'ejs');

//midleware ?
app.use(express.static(__dirname));
//paths
app.use('/',index);
//app.use('/search',search);
app.use('/webhook',webhooks);

/**
 * errors
 */

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
//listen
app.listen(app.get('port'),()=>{
    console.log('node app is listen in');
});

module.exports = app;