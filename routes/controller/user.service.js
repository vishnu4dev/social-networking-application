


export default class User {
    constructor(){}
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
    
}