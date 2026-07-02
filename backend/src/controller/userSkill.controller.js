const userSkill = require('../model/user-skill')

/**
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 */
const getAllSkill = async (req, res) => {
  try {
    const getAll = await userSkill.find();
    res.status(200).json({ message: 'Load successful', skill:getAll});
  } catch (e) {
    res.status(400).json({message:e.message})
  }
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { _id, ...updateinfo } = req.body;
  try {
    const newInfo = await userSkill.findByIdAndUpdate(id, updateinfo, { new: true, isValidator: true });
    
    if (!newInfo) {
      return res.status(404).json({message:'Skill not found'})
    }
    
    res.status(201).json({ message: 'Update successful', skill: newInfo });
    
  } catch (e) {
    res.status(400).json({message:e.message})
  }
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteSkill = async (req, res)=>{
  const { id } = req.params;
  try {
    const deletedskill = await userSkill.findByIdAndDelete(id);
    if (!deletedskill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json({ message: 'Skill deleted successful', deleteSkill: deletedskill });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
module.exports = {
  getAllSkill,updateSkill, deleteSkill
}