var express=require("express");
const dotenv = require('dotenv');
// var stu=require("./routes/students.js");
var regrouter=require("./routes/registration/teachers.js");
// var teach=require("./routes/teachers.js");
var loginrouter=require("./routes/login/teacherstudentlogin.js");
require("./db/connectionserver.js")
var app=express();
dotenv.config();
let port=process.env.PORT || 8080

app.use(express.json());

//  app.use("/student",stu.router)
//  app.use("/teacher",teach.router)
 app.use("/regis",regrouter.router)
 app.use("/login",loginrouter.router)
// connectiondb();
app.get("/",(req,res)=>{
    res.send("hello world");
})
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`${port} server started`)
    }
})
