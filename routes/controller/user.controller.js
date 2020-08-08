
import UserModel from '../../model/User.model';
import UserProfileModel from '../../model/Profile.model';
import request from 'request';
import config from 'config';



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
            const {name,status,skill,phoneNumber,location,address} = req.body;
            const userId = req.user.id;
            const profileDetails = {};
            profileDetails.name=name;
            profileDetails.user=userId;
            profileDetails.skill= skill,
            profileDetails.phoneNumber=phoneNumber;
            profileDetails.location= location,
            profileDetails.status = status,
            profileDetails.address = address
            try {
                let profile = await UserProfileModel.findOne({user:req.user.id});
                if(profile){
                    profile = await UserProfileModel.findOneAndUpdate({user:req.user.id},{$set:profileDetails},{new:true})
                    res.status(200).send(profile);
                }
                else{
                 let ProfileData = new UserProfileModel(profileDetails);
                 await ProfileData.save();
                 res.status(200).send(ProfileData);
                } 
            } catch (error) {
                res.status(500).send(error);
            }
           } catch (error) {
            res.status(500).send(error.message);
        }
    }


    /**
     * 
     * @param {Same as Profile} req 
     * @param 
     */
    async editUserProfile (req,res){
        try {
        const {name,status,skill,address} = req.body;
        const userId = req.user.id;
        const profileDetails = {};
        profileDetails.name=name;
        profileDetails.user=userId;
        profileDetails.skill= skill,
        profileDetails.status = status,
        profileDetails.address = address
        let profile = await UserProfileModel.findOne({user:req.user.id});
        if(profile){
            profile = await UserProfileModel.findOneAndUpdate({user:req.user.id},{$set:profileDetails},{new:true})
            res.status(200).send(profile);
        }
        else{
            res.status(404).send('Access denied');
        }
        } catch (error) {
            console.log("Sys Error",error)
            res.status(500).send(error.message)
        }
    }


    /**
     * get current Profile
    */
    async getCurrentProfile(req,res){
        try {
            const profile = await UserProfileModel.findOne({user:req.user.id}).populate('user',['name','avatar'])
            if(!profile){ return res.status(400).send("Profile is missing")}
            else{ 
                return res.status(200).send(profile);
             }
        } catch (error) {
            return res.status(400).send("Error in getting profile")
        }
    }

    async getAllProfile(req,res){
        try {
            let listOfProfile = await UserProfileModel.find({}).populate('user',['name','avatar']);
            if(!listOfProfile) res.status(204).send("No Profile to list");
            res.status(200).send(listOfProfile)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }

    async getProfileByUserId(req,res){
        try {
            const profile = await UserProfileModel.findOne({user:req.params.id}).populate('user',['name','avatar']);
            if(!profile) res.status(404).send("No Such Profile");
            else{
                res.status(200).send(profile);
            }
        } catch (error) {
            if(error.kind === 'ObjectId'){
                res.status(404).send("Invalid User Id ")
            }
            res.status(500).send(errro.message)
        }
    }

    async deleteProfile(req,res){
        try {
            let deletedProfile = await UserProfileModel.findOneAndDelete({user: req.user.id});
            let deletedUser = await UserModel.findOneAndDelete({_id: req.user.id});
            if(deletedProfile && deletedUser) res.status(200).send("User Profile Deleted");
            else{
                res.status(404).send("Delete User Failed")
            }
        } catch (error) {
            res.status(500).send('Error in user profile delete')
        }
    }

    async addUserExpereince (req,res){
        try {
            const {role,totalPeriod,companyName,location} = req.body;
            let Expr = {role,totalPeriod,companyName,location}
            let profile = await UserProfileModel.findOne({user: req.user.id});
            if(profile){
                /** Appending User profile with experience */
                profile.expr.unshift(Expr);
                await profile.save();
                res.status(200).send(profile); 
            }
            else{
                res.status(404).send("Invalid User");
            }
        } catch (error) {
            console.log('Error in Data',error)
            res.status(500).send("Unable to update Profile")
        }
    }

    async addUserEducation(req,res){
        try {
            const {title,nameOfInstitution,year} = req.body;
            let education = {title,nameOfInstitution,year};
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async deleteUserExperience(req,res){
        try {
            let {id} = req.params.exp_id;
            let userProfile = await UserProfileModel.findOne({user:req.user.id});
            if(!userProfile) res.status(404).send('User Not found');
            else{
            let removeItem = userProfile.expr.map(_item => _item.id).indexOf(id);
            userProfile.expr.splice(removeItem,1);
            await userProfile.save();
            res.status(200).send(userProfile);
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async addUserAcademics (req,res){
        try {
            let User = await UserProfileModel.findOne({user:req.user.id})
            if(User){
                const {title,nameOfInstitution,year} = req.body;
                let education = {title,nameOfInstitution,year};
                User.education.unshift(education);
                User.save();
                res.status(200).send(User);
            }
            else{
                res.status(403).send('Inavlid User');
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async deleteUserQualification(req,res){
        try {
            const {edu_id} = req.params;
            let User = await UserProfileModel.findOne({user:req.user.id});
            if(!User) res.status(404).send("Invalid User credentials ");
            else{
                let removeItemIndex = User.education.map(Item => Item.id).indexOf(edu_id);
                User.education.splice(removeItemIndex,1);
               await User.save();
               res.status(200).send(User);
            }
        } catch (error) {
            res.status(403).send(error.message);
        }
    }


    async gitHubApi(req,res){
        try {
        const options ={uri:`https:api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('gitHubClientId')}&client_secret=${config.get('gitHubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
    }
        request(options,(err,res,body)=>{
            if(err) console.log(err);
            if(res.statusCode!== 200) {
                res.status(404).send("No github profile found")
            }
            else{
                res.status(200).send(JSON.parse(body));
            }
        })
            
        } catch (error) {
            console.log(error);
            res.status(500).send("Github Server Error")
        }
    }
}