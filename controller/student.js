var { con } = require("../db/connectionserver.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const studentLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let sql = "SELECT * FROM users WHERE username = ?";

  con.query(sql, [username, password], function (err, result) {
    if (err) throw err;
    console.log(result);

    if (result.length > 0) {
      const isValid = async () => {
        const isValidPassword = await bcrypt.compare(
          password,
          result[0].password
        );
        if (isValidPassword) {
          let jwtsecretkey = process.env.JWT_SECRET_STUDENT_KEY;
          let data = {
            userId: username,
            password: password,
            user_type: "student",
          };
          const token = jwt.sign(data, jwtsecretkey);
          console.log(token);
          res.send(token);
        } else {
          res.send("user password is not exist");
        }
      };
      isValid();
    } else {
      res.send("user not exist");
    }
  });
};

// const profileStudent=(req,res)=>{
//     const jwtsecretkey=process.env.JWT_SECRET_STUDENT_KEY;
//     const tokenHeaderKey=process.env.TOKEN_HEADER_STUDENT_KEY
//     const token=req.header(tokenHeaderKey);
//     jwt.verify(token,jwtsecretkey,(err,decode)=>{
//         if(err){
//             console.log(err)
//             res.send(err)
//         }else{
//             console.log(decode)
//             const username=decode.userId;
//             const password=decode.password
//             let sql="SELECT * FROM students WHERE username=? AND password=?"
//             con.query(sql,[username,password],(err,result)=>{
//                 if(err){
//                     res.send(err);
//                 }else{
//                     res.send(result);
//                 }
//             })
//             res.send(decode)
//         }
//     })
// }

const profileUpdateStudent = (req, res) => {
  let data = req.studProfileData;
  let changeName = req.body.name;
  let changeUsername = req.body.username;
  let changePassword = req.body.password;
  let changeClass = req.body.class;
  let changeRoll = req.body.roll;
  if (
    !changeClass &&
    !changeRoll &&
    data &&
    ((changeName && changeName != "") ||
      (changeUsername && changeUsername != "") ||
      (changePassword && changePassword != ""))
  ) {
    let sql = "UPDATE users SET ? WHERE username=?";
    con.query(sql, [req.body, data.userId], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send(
      "pls check update data && data should not empty && you can't update roll ans class"
    );
  }
};

const updateStudent = (req, res) => {
  const id = req.params.id;
  let sql = "UPDATE users SET ? WHERE id=?";
  con.query(sql, [req.body, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
const updateStudentMarks = (req, res) => {
  const id = req.params.id;
  let sql = "UPDATE student_details SET ? WHERE id=?";
  con.query(sql, [req.body, id], (err, result) => {
    if (err) {
      res.send({ error: err });
    } else {
      if (result.affectedRows == 0) {
        res.send("Roll number not found");
        return;
      } else {
        res.send({ result: result });
      }
      // res.send({"result":result});
    }
  });
};

const studentDetails = (req, res) => {
  let data = req.studProfileData;
  console.log({ reqdata: data });
  if (data) {
    let sql =
      "SELECT users.name, student_details.maths, student_details.physics, student_details.chemistry FROM users INNER JOIN student_details ON users.id = student_details.id WHERE users.username=?";

    con.query(sql, [data.userId, data.password], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ RESULT: result });
      }
    });
  } else {
    res.send("first login then check your profile and data");
  }
};

module.exports = {
  updateStudent,
  studentLogin,
  profileUpdateStudent,
  updateStudentMarks,
  studentDetails,
};
