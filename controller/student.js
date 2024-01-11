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
    if(req.body&&data){
    let sql= "UPDATE students SET ? WHERE username=? AND password=?";
    con.query(sql,[req.body,data.userId,data.password],(err,result)=>{
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    })
}else{
    res.send("pls check update data")
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





      module.exports={updateStudent,studentLogin,profileStudent,profileUpdateStudent};