const { con } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const CreateAdmin = async (req, res) => {
  console.log("Route hit");
  const { name, email, phone, password, gender, image } = req.body;
  if (!name || !email || !phone || !password || !gender || !image) {
    return res.status(500).json({ msg: "Fields are required" });
  }
  const qry = "SELECT * FROM admin WHERE email=?";
  con.query(qry, [email], async (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      return res.status(500).json({ msg: "user already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = [name, email, phone, hashPassword, gender, image];

    const sql =
      "INSERT INTO admin(name, email, phone, password, gender,image) VALUES (?)";

    con.query(sql, [user], (err, data) => {
      if (err) throw err;
      else {
        return res.json({ msg: "User Created successfully" });
      }
    });
  });
};

const LoginAdmin = async (req, res) => {
  console.log("Rout hit");
  const { email, password } = req.body;

  const sql = "SELECT * FROM admin WHERE email=? ";

  con.query(sql, [email], async (err, data) => {
    if (err) throw err;
    if (data < 0) {
      return res.json({ msg: "user not found!!!", data });
    }
    const user = data[0];
    // console.log(user)

    if (password) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) throw err;
        if (result) {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res.json({ msg: "user login successfuly", token, user });
        } else {
          return res.json({ msg: "invalid user" });
        }
      });
      // const match = await bcrypt.compare(password, user.password);
      // if (!match) {
      //   res.status(400).json({ msg: "try to login with correct password" });
      // }
    }
  });
};

const ForgotPassword = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and new password are required" });
  }

  const sql = "SELECT * FROM admin WHERE email=?";
  con.query(sql, [email], async (err, data) => {
    if (err) throw err;

    if (data.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateSql = "UPDATE admin SET password=? WHERE email=?";
    con.query(updateSql, [hashedPassword, email], (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Failed to update password" });
      } else {
        return res.json({ msg: "Password reset successfully" });
      }
    });
  });
};

const FetchAdminById = (req, res) => {
  const userId = req.params.userId;
  const qry = "SELECT * FROM `admin` WHERE id = ?";
  con.query(qry, [userId], (error, data) => {
    if (error) {
      return res.json({ msg: "error in fetching", error });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.json({ msg: "user not found" });
    }
  });
};

module.exports = {
  CreateAdmin,
  LoginAdmin,
  ForgotPassword,
  FetchAdminById,
};
