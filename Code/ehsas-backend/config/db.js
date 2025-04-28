const mysql = require("mysql");
const dotenv = require("dotenv").config();

let con = mysql.createConnection({
  //   host:process.env.HOST,
  //   user:process.env.USER,
  //   password:process.env.PASS,
  //   database:process.env.DATABASE

  host: "localhost",
  user: "root",
  password: "",
  database: "ehsashub",
});
function databaseConnect() {
  con.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Connected");
    }
  });
}

module.exports = {
  databaseConnect,
  con,
};
