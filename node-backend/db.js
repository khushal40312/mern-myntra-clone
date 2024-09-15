const mongoose = require('mongoose');
require('dotenv').config();

const mongooseURI = process.env.MONGO_URI;
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongooseURI, {
            
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToMongo;