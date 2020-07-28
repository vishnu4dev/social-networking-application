'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressValidator = require('express-validator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, [{
        key: 'ProfileValidator',
        value: async function ProfileValidator(req, res, nex) {
            try {
                (0, _expressValidator.check)('name', 'Name is required').not().isEmpty(), (0, _expressValidator.check)('email', 'Please enter a valid email').isEmail(), (0, _expressValidator.check)('password', 'Invalid password formate').isLength({ min: 6 });
                var _errors = (0, _expressValidator.validationResult)(req);
                if (!_errors.isEmpty()) {
                    res.status(400).json({ errors: _errors.array() });
                }
                next();
            } catch (error) {
                res.status(400).json({ errors: errors.array() });
                console.log("Error in Validation middleware");
            }
        }
    }]);

    return Validator;
}();

exports.default = Validator;