const { check, validationResult } = require('express-validator');


module.exports = function (req,res,next){
    try {
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Invalid password formate').isLength({ min: 6 })
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
    } catch (error) {
        res.status(400).json({ errors: errors.array() })
        console.log("Error in Validation middleware");
    }
}