const Router = require('express');
const router = Router();
const gravatar = require('gravatar');
const Bcrypt = require('bcryptjs');

const userModel = require('../../model/User.model');
const jwt = require('jsonwebtoken');
const config = require('config');

import UserController from '../controller/user.controller';
import AuthController from '../../middleware/auth';
import {validate, RequestValidation} from '../../middleware/validator';
import auth from '../../middleware/auth';

const User = new UserController();

router.post('/register',validate().register,RequestValidation, async(req, res) => {
    try {
        const { name, password, email } = req.body;
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
    } catch (error) {
        console.log(" Error in user REG")
    }
})

/**post profile data */
router.post('/setProfile',AuthController,validate().profile,RequestValidation,User.setUserProfile)

// router.post('/setProfile',AuthController,Validate.ProfileValidator,User.setUserProfile)

/**get profile data */
router.get('/getUserProfile',AuthController,User.getCurrentProfile)

router.get('/listAllProfile',AuthController,User.getAllProfile);

router.get('/:id',User.getProfileByUserId);

router.delete('/',AuthController,User.deleteProfile);

router.put('/expr',AuthController,User.addUserExpereince);

router.delete('/experience/:exp_id',AuthController,User.deleteUserExperience);


router.put('/education',AuthController,User.addUserAcademics);

router.delete('/education/:edu_id',AuthController,User.deleteUserQualification)

module.exports = router;