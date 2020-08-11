import { check, validationResult, body } from 'express-validator';

const validate=()=>{
    return{
        "profile":[
            check('status', 'status is required').not().isEmpty(),
            body('skill').exists().withMessage('Skill list missing '),
            check('name', 'Profile Name').exists(),
            body('address').exists().withMessage('Address is req'),
            body('phoneNumber').exists().withMessage("Phone number is req"),       
        ],
        "register":[
            body('name').notEmpty().withMessage('Name is req'), 
            body('email').isEmail().withMessage('Email is Invalid'), 
            body('password').isLength({ min: 6 }).withMessage('Password is invalid'), 
        ],
        "expr":[
            body('title').exists().withMessage('title is req'), 
            body('company').exists().withMessage('company is req'), 
            body('fromDate').isDate().withMessage('fromDate is invalid'), 
        ],
        "postFeed":[
            body('text').exists().withMessage('text is req')
        ]
    }
}

const RequestValidation=(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
    console.log("******* Input Error *******");
    return res.status(400).json({errors:error.array()});
    }
    console.log(error)
    next();
}


module.exports={
    validate,
    RequestValidation,
}
