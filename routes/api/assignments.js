const express = require("express");
const router = express.Router();
const AssignmentCtrl = require('../../controllers/assignment_ctrl');

router.post("/newAssignment", AssignmentCtrl.newAssignment);
router.post("/setAssignment", AssignmentCtrl.setAssignment);
router.post("/submitAssignment", AssignmentCtrl.submitAssignment);
router.get('/getClassroomAssignments/:class_name', AssignmentCtrl.getClassroomAssignments);
router.get('/getStudentAssignments/:student_username', AssignmentCtrl.getStudentAssignments);
router.get('/getAssignments/:teacher_username', AssignmentCtrl.getAssignments);
router.get('/getAssignment', AssignmentCtrl.getAssignment);
router.get('/getStudentAssignment/:assignment_name', AssignmentCtrl.getStudentAssignment);

module.exports = router;