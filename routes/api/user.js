const Router = require('express'); 
const router = Router();

router.post('/',(req,res)=>{
    try {
        res.status(200).send(`User is ${req.body.user}`)
    } catch (error) {
        console.log(" Error in get user")
    }
})

module.exports = router;