const Router = require('express');
const router = Router();
const gravatar = require('gravatar');
const Bcrypt = require('bcryptjs');

const userModel = require('../../model/User.model');
const jwt = require('jsonwebtoken');
import config from 'config';
import UserController from '../controller/user.controller';
import AuthController from '../../middleware/auth';
import {validate, RequestValidation} from '../../middleware/validator';


const User = new UserController();

router.post('/register',validate().register,RequestValidation, async(req, res) => {
    try {
        const { name, password, email } = req.body;
            let ifUserExist = await userModel.findOne({email});
            if(ifUserExist){
              return 
               res.status(400).send("Already exist")
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
           const payload ={
               id: user.id,
           }
           await user.save()
            jwt.sign(payload,config.get('jwtCode'),{expiresIn:36000},(err,token)=>{
            if(err) return res.status(400).send("Failed to encrypt user");
            return res.status(200).send({token})
        })   
    } catch (error) {
        console.log(" Error in user REG",error)
        return res.status(500).send(error)
    }
})

/**post profile data */
router.post('/setProfile',AuthController,validate().profile,RequestValidation,User.setUserProfile)

router.put('/EditProfile',AuthController,validate().profile,RequestValidation,User.editUserProfile)

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

router.get('/github/:username',User.gitHubApi)

module.exports = router;