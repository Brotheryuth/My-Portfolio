const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const verifyAdmin = require('../middleware/auth.middleware');

router.get("/", userController.getAllInfo);
router.post('/', verifyAdmin, userController.createUser);
router.put("/:id", verifyAdmin, userController.updateUserInfo);
router.delete("/:id", verifyAdmin, userController.deleteUser);
router.get("/:id", userController.getByID);
module.exports = router;