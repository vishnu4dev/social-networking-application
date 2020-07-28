import { check, validationResult } from 'express-validator';


export default class Validator {


    async ProfileValidator(req,res,nex){
        try {
            check('name', 'Name is required').not().isEmpty(),
            check('email', 'Please enter a valid email').isEmail(),
            check('password', 'Invalid password formate').isLength({ min: 6 })
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() })
            }
            next();
        } catch (error) {
            res.status(400).json({ errors: errors.array() })
            console.log("Error in Validation middleware");
        }
    }

}

