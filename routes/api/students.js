const express = require("express");
const router = express.Router();
const StudentCtrl = require('../../controllers/student_ctrl');

router.post("/register", StudentCtrl.registerStudent);
router.get("/getClassName", StudentCtrl.getStudentClassName);
router.post("/login", StudentCtrl.loginStudent);

module.exports = router;