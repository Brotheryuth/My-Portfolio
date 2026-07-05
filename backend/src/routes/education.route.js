const express = require("express");
const router = express.Router();
const educationController = require("../controller/education.controller");
const verifyAdmin = require("../middleware/auth.middleware");

router.get("/", educationController.getAllEducation);
router.post("/", verifyAdmin, educationController.createEducation);
router.put("/:id", verifyAdmin, educationController.updateEducation);
router.delete("/:id", verifyAdmin, educationController.deleteEducation);
module.exports = router;
