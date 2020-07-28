
import UserModel from '../../model/User.model';
import UserProfile from '../../model/Profile.model';


export default class User {
    /**
     * Test route
     * @param None
     */
    async getUser(req,res){
        try {
            res.send("User get successfull")
        } catch (error) {
            console.log("Error in getting users")
        }
    }
    
    /**
     * 
     * @param {Profile details} req 
     * @param {Updated Message} res 
     */
    async setUserProfile(req,res){
        try {
            console.log("=== Req,",req.body)
            return res.status(200)
        } catch (error) {
            return res.status(400).send("Error in setting user profile")
        }
    }


    /**
     * get current Profile
    */
    async getCurrentProfile(req,res){
        try {
            const profile = await UserProfile.findOne({user:req.user.id}).populate('user',['name','avatar'])
            if(!profile){ return res.status(400).send("Profile is missing")}
            else{ return res.status(200).send("Profile found"); }
        } catch (error) {
            return res.status(400).send("Error in getting profile")
        }
    }
}