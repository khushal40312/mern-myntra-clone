const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
// user:{
// type:mongoose.Schema.Types.ObjectId,
// ref:'user'


// },
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
picture: {
    type: String,
    required: false // Set to true if you want it to be required
},
gender: {
    type: String,
    required: false // Set to true if you want it to be required
},
mobile: {
    type: String,
    required: false // Set to true if you want it to be required
},
date: {
    type: Date,
    default: Date.now
}
});
const User = mongoose.model('user',UserSchema);  
module.exports = User