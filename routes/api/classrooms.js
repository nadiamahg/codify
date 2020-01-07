const express = require("express");
const router = express.Router();
const ClassroomCtrl = require('../../controllers/classroom_ctrl');

router.post("/newClassroom", ClassroomCtrl.newClassroom);
router.get('/getClassrooms/:teacher_username', ClassroomCtrl.getClassrooms);
router.delete('/deleteClassroom/:class_name/:class_code', ClassroomCtrl.deleteClassroom)

module.exports = router;