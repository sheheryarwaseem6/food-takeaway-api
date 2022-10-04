const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({

    user_name :{
        type : String
    },
    user_email : {
        type: String
    },
    user_password:{
        type: String        
    },

    profilePicture:{
        type: String,
        default: null
    },
    number:{
        type: Number
    },
    code: {
        type: Number,
        default: null
    },
    verified: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    },
    user_authentication:{   
        type: String,
        default: null
    },
    user_social_token :{
        type : String,
        default: null
    },
    user_social_type:{
        type : String,
        default: null
    },
    user_device_type:{
        type : String,
        default: null
    },
    user_device_token:{
        type : String,
        default: null
    }
},
{timestamps : true})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_KEY);
    // user.user_authentication = token;
    await user.save();
    //console.log("tokeeen--->", token);
    return token;
}


const User = mongoose.model('User', userSchema)

module.exports = User