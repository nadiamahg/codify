const express = require("express");
const router = express.Router();
const ClassroomCtrl = require('../../controllers/classroom_ctrl');

router.post("/newClassroom", ClassroomCtrl.newClassroom);
router.get('/classrooms/:teacher_username', ClassroomCtrl.getClassrooms);

module.exports = router;