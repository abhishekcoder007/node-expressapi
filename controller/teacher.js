
const jwt = require ('jsonwebtoken');
var {con}=require("../db/connectionserver.js");


const teacherLogin=(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    let sql="SELECT * FROM teachers WHERE username = ? AND password = ?"
     con.query(sql,[username,password], function (err, result) {
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
     
      

}

module.exports={teacherLogin}