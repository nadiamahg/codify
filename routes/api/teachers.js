const express = require("express");
const router = express.Router();
const TeacherCtrl = require('../../controllers/teacher_ctrl');

// @route POST api/teachers/register
// @desc Register teacher
// @access Public
router.post("/register", TeacherCtrl.registerTeacher);

// @route POST api/teachers/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", TeacherCtrl.loginTeacher);

module.exports = router;