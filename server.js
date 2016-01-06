// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http'),
    config = require('getconfig'),
    sockets = require('./sockets');

var privateKey = fs.readFileSync('fakekeys/privatekey.pem').toString(),
    certificate = fs.readFileSync('fakekeys/certificate.pem').toString();


var app = express();

app.use(express.static(__dirname));

var server = null;
if (config.server.secure) {
    server = https.createServer({key: privateKey, cert: certificate}, app).listen(8000);
} else {
    server = http.createServer(app).listen(8001);
}

sockets(server, config);

console.log('running on https://localhost:8000 and http://localhost:8001');
