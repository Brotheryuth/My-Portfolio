const mongoose = require('mongoose')
const educationSchema = new mongoose.Schema({
    institution:{
        type:String,
        required:[true,'School/University name is required'],
        trim:true
    },
    level:{
        type:String ,
        required:[true , 'Education level is required'],
        enum:['Primary School' , 'Secondary School', 'High School','University' , 'Other'],
        trim:true
    },
    degree:{
        type:String,
        default:'', // optional 
        trim:true
    },
    fieldOfStudy:{
        type:String,
        default: '',
        trim:true
    },
    startDate:{
        type:String,
        required:[true, 'Start date is required'],
    },
    endDate:{
        type:String,
        required:[true, 'End date is required']
    },
    description:{
        type:String ,
        default:'',
        trim:true
    }
})
const education = mongoose.model('Education', educationSchema );
module.exports = education;