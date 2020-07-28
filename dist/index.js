'use strict';

var express = require('express');
var dbconnect = require('./config/db');
var User = require('./routes/api/user');
var Auth = require('./routes/api/auth');

var app = express();
dbconnect();
var PORT = process.env.PORT || 8000;

// Use middle-ware
app.use(express.json());

/*Modules */
app.use('/user', User);
app.use('/auth', Auth);

app.listen(PORT, function () {
    console.log('Server is listening in ' + PORT);
});