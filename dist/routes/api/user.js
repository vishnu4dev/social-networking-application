'use strict';

var _validator = require('../../middleware/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = require('express');
var router = Router();
var gravatar = require('gravatar');
var Bcrypt = require('bcryptjs');

var userModel = require('../../model/User.model');
var jwt = require('jsonwebtoken');
var config = require('config');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

router.post('/register', [check('name', 'Name is required').not().isEmpty(), check('email', 'Please enter a valid email').isEmail(), check('password', 'Invalid password formate').isLength({ min: 6 })], async function (req, res) {
    try {
        var _req$body = req.body,
            name = _req$body.name,
            password = _req$body.password,
            email = _req$body.email;

        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            var ifUserExist = await userModel.findOne({ email: email });
            if (ifUserExist) {
                return res.status(400).send("Already exist");
            }
            var avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            var user = new userModel({
                name: name,
                email: email,
                password: password,
                avatar: avatar
            });
            var salt = await Bcrypt.genSaltSync(10);
            user.password = await Bcrypt.hash(password, salt);
            await user.save();

            var payload = {
                id: user.id
            };
            jwt.sign(payload, config.get('jwtCode'), { expiresIn: 36000 }, function (err, token) {
                if (err) throw err;
                return res.status(200).send({ token: token });
            });
        }
    } catch (error) {
        console.log(" Error in user REG");
    }
});

router.post('/UpdateProfile');

module.exports = router;