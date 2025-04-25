const { con } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const {
 
  SendMailVerifyEmail,
} = require("../mail/app-mailer");

const CreateAdmin = async (req, res) => {
  console.log("Route hit");
  const { name, email, phone, password, gender, image } = req.body;
 
  const validName = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/;


  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ValidPassword = (password) => {
    if (password.length < 8) return "password must be 8 character ";
    if (!/[A-Z]/.test(password)) return "password must have uppercase ";
    if (!/[a-z]/.test(password)) return "password must have lowercase ";
    if (!/[0-9]/.test(password)) return "password must have Numbers";
    if (!/[@#$%^&*(),.?":{}|<>]/.test(password))
      return "passsword must have special character";
    return null;
  };

  if (!name || !email || !phone || !password || !gender || !image) {
    return res.json({ msg: "Fields are required" });
  }
  if (!validName.test(name)) {
    return res.json({ msg: "Name must only contain letters and spaces" });
  }
  if (!validEmail.test(email)) {
    return res.json({ msg: "Invalid email format" });
  }
  const passwordError = ValidPassword(password);
  if (passwordError) {
    return res.json({ msg: passwordError });
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
      if (err) {
        return res.json({ msg: "error in User Creating" });
      

      }else {
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
const SendCodeAdmin=async(req,res)=>{

 const {email}=req.body.editData;
  // console.log(req.body)
  const code = await SendMailVerifyEmail(email);
      console.log(code);
      if (code < 0) {
        return res.json({ msg: "cannot generate code" });
      }else{
      const sql = "INSERT INTO `verify`(email ,code) VALUES(? , ?)";
      con.query(sql, [email, code], (err, data) => {
        console.log(email, "email ha ye");
        if (err) throw err;
        return res.json({ msg: "code send to your email"});

        
      });
}
}
const verifyUpdateProfile=(req,res)=>{
   const { userId } = req.params;
  const { name, email, phone, gender, image, code} = req.body;
  let checkCode = parseInt(code)

  console.log(req.body)
  
  const sql1 = "SELECT * FROM `verify` WHERE `email` = ?";
  con.query(sql1, [email, code], (err, data) => {
    if(err){
      return res.json(err);
    }else{
      console.log(data[0].code)
      if(data[0].code !== checkCode){
        return res.json({msg: "Invalid Verifcation Code!!!"})
      }else{
        const sql2 = "UPDATE `admin` SET name= ?, email= ?, phone= ?, gender= ? , image= ? WHERE id = ?";
        con.query(sql2, [name, email, phone, gender, image, userId], (err, result) => {
          if(err){
            return res.json(err);
          }else{
            const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);
            return res.json({msg: "Profile Updated Successfuly", token})
          }
        })
      }
    }
  })

   // return res.json({ msg: "Invalid Verifcation Code!!!" });
}
const GetAdminProfile=async(req,res)=>{
   const { userId } = req.params;
  
   const sql = "SELECT image FROM `admin`  WHERE  id = ?  ";

  con.query(sql, [userId], (err, data) => {
    if (err) throw err;
    console.log(err)

    return res.json(data[0].image);
  });


}

module.exports = {
  CreateAdmin,
  LoginAdmin,
  ForgotPassword,
  FetchAdminById,
  SendCodeAdmin,
  verifyUpdateProfile,
  GetAdminProfile,
}
