const Router = require('express');
const router = Router();
const gravatar = require('gravatar');
const Bcrypt = require('bcryptjs');

const userModel = require('../../model/User.model');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


router.post('/',[       
check('name', 'Name is required').not().isEmpty(),
check('email', 'Please enter a valid email').isEmail(),
check('password', 'Invalid password formate').isLength({ min: 6 })
], async(req, res) => {
    try {
        const { name, password, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
        try {
            let ifUserExist = await userModel.findOne({email});
            if(ifUserExist){
              return  res.status(400).send("Already exist")
            }
            const avatar = gravatar.url(email,{
                s:'200',
                r:'pg',
                d:'mm'
            })
            const user = new userModel({
                name,
                email,
                password,
                avatar,
            })
            const salt = await Bcrypt.genSaltSync(10);
            user.password = await Bcrypt.hash(password,salt);
            await user.save()
           
           const payload ={
               id: user.id,
           }
        jwt.sign(payload,config.get('jwtCode'),{expiresIn:36000},(err,token)=>{
            if(err) throw err;
            return res.status(200).send({token})
        })

        // return res.send("User registerd")
        } catch (error) {
            console.log("Error in reg user",error)
        }
    } catch (error) {
        console.log(" Error in user REG")
    }
})

module.exports = router;