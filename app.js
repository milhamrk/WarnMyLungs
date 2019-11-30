var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var homeControl = require('./controller/homeControl');
var forecastControl = require('./controller/forecastControl');
var userControl = require('./controller/userControl');
var app = express();

var resp = function (res, data, code, next) {
    res.status(code).json(data);
    return next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(config.init_port);

console.log("Application is listening on port ", config.init_port);

app.post('/beranda/add', function (req, res, next) {

    var body = req.body;

    homeControl.addAQI(body, function (response, code) {
        resp(res, response, code, next)
    })

});
app.get('/beranda/:id', function (req, res, next) {
    var param = req.params;

    homeControl.getAQI(param, function (response, code) {
        resp(res, response, code, next)
    })
});
app.get('/beranda/aqi/:id', function (req, res, next) {
    var param = req.params;
    homeControl.getAQIs(param, function (response, code) {
        resp(res, response, code, next)
    })
});
app.get('/forecast/:day/:month/:year/:places', function (req, res, next) {
    var param = req.params;

    forecastControl.getForecast(param, function (response, code) {
        resp(res, response, code, next)
    })
});

app.post('/forecast/add', function (req, res, next) {

    var body = req.body;

    forecastControl.addForecast(body, function (response, code) {
        resp(res, response, code, next)
    })

});

app.post('/user/register', function (req, res, next) {
    var body = req.body;
    userControl.addUser(body, function (response, code) {
        resp(res, response, code, next)
    })

});
app.get('/user/:phone', function (req, res, next) {
    var param = req.params;

    userControl.getUser(param, function (response, code) {
        resp(res, response, code, next)
    })
});

app.post('/user/login/', function (req, res, next) {
    var body = req.body;
    userControl.loginUser(body, function (response, code) {
        resp(res, response, code, next)
    })
});

app.get('/user/verify/:phone', function (req, res, next) {
    var param = req.params;

    userControl.verifyUser(param, function (response, code) {
        resp(res, response, code, next)
    })
});
app.get('/user/delete/:number', function (req, res, next) {
    var param = req.params;

    userControl.deleteUser(param, function (response, code) {
        resp(res, response, code, next)
    })
});