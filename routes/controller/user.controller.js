
import UserModel from '../../model/User.model';
import UserProfileModel from '../../model/Profile.model';
const { check, validationResult } = require('express-validator');


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
            res.status(500).send(errro.message)
        }
    }
}