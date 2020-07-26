const Router = require('express');
const router = Router();

router.get('/',(req,res)=>{
    try {
        res.send("Auth is here")
    } catch (error) {
        console.log("Error in Auth")
    }
})

module.exports = router;