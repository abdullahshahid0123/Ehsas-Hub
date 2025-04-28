const { con } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const {
  SendMailApproveUser,
  SendMailRequest,
  SendMailRejectUser,
  SendMailFreeze,
  SendMailVerifyEmail,
} = require("../mail/app-mailer");

const CreateUser = async (req, res) => {
  const { name, email, phone, password, address, genres, gender, image, code } =
    req.body;

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

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !address ||
    !gender ||
    !image ||
    !code
  ) {
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
  const qry = "SELECT * FROM users WHERE email=?";

  con.query(qry, [email], async (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      return res.json({ msg: "user already exist", data });
    }
    const sql1 = "SELECT * FROM `verify` WHERE `email` = ?";
    con.query(sql1, [email], async (err, verifydata) => {
      if (err) {
        return res.json(err);
      } else {
        if (verifydata[0].code.toString() !== code) {
          // console.log(verifydata);
          return res.json({ msg: "Invalid Verifcation Code!!!" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const user = [
            name,
            email,
            phone,
            hashPassword,
            address,
            genres,
            gender,
            image,
          ];

          console.log(user);

          const sql =
            "INSERT INTO users(name, email, phone, password, address, genres, gender,image) VALUES (?)";

          con.query(sql, [user], (err, data) => {
            if (err) {
              console.log(err);
              return res.json({ msg: " Error in User Creating" });
            } else {
              console.log(data);
              SendMailRequest(name, email);
              return res.json({ msg: "User Created successfully" });
            }
          });
        }
      }
    });
  });
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const sql = "SELECT * FROM users WHERE email=? AND status=1";

  con.query(sql, [email], async (err, data) => {
    if (err) throw err;
    if (data.length < 1) {
      return res.json({ msg: "user not found!!!", data });
    }
    const user = data[0];
    console.log(user);

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
    }
  });
};

const UserForgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  const sql = "SELECT * FROM users WHERE email=?";
  con.query(sql, [email], async (err, data) => {
    if (err) throw err;

    if (data.length === 0) {
      return res.status(404).json({ msg: "email not found" });
    }
    const code = await SendMailVerifyEmail(email);
    if (!code) {
      console.log(code);
      return res.json({ message: "code verification failed" });
    }
    const sql = "INSERT INTO verify ( email, code) VALUES (? , ?)";
    con.query(sql, [email, code], async (err) => {
      if (err) {
        return res.json({ message: "code verification failed" });
      }

      return res.json({ message: "code verification send successfully  " });
    });
  });
};

const userResetPass = (req, res) => {
  const { code, password } = req.body;
  const { email } = req.params;
  if (!email || !code || !password) {
    res.json({ message: "fields are required" });
  }
  const sql = "SELECT * FROM `verify` WHERE email = ? AND code = ? ";
  con.query(sql, [email, code], async (err, result) => {
    if (err) res.json({ message: "field not match" });
    if (result.length === 0) {
      return res.json({ message: "data not found" });
    }
    // Hash the new password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateSql = "UPDATE users SET password=? WHERE email=?";
    con.query(updateSql, [hashedPassword, email], (err) => {
      if (err) {
        return res.status(500).json({ msg: "Failed to update password" });
      }
      const del = "DELETE FROM `verify` WHERE email = ?";
      con.query(del, [email]);
      return res.json({ msg: "Password reset successfully" });
    });
  });
};

const FreezeUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "Invalid" });
  }
  //   update query for status
  const sql = "UPDATE `users` SET status=0 WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in approving user", err });
    } else {
      SendMailFreeze(name, email);
      return res.json({ msg: "Account Freezed request successfuly" });
    }
  });
};
const ApproveUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Invalid" });
  }
  //   update query for status
  const sql = "UPDATE `users` SET status=1 WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in approving user", err });
    } else {
      SendMailApproveUser(name, email);
      return res.json({ msg: "Account approved request successfuly" });
    }
  });
};
const RejectUser = (req, res) => {
  const { id } = req.params;
  const { name, email, comment } = req.body;
  console.log(req.body);
  if (!id) {
    return res.status(400).json({ msg: "user id is required" });
  }

  if (!comment) {
    return res.status(400).json({ msg: "Must add reason!!" });
  }
  const qry = "DELETE FROM `users` WHERE id=?";
  con.query(qry, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in reject user", err });
    } else {
      SendMailRejectUser(name, email, comment);
      return res.json({ msg: " request reject successfuly" });
    }
  });
};

const FetchUser = async (req, res) => {
  const qry = "SELECT * FROM `users`";
  con.query(qry, (error, data) => {
    if (error) {
      console.log("error", error);
      return res.status(404).json({ msg: "error in fetching", error });
    }
    return res.json({ msg: "fetch successfuly", data });
  });
};

const FetchUserById = (req, res) => {
  const userId = req.params.userId;
  const qry = "SELECT * FROM `users` WHERE id = ?";
  con.query(qry, [userId], (error, data) => {
    if (error) {
      return res.status(404).json({ msg: "error in fetching", error });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.status(404).json({ msg: "user not found", error });
    }
  });
};
const UpdateProfile = (req, res) => {
  const { userId } = req.params;
  const { name, email, phone, gender, image, code } = req.body;
  let checkCode = parseInt(code);

  console.log(req.body);

  const sql1 = "SELECT * FROM `verify` WHERE `email` = ?";
  con.query(sql1, [email, code], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log(data[0].code);
      if (data[0].code !== checkCode) {
        return res.json({ msg: "Invalid Verifcation Code!!!" });
      } else {
        const sql2 =
          "UPDATE `users` SET name= ?, email= ?, phone= ?, gender= ? , image= ? WHERE id = ?";
        con.query(
          sql2,
          [name, email, phone, gender, image, userId],
          (err, result) => {
            if (err) {
              return res.json(err);
            } else {
              const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);
              return res.json({ msg: "Profile Updated Successfuly", token });
            }
          }
        );
      }
    }
  });
};

const UserProfileVerify = async (req, res) => {
  const { email } = req.body.editData;
  const deleteSql = "DELETE FROM `verify` WHERE email = ?";
  con.query(deleteSql, [email], async (err) => {
    if (err) {
      return res.json({ msg: "Error clearing old code", error: err });
    }

    // Now generate and send new code
    const code = await SendMailVerifyEmail(email);
    if (code < 0) {
      return res.json({ msg: "Cannot generate code" });
    }

    const now = new Date();
    const insertSql =
      "INSERT INTO `verify` (email, code, created_at) VALUES (?, ?, ?)";
    con.query(insertSql, [email, code, now], (err) => {
      if (err) {
        return res.json({ msg: "Error saving code", error: err });
      }
      return res.json({ msg: "Code sent to your email" });
    });
  });
};
const EmailSendCode = async (req, res) => {
  const { email } = req.params;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmail.test(email)) {
    return res.json({ msg: "Invalid email format" });
  }

  const deleteSql = "DELETE FROM `verify` WHERE email = ?";
  con.query(deleteSql, [email], async (err) => {
    if (err) {
      return res.json({ msg: "Error clearing old code", error: err });
    }

    // Now generate and send new code
    const code = await SendMailVerifyEmail(email);
    if (code < 0) {
      return res.json({ msg: "Cannot generate code" });
    }
    console.log(code);

    const now = new Date();
    const insertSql =
      "INSERT INTO `verify` (email, code, created_at) VALUES (?, ?, ?)";
    con.query(insertSql, [email, code, now], (err) => {
      if (err) {
        return res.json({ msg: "Error saving code", error: err });
      }
      return res.json({ msg: "Code sent to your email" });
    });
  });
};
// const VerifyEmailCode=async(req,res)=>{
//   const { userId } = req.params;
// const { name, email, phone, gender, image, code} = req.body;
// let checkCode = parseInt(code)

// console.log(req.body)

// const sql1 = "SELECT * FROM `verify` WHERE `email` = ?";
// con.query(sql1, [email, code], (err, data) => {
//   if(err){
//     return res.json(err);
//   }else{
//     console.log(data[0].code)
//     if(data[0].code !== checkCode){
//       return res.json({msg: "Invalid Verifcation Code!!!"})
//     }else{
//       const sql2 = "UPDATE `users` SET name= ?, email= ?, phone= ?, gender= ? , image= ? WHERE id = ?";
//       con.query(sql2, [name, email, phone, gender, image, userId], (err, result) => {
//         if(err){
//           return res.json(err);
//         }else{
//           const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);
//           return res.json({msg: "Profile Updated Successfuly", token})
//         }
//       })
//     }
//   }
// })

// }

const UpdateInterest = (req, res) => {
  const { id } = req.params;
  const { interest } = req.body;
  console.log("params", req.params);
  if (!id || !interest) {
    return res.status(400).json({ msg: "id and interest required" });
  }

  const sql = "UPDATE users SET interest = ?  WHERE id = ?";
  con.query(sql, [interest, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "error in updating", err });
    }
    if (result.affectedRows === 0) {
      return res.status(400).json({ msg: "user not found", err });
    }
    return res.json({ msg: "successfuly update iinterest", result });
  });
};

const CountDonateBooks = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT COUNT(user_id) as DonateBook FROM `donor`  WHERE  user_id = ?  ";

  con.query(sql, [id], (err, data) => {
    if (err) throw err;

    return res.json(data[0].DonateBook);
  });
};
const CountReqBook = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT COUNT(id) as reqCount FROM `needy` WHERE user_id =  ?  ";

  con.query(sql, [id], (err, data) => {
    if (err) throw err;

    return res.json(data[0].reqCount);
  });
};
const GetProfileImage = (req, res) => {
  const { userId } = req.params;
  console.log(req.params);
  const sql = "SELECT image FROM `users`  WHERE  id = ?  ";

  con.query(sql, [userId], (err, data) => {
    if (err) throw err;
    console.log(err);
    console.log(data);
    return res.json(data[0].image);
  });
};
const FeedBack = (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ msg: "fields are required" });
  }
  const user = [name, email, message];
  const sql = "INSERT INTO feedback( name, email, message) VALUES (?, ?, ?)";
  con.query(sql, user, (err, data) => {
    if (err) {
      return res.json({ msg: "error in saving", err });
    }

    return res.json({ msg: "save successfuly" });
  });
};
const ShowDonateBooks = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `donor`  WHERE  user_id = ?  ";

  con.query(sql, [id], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
};
const ShowRequestBooks = async (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT b.* FROM needy as n JOIN donor as b ON n.req_id = b.id WHERE n.user_id = ?";

  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    console.log(data);
    return res.json(data);
  });
};
module.exports = {
  CreateUser,
  LoginUser,
  UserForgotPassword,
  ApproveUser,
  RejectUser,
  FetchUser,
  FetchUserById,
  UpdateInterest,
  FreezeUser,
  userResetPass,
  UpdateProfile,
  UserProfileVerify,
  CountDonateBooks,
  CountReqBook,
  GetProfileImage,
  FeedBack,
  EmailSendCode,
  ShowDonateBooks,
  ShowRequestBooks,
};
