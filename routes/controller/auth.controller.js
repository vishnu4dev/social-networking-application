const  Bcrypt  = require('bcryptjs');
const UserModel  = require('../../model/User.model');
import config from 'config';
import jwt from 'jsonwebtoken';

export default class AuthController {
    constructor(){}
    async login(req, res,next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({email});
            if(!user) throw "Invalid credentials"
            else {
                const isMatch = await Bcrypt.compare(password, user.password)
                if (isMatch) {
                    const payload ={
                        id: user.id,
                    }
                    jwt.sign(payload,config.get('jwtCode'),{expiresIn:36000},(err,token)=>{
                        if(err) res.status(400).send("Failed to encrpyt user");
                        return res.status(200).send({token})
                    }) 
                }
               else return res.status(401).send("Incorrect credentials");
                // return res.status(200).send("Successfully logged In");
            }
        } catch (error) {
            console.log(" Error in user Sign-in",error)
            return res.status(400).send(error);
        }
    }
}

