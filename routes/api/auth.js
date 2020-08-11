const Router = require('express');
const router = Router();
const UserModel = require('../../model/User.model');
const { check, validationResult } = require('express-validator');

import AuthMiddileWare from '../../middleware/auth'
import AuthController from '../controller/auth.controller'
const Auth = new AuthController();

router.get('/',AuthMiddileWare,async(req,res)=>{
    try {
        const respo = await UserModel.findById(req.user.id).select('-password');
        if(respo){
            return res.status(200).send(respo);
        }
        else throw error
    } catch (error) {
        console.log("Error in Auth",error)
    }
})


router.post('/login',[
    check('email','Please enter a valid mailID').isEmail().isEmpty(),
    check('password','Password is required').exists()],
    Auth.login)

module.exports = router;