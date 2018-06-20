var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/course-management-database');
mongoose.connect('mongodb://heroku_xgwlz1bx:ehncuhk0pkdnuvhd5soic4oc9r@ds163410.mlab.com:63410/heroku_xgwlz1bx');

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
    "http://angular-course-management.herokuapp.com");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var session = require('express-session')

// set time out to 30 minutes
var TIME_OUT = 1800000

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'any string',
  cookie: {
      maxAge: TIME_OUT,
  },
  rolling: true,

}));


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/message/:theMessage', function (req, res) {
  var theMessage = req.params['theMessage'];
  res.send(theMessage);
})

app.get('/api/session/set/:name/:value',
  setSession);
app.get('/api/session/get/:name',
  getSession);
// app.get('/api/session/get',
//   getSessionAll);
// app.get('/api/session/reset',
//   resetSession);

function setSession(req, res) {
  var name = req.params['name'];
  var value = req.params['value'];
  req.session[name] = value;
  res.send(req.session);
  // var hour = 10000
  // req.session.cookie.expires = new Date(Date.now() + hour)
  // req.session.cookie.maxAge = hour
}

function getSession(req, res) {
  var name = req.params['name'];
  var value = req.session[name];
  res.send(value);
}


var userService = require('./services/user.service.server');
userService(app);

require('./services/section.service.server')(app);

app.listen(process.env.PORT || 4000);