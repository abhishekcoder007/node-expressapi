var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var stud = require("../../middleware/student.js");
var { con } = require("../../db/connectionserver.js");

//teacher registration

router.post("/teach", (req, res) => {
  const data = req.body;
  // bcrypt.hash(req.body.password,10,(err,encodedPassword)=>{
  if (
    data.name &&
    data.username &&
    data.password &&
    data.user_type &&
    data.user_type == "teacher" &&
    data.about
  ) {
    bcrypt.hash(req.body.password, 10, (err, encodedPassword) => {
      if (err) {
        throw err;
      } else {
        let sql =
          "INSERT INTO users (name,username,password,user_type,about) VALUES (?,?,?,?,?)";

        con.query(
          sql,
          [
            data.name,
            data.username,
            encodedPassword,
            data.user_type,
            data.about,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              console.log(result);
              res.send(result);
            }
          }
        );
      }
    });
  } else {
    res.send(
      "check name &&username && password && user_type='teacher' && about"
    );
  }
});
// });

// student registration
router.post("/stud", stud.reg, (req, res) => {
  const data = req.body;

  if (
    data.name &&
    data.username &&
    data.password &&
    data.user_type &&
    data.user_type == "student" &&
    data.about
  ) {
    bcrypt.hash(req.body.password, 10, (err, encodedPassword) => {
      var insdata = [
        data.name,
        data.username,
        encodedPassword,
        data.user_type,
        data.about,
      ];
      if (err) {
        throw err;
      } else {
        let sql =
          "INSERT INTO users (name,username,password,user_type,about) VALUES (?,?,?,?,?)";
        con.query(sql, insdata, function (err, result) {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          } else {
            console.log("1 record inserted");
            res.send("inserted");
          }
        });
      }
    });
  } else {
    res.send(
      "check name &&username && password && user_type='student' && about"
    );
  }
});

module.exports = { router };
