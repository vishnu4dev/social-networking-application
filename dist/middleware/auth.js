'use strict';

var jwt = require('jsonwebtoken');
var config = require('config');

module.exports = function (req, res, next) {
    var token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token ' });
    }
    try {
        var decode = jwt.verify(token, config.get('jwtCode'));
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};