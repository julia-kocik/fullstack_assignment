const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV;

//should be in .gitignore 
const dbUri = process.env.MONGO_URI


const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }

}

module.exports = connectDB;