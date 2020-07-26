/**MongoDb connection file */
const Config = require('config');
const mongoose = require('mongoose');

const db = Config.get('mongoURI')

const connectDB = async()=>{
    try {
        await mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true });
        console.log("Mongodb connected ...")
    } catch (error) {
        console.log("Error in db connection");
        process.exit(1);
    }
}

module.exports = connectDB;