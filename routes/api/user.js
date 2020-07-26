const Router = require('express'); 
const router = Router();

router.get('/',(req,res)=>{
    try {
        res.send("User is here")
    } catch (error) {
        console.log(" Error in get user")
    }
})

module.exports = router;