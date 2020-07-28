'use strict';

var Router = require('express');
var router = Router();
var AuthMiddileWare = require('../../middleware/auth');
var UserModel = require('../../model/User.model');
var AuthController = require('../controller/auth.controller');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var auth = new AuthController();

router.post('/', AuthMiddileWare, async function (req, res) {
    try {
        var respo = await UserModel.findById(req.user.id).select('-password');
        if (respo) {
            return res.status(200).send(respo);
        } else throw error;
    } catch (error) {
        console.log("Error in Auth", error);
    }
});

router.post('/login', [
 check('email', 'Please enter a valid mailID').isEmail().isEmpty(),
 check('password', 'Password is required').exists()], auth.login);

module.exports = router;