const express = require("express");
const router = express.Router();
const AssignmentCtrl = require('../../controllers/assignment_ctrl');

router.post("/newAssignment", AssignmentCtrl.newAssignment);

module.exports = router;