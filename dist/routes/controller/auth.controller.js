
var Bcrypt = require('bcryptjs');
var UserModel = require('../../model/User.model');


export default class AuthController{

 async Login(req, res){
            try {
                const {email,password} = req.body;
                var user = await UserModel.findOne({ email});
                if (!user) throw "Invalid credentials";else {
                    var isMatch = await Bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return res.status(401).send("Incorrect credentials");
                    }
                    return res.status(200).send("Successfully logged In");
                }
            } catch (error) {
                console.log(" Error in user Sign-in");
                return res.status(400).send(error);
            }
        }
}

