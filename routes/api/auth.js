const Router = require('express');
const router = Router();
const auth = require('../../middleware/auth');
const UserModel = require('../../model/User.model');

router.post('/',auth,async(req,res)=>{
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

module.exports = router;