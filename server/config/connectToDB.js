
const mongoose = require("mongoose");

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_CLOUD_URI);
        console.log("MongoDB Connected Successfully ^_^")
    } 
    catch (error) {
       console.log("Connection Failed to MongoDB!" , error) 
    }
}







module.exports = connectToDB;