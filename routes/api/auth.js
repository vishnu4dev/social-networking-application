const Router = require('express');
const router = Router();
const AuthMiddileWare = require('../../middleware/auth');
const UserModel = require('../../model/User.model');
const AuthController = require('../controller/auth.controller');
const { check, validationResult } = require('express-validator');



const auth = new AuthController();

router.post('/',AuthMiddileWare,async(req,res)=>{
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
    auth.login)

module.exports = router;