const mongeese = require('mongoose')
const userSkillSchema = new mongeese.Schema({
  name:{type:String , require:[true,'Skill name is required'], trim:true }, 
  skillLevel :{type:Number, require:[true,'skill level is required'] , min : 0 , max : 100},
  category:{ type:String , require:[true , 'skill category is required '] , enum:[frontend, backend, Database , tool]},
})
const userSkill = mongeese.model('UserSkillSchema',userSkillSchema);
module.exports = userSkill;