const express = require('express')
const router = express.Router();
const userSkillController = require('../controller/userSkill.controller')
const verifyAdmin = require('../middleware/auth.middleware');

router.get('/', userSkillController.getAllSkill);
router.post('/', verifyAdmin, userSkillController.createSkill);
router.put("/:id", verifyAdmin, userSkillController.updateSkill);
router.delete("/:id", verifyAdmin, userSkillController.deleteSkill);
module.exports = router;