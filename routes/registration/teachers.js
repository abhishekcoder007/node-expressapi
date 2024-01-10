var express=require("express");
var router=express.Router();
var stud=require("../../middleware/student.js");
var {con}=require("../../db/connectionserver.js")

//teacher registration

router.post("/teach",(req,res)=>{
const data=req.body

if(data.name && data.username && data.password && data.about){
let sql="INSERT INTO teachers (name,username,password,about) VALUES (?,?,?,?)";

con.query(sql,[data.name,data.username,data.password,data.about],(err,result)=>{
    if(err){
       console.log(err);
       res.send(err);
    }else{
        console.log(result);
        res.send(result);
        
    }
})
}
});


// student registration
router.post("/stud",stud.reg,(req,res)=>{
   const data=req.body;
   const insdata=[data.name,data.roll,data.class,data.username,data.password];

   if(data.name && data.roll && data.class && data.username && data.password){
   
   var sql = "INSERT INTO students (name,roll,class,username,password) VALUES (?,?,?,?,?)";
   con.query(sql,insdata, function (err, result) {
     if (err) {
        console.log(err);
        res.send(err);
        return
    };
     console.log("1 record inserted");
     res.send("inserted")
   })
}else{
    res.send("check all input field(name,roll,class,username,password)")
}
})

module.exports={router};

