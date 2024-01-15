var express = require("express");
var router = express.Router();
var stud = require("../../middleware/student.js");
var { con } = require("../../db/connectionserver.js");
var verify = require("../../middleware/teacher.js");
var student = require("../../controller/student.js");
var teacher = require("../../controller/teacher.js");
const jwt = require("jsonwebtoken");

//teacher login
router.post("/teach", teacher.teacherLogin);

//student login
router.post("/stud", student.studentLogin);

// secure routing or protected routing for teacher and update users
router.put(
  "/stud/update/:id",
  verify.teacherVerify,
  verify.principalVerify,
  student.updateStudent
);
// secure routing or protected routing for teacher and update student
router.put(
  "/stud/marksupdate/:id",
  verify.teacherVerify,
  student.updateStudentMarks
);

//secure routing for student ,only to get profile detail
// router.get("/stud/profile",student.profileStudent);

//edit profile only by student itselfy only name username and password he /she can changed
router.put(
  "/stud/profileupdate",
  stud.studentVerify,
  student.profileUpdateStudent
);

// secure routing or protected routing for teacher
router.put("/stud/update/:id", verify.teacherVerify, student.updateStudent);

//secure routing for student ,only to get profile detail && marks details
router.get("/stud/detail", stud.studentVerify, student.studentDetails);

module.exports = { router };
