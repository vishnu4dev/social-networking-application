const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const Bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const userModel = require('../../model/User.model');

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Invalid password formate').isLength({ min: 6 })
], async(req, res) => {
    try {
        const errors = validationResult(req);
        const { name, password, email } = req.body;
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
           return res.send("User registerd")
        } catch (error) {
            console.log("Error in reg user",error)
        }
    } catch (error) {
        console.log(" Error in user REG")
    }
})

module.exports = router;