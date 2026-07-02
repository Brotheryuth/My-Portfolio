const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:[true,'User name is required'],
        trim:true,   
    },
    userTitle:{
        type:String,
        require:[true,'User title is required'],
        trim:true
    },
    bio:{
        type:String,
        trim:true,
    },
    userMajor:{
        type:[String],
        require:[true,'Major is required'],
        trim:true,
        default: []
    },
    userEmail:{
        type:String,
        require:[true,'Email is required'],
        trim:true
    },
    userPhoneNumber:{
        type:String,
        require:[true,'Phone number is required']
    },
    aboutMe:{
        type:String,
        requie:[true,'Information about you is required'],
        trim:true
    },
    gitHubUrl:{
        type:String,
        require:[true,'Github link is required']
    },
    avatarUrl:{
        type:String,
        require:[true,'avatar url is required']
    },

    createAt:{
        type:Date,
        default:Date.now
    }
})
const  user = mongoose.model('UserSchema', userSchema);
module.exports = user;