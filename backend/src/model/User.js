const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'User name is required'],
        trim:true,   
    },
    userTitle:{
        type:String,
        required:[true,'User title is required'],
        trim:true
    },
    bio:{
        type:String,
        trim:true,
    },
    userMajor:{
        type:[String],
        required:[true,'Major is required'],
        trim:true,
        default: []
    },
    userEmail:{
        type:String,
        required:[true,'Email is required'],
        trim:true
    },
    userPhoneNumber:{
        type:String,
        required:[true,'Phone number is required']
    },
    aboutMe:{
        type:String,
        required:[true,'Information about you is required'],
        trim:true
    },
    gitHubUrl:{
        type:String,
        required:[true,'Github link is required']
    },
    avatarUrl:{
        type:String,
        required:[true,'avatar url is required']
    },

    createAt:{
        type:Date,
        default:Date.now
    }
})
const user = mongoose.model('User', userSchema);
module.exports = user;