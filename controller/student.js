var {con}=require("../db/connectionserver.js")
const jwt = require ('jsonwebtoken');

const studentLogin=(req,res)=>{
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
};
  
       
const profileStudent=(req,res)=>{
    const jwtsecretkey=process.env.JWT_SECRET_STUDENT_KEY;
    const tokenHeaderKey=process.env.TOKEN_HEADER_STUDENT_KEY
    const token=req.header(tokenHeaderKey);
    jwt.verify(token,jwtsecretkey,(err,decode)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(decode)
            const username=decode.userId;
            const password=decode.password
            let sql="SELECT * FROM students WHERE username=? AND password=?"
            con.query(sql,[username,password],(err,result)=>{
                if(err){
                    res.send(err);
                }else{
                    res.send(result);
                }
            })
            // res.send(decode)
        }
    })
}      
const profileUpdateStudent=(req,res)=>{
    let data=req.studProfileData;
    let changeName=req.body.name
    let changeUsername=req.body.username
    let changePassword=req.body.password
    let changeClass = req.body.class;
    let changeRoll=req.body.roll
    if(!changeClass&&!changeRoll&&data&&((changeName&&changeName!="")||(changeUsername&&changeUsername!="")||(changePassword&&changePassword!=""))){
    let sql= "UPDATE students SET ? WHERE username=? AND password=?";
    con.query(sql,[req.body,data.userId,data.password],(err,result)=>{
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    })
}else{
    res.send("pls check update data && data should not empty && you can't update roll ans class")
}
}

const updateStudent=(req,res)=>{
    const id=req.params.id
    let sql= "UPDATE students SET ? WHERE id=?";
        con.query(sql,[req.body,id],(err,result)=>{
          if(err){
            res.send(err);
          }else{
            res.send(result);
          }
        })
  
      };
      const updateStudentMarks=(req,res)=>{
        const id=req.params.id
        let sql= "UPDATE student_marks SET ? WHERE stu_id=?";
            con.query(sql,[req.body,id],(err,result)=>{
              if(err){
                res.send({"error":err});
              }else{
                if(result.affectedRows==0){
                  res.send("Roll number not found");
                  return
                }else{
                  res.send({"result":result});
                }
                // res.send({"result":result});
              }
            })
      
          };

          const studentDetails=(req,res)=>{
            let data=req.studProfileData;
            console.log({"reqdata":data});
            if(data){
              let sql = "SELECT students.name, students.class, student_marks.math, student_marks.physics, student_marks.chemistry FROM students INNER JOIN student_marks ON students.roll = student_marks.stu_id WHERE students.username=? AND students.password=?";
         
            con.query(sql,[data.userId,data.password],(err,result)=>{
              if(err){
                res.send(err);
              }else{
                res.send(result);
              }
            })
        }else{
            res.send("first login then check your profile and data")
        }
        }



      module.exports={updateStudent,studentLogin,profileStudent,profileUpdateStudent,updateStudentMarks,studentDetails};