const Router = require('express');
const router = Router();
const auth = require('../../middleware/auth');

router.post('/',auth,(req,res)=>{
    try {
        res.status(200).send("Authenticated")
    } catch (error) {
        console.log("Error in Auth")
    }
})

module.exports = router;