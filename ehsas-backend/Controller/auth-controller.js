const { con } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const CreateUser = async (req, res) => {
  console.log("Route hit");
  const { name, email, phone, password, address, gender, image } = req.body;
  console.log("req body", req.body);

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !address ||
    !gender ||
    !image
  ) {
    return res.status(500).json({ msg: "Fields are required" });
  }
  const qry = "SELECT * FROM users WHERE email=?";

  con.query(qry, [email], async (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      return res.status(500).json({ msg: "user already exist", data });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = [name, email, phone, hashPassword, address, gender, image];

    const sql =
      "INSERT INTO users(name, email, phone, password, address, gender,image) VALUES (?)";

    con.query(sql, [user], (err, data) => {
      if (err) throw err;

      return res.json({ msg: "User Created successfully", data });
    });
  });
};
const LoginUser = async (req, res) => {
  console.log("Rout hit");
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  con.query(sql, [email], async (err, data) => {
    if (err) throw err;
    if (data < 0) {
      return res.json({ msg: "user not found!!!", data });
    }
    const user = data[0];
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).json({ msg: "try to login with correct password" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({ msg: "user login successfuly", token });
    } catch (error) {
        console.error("Password comparison error:", error);
        return res.status(500).json({ msg: "An error occurred during login. " });
    }
  });
};

const FetchUser=async(req,res)=>{
    console.log("fetchuser")
    const sql="SELECT * FROM `users` "
     con.query(sql,(err,data)=>{
        if (err) {
            console.log("error",err)
            return res.status.json({msg: "error in fetching",err})
            
        }
        return res.json({msg:"blog fetch",data})

    })


}

module.exports = {
  CreateUser,
  LoginUser,
  FetchUser
};
