var mysql = require('mysql');
// function connectiondb(){
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

  });


module.exports={con}