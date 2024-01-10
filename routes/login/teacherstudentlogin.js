var express=require("express");
var router=express.Router();
var stud=require("../../middleware/student.js");
var {con}=require("../../db/connectionserver.js")
const jwt = require ('jsonwebtoken');

let islogin=false;

router.post("/teach",async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    let sql="SELECT * FROM teachers WHERE username = ? AND password = ?"
    await con.query(sql,[username,password], function (err, result) {
        if (err) throw err;
        console.log(result);
      
        if(result.length>0){
          // islogin=true;
          // res.send(result);
          let jwtsecretkey=process.env.JWT_SECRET_KEY;
          let data={
              userId:username,
              password:password
          }
              const token=jwt.sign(data,jwtsecretkey)
              console.log(token);
              res.send(token);
        }else{
          res.send("user not exist");
        }
       
      });
     console.log(islogin);
      

});



router.post("/stud",(req,res)=>{
  const username=req.body.username
  const password=req.body.password
  let sql="SELECT * FROM students WHERE username = ? AND password = ?";
 
  con.query(sql,[username,password], function (err, result) {
      if (err) throw err;
      console.log(result);
    
      if(result.length>0){
        let jwtsecretkey=process.env.JWT_SECRET_STUDENT_KEY;
        let data={
              userId:username,
              password:password
        }
            const token=jwt.sign(data,jwtsecretkey)
            console.log(token);
            res.send(token);
      }else{
        res.send("user not exist");
      }

     
     
    });
   

})



router.patch("/update/:id",(req,res)=>{

  const id=req.params.id
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let token=req.header(tokenHeaderKey);
    const result=jwt.verify(token,jwtSecretKey);
      console.log(result);
    if(result){
      let sql= "UPDATE students SET ? WHERE id=?";
      con.query(sql,[req.body,id],(err,result)=>{
        if(err){
          res.send(err);
        }else{
          res.send(result);
        }
      })

    }
})


module.exports={router}