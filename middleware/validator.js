import { check, validationResult } from 'express-validator';


export default class Validator {


    async ProfileValidator(req,res,nex){
        try {
           return [ body('status', 'status is required').not().isEmpty(),
            body('skills', 'Please enter list of skills').isEmail(),
            body('name', 'Profile Name').exists()]
        } catch (error) {
            res.status(400).json({ errors: errors.array() })
            console.log("Error in Validation middleware");
        }
    }

}

