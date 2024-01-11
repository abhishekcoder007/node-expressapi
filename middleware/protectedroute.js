var jwt=require("jsonwebtoken");
  //to verify the teacher login

 const teacherVerify=(req,res,next)=>{
   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
     let jwtSecretKey = process.env.JWT_SECRET_KEY;
     let token=req.header(tokenHeaderKey);
     const result=jwt.verify(token,jwtSecretKey);
       console.log(result);
     if(result){

      next();
    }else{
      res.send("only teacher can use this url")
     }
 };

 const studentVerify=(req,res,next)=>{
try{
  let jwtSecretKey = process.env.JWT_SECRET_STUDENT_KEY;
  let tokenHeaderKey = process.env.TOKEN_HEADER_STUDENT_KEY ;

  let token=req.header(tokenHeaderKey);
  const result=jwt.verify(token,jwtSecretKey);
  if(result){
    req.studProfileData=result
    next();
  }else{
    res.send("only student can use this url")
   }
  }catch(err){
    res.send(err)
  }
 }


 module.exports={teacherVerify,studentVerify};