/**
 * Created by jgarcia on 01/12/2017.
 * Updated 26/11/2018
 */

//load modules
var fs = require('fs');
var favicon = require('serve-favicon');
var path = require('path');
var express = require('express');
var app = express();

//load custom module that you should use
var kwiz = require('./kwiz_module/kwiz_module');

//create the server and the socketsio
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//server static file in the public directory
app.use(express.static('public'))
    .use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// client connexion
io.on('connection', function (socket) {
    //send the questions to the client
    console.log("client connected");
    socket.emit("quiz", kwiz.questions());
});

server.listen(process.env.PORT || 8080, () => {
	console.log("Server is running");
});