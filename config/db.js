const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = process.env.MONGO_URI;
// else dbUri = 'mongodb://localhost:27017/fullstack_assignment';
else dbUri = process.env.MONGO_URI


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