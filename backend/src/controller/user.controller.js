im
const user = require('../model/User')
const user = require('../model/User')

/**
 * 
* @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getAllInfo= async(req ,res) =>{
    try{
        const userinfo =await user.find();
        res.status(200).json({'Message':'Get all information' , 'user information':userinfo})
    }catch(e){
        res.status(401).json({messagge:e.Message});

    }
}
