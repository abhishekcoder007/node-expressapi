var express=require("express");
var router=express.Router();
var stud=require("../../middleware/student.js");
var {con}=require("../../db/connectionserver.js")
var verify=require("../../middleware/protectedroute.js")
var student=require("../../controller/student.js");
var teacher=require("../../controller/teacher.js");
const jwt = require ('jsonwebtoken');

let islogin=false;
//teacher login
router.post("/teach",teacher.teacherLogin);

//student login
router.post("/stud",student.studentLogin)

// secure routing or protected routing for teacher and update student
router.put("/stud/update/:id",verify.teacherVerify,student.updateStudent)

//secure routing for student ,only to get profile detail
router.get("/stud/profile",student.profileStudent);

//edit profile only by student itselfy
router.put("/stud/profileupdate",verify.studentVerify,student.profileUpdateStudent);

// secure routing or protected routing for teacher
router.put("/stud/update/:id",verify.teacherVerify,student.updateStudent)


module.exports={router}



// router.patch("/update/:id",(req,res)=>{

//   const id=req.params.id
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let token=req.header(tokenHeaderKey);
//     const result=jwt.verify(token,jwtSecretKey);
//       console.log(result);
//     if(result){
//       let sql= "UPDATE students SET ? WHERE id=?";
//       con.query(sql,[req.body,id],(err,result)=>{
//         if(err){
//           res.send(err);
//         }else{
//           res.send(result);
//         }
//       })

//     }
// })








