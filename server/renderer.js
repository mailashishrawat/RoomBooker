var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
var mongoconnector = require("./mongodbconnector");

var app = new express();
var expressWS = require('express-ws')(app);
var router = express.Router();
app.use(cors());
app.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.method);
   
    mongoconnector.connectMongodb();
    next();

});

app.use(express.static('../app/dist')); 

//app.use('/static', express.static(path.join(__dirname,'../app/dist/static')));
/*app.get('/', function (req, res) {
    console.log('root:' + req.url);
    var filepath = path.join(__dirname, "../app/dist/index.html")
    console.log(filepath);
    res.redirect(filepath);


});

app.get('/static/img/logo.8633eae.png', function (req, res) {
    console.log("Static" + req.url);
    var filepath = path.join(__dirname, "../app/dist/static", req.url);
    console.log(filepath);
    res.redirect(filepath);
   // res.send(filepath);
})

app.get('/static/(.*)', function (req, res) {
    console.log("Static" + req.url);
    var filepath = path.join(__dirname, "../app/dist", req.url);
    console.log(filepath);
    res.redirect(filepath);
//res.send("filepath");
});*/
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/Events', function (req, res) {
    console.log(req.body);
    
    mongoconnector.insertEvent(req.body);
    // res.end("sucessfully added");

});
/*app.ws('/echo', function (ws, req) {

    ws.on('message', function (msg) {
        console.log("onmessage called");
        console.log(msg);
        ws.send(msg);
    });
});*/
/*app.get('/', function (req, res) {
    var filepath = path.join(__dirname, "/public_html/index.html")
    console.log(filepath);
    res.sendFile(filepath);

});*/
app.listen(3000, function () {
    console.log("server started sucessfully");
});