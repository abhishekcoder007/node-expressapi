const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var { con } = require("../db/connectionserver.js");

const teacherLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let sql = "SELECT * FROM users WHERE username = ?";
  await con.query(sql, [username, password], function (err, result) {
    if (err) throw err;
    console.log(result);

    if (result.length > 0) {
      console.log(result[0].password);
      const isvalid = async () => {
        let isValidPassword = await bcrypt.compare(
          password,
          result[0].password
        );
        console.log(isValidPassword);
        if (isValidPassword == true) {
          let jwtsecretkey = process.env.JWT_SECRET_KEY;
          let data = {
            userId: username,
            password: password,
            user_type: "teacher",
          };
          const token = jwt.sign(data, jwtsecretkey);
          console.log(token);
          res.send(token);
        } else {
          res.send("user password not match");
        }
      };
      isvalid();
    } else {
      res.send("user not exist");
    }
  });
};

module.exports = { teacherLogin };
