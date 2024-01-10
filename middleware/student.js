

const reg=(req,res,next)=>{
   
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if(req.body.name==""||req.body.name==null){
        res.send("name should not empty")
    }else if(!regName.test(req.body.name)){
        res.send('Please enter your full name (first & last name).');
       
    }else if(req.body.roll=="" && req.body.class==""){
        res.send("pls enter roll &&class ");
    }else if(req.body.username==""){
        res.send("pls enter username");
    }else if(req.body.password==""){
        res.send("pls enter password");
    }else{
        next();
    }

}

module.exports={reg};