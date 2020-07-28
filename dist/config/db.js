'use strict';

/**MongoDb connection file */
var Config = require('config');
var mongoose = require('mongoose');

var db = Config.get('mongoURI');

var connectDB = async function connectDB() {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true });
        console.log("Mongodb connected ...");
    } catch (error) {
        console.log("Error in db connection");
        process.exit(1);
    }
};

module.exports = connectDB;