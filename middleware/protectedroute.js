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

 const principalVerify=(req,res,next)=>{
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let token=req.header(tokenHeaderKey);
    const result=jwt.verify(token,jwtSecretKey);
      console.log(result);
    if(result.user_type=="principal"){

     next();
   }else{
     res.send("only teacher can use this url")
    }
};

 //to verify the student through token (authenticate)

 const studentVerify=(req,res,next)=>{

try{
  
  let jwtSecretKey = process.env.JWT_SECRET_STUDENT_KEY;
  let tokenHeaderKey = process.env.TOKEN_HEADER_STUDENT_KEY ;

  let token=req.header(tokenHeaderKey);
  const result=jwt.verify(token,jwtSecretKey);
  console.log({"resname":result})
  if(result){
    req.studProfileData=result
    next();
  }
  
  }catch(err){
    res.send({"errname":err})
  }
 }


 module.exports={teacherVerify,studentVerify,principalVerify};