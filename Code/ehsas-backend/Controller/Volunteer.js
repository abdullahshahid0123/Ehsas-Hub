const { con } = require("../config/db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  SendMailRequest,
  SendMailVerifyEmail,
  SendMailApproveUser,
  SendMailFreeze,
  SendMailRejectUser,
  SendMailVolunteerAccepted,
} = require("../mail/app-mailer");
const bcrypt = require("bcryptjs/dist/bcrypt");

const LoginVolunteer = async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM volunteer WHERE email=? AND status=1";

  con.query(sql, [email], (err, data) => {
    if (err) throw err;

    if (data.length > 0) {
      let vol = data[0];

      if (password) {
        bcrypt.compare(password, vol.password, function (err, result) {
          if (err) throw err;
          if (result) {
            const token = jwt.sign(
              { id: vol.id, email: vol.email },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            return res.json({ msg: "Login successfuly", vol, token });
          } else {
            return res.json({ msg: "user not found!!!" });
          }
        });
      }
    }
  });
};

const CreateVolunteer = (req, res) => {
  // req body from the user
  const { name, email, phone, password, address, image, code } = req.body;
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

  if (!name || !email || !phone || !password || !image || !code) {
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

  const check = "SELECT * FROM `volunteer` WHERE `email` = ?";
  con.query(check, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.json({ msg: "Already Register" });
    }

    const verify = "SELECT * FROM `verify` WHERE `email` = ?";
    con.query(verify, [email], async (err, verifyData) => {
      if (err) throw err;
      if (verifyData[0].code.toString() !== code) {
        return res.json({ msg: "Invaid Code" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = [name, email, phone, hashPassword, address, image];
        //   check all fields from the user

        // sql  query for the database to create data
        const sql =
          "INSERT INTO  volunteer( name, email, phone, password, address, cnic) VALUES(?)";
        con.query(sql, [user], (err, data) => {
          if (err) {
            console.log("error in create volunteer", err);
          } else {
            SendMailRequest(name, email);
            return res.json({ msg: "Request submitted successfuly " });
          }
        });
      }
    });
  });
};

const FetachVolProcessReq = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT d.*, u.name, u.email, u.phone, u.address, v.name as vname FROM donor d JOIN users u ON u.user_id = d.user_id JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Process' AND d.volunteer_id = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};
const FetchVolunteerProcessAll = (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT d.*, v.name as vname ,v.phone as vphone, v.email as vemail FROM donor d JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Process' AND d.volunteer_id = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
};

const AdminFetchVolunteerProcessAll = (req, res) => {
  const sql =
    "SELECT d.*, v.name as vname ,v.phone as vphone, v.email as vemail FROM donor d JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Process'";
  con.query(sql, (err, data) => {
    if (err) throw err;

    return res.json(data);
  });
};

const FetchVolunteerCompleteAll = (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT d.*, v.name as vname ,v.phone as vphone, v.email as vemail FROM donor d JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Delivered' OR d.status = 'Active' AND d.volunteer_id = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const AdminFetchVolunteerCompleteAll = (req, res) => {
  const sql =
    "SELECT d.*, v.name as vname ,v.phone as vphone, v.email as vemail FROM donor d JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'complete' OR d.status = 'Delivered' OR d.status = 'Active'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const FetchVolunteer = (req, res) => {
  // sql query fetch all user from the database
  const sql = " SELECT * FROM volunteer";
  con.query(sql, (err, data) => {
    if (err) {
      console.log("error in fetch volunteer", err);
    }
    return res.json({ msg: "volunteer fetch successfuly ", data });
  });
};

const ApproveVolunteer = (req, res) => {
  // function for the change status
  const { id } = req.params;
  const { name, email } = req.body;
  console.log(req.body);
  if (!id) {
    return res.status(400).json({ msg: "volunteer id is required" });
  }
  // update query for status change
  const sql = "UPDATE `volunteer` SET status=1 WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in approve volunteer", err });
    } else {
      SendMailApproveUser(name, email);
      return res.json({ msg: "volunteer Approve request  successfuly" });
    }
  });
};

const RejectVolunteer = (req, res) => {
  // function for the change status
  const { id } = req.params;
  const { name, email, comment } = req.body;
  console.log(req.body);
  if (!id) {
    return res.status(400).json({ msg: "volunteer id is required" });
  }

  if (!comment) {
    return res.status(400).json({ msg: "Must add reason!" });
  }

  // update query for status change
  const sql = "DELETE FROM `volunteer` WHERE `id` = ?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in approve volunteer", err });
    } else {
      SendMailRejectUser(name, email, comment);
      return res.json({ msg: "volunteer  request Rejected successfuly" });
    }
  });
};

// const FetchDonorRequestApproved = (req, res) => {
//   const sql = " SELECT * FROM donor WHERE status = 'Approved'";
//   con.query(sql, (err, data) => {
//     if (err) {
//       console.log("error in fetch donor", err);
//     }
//     return res.json({ msg: "donor fetch successfuly ", data });
//   });
// };

const VolunteerAcceptRequest = (req, res) => {
  const { id } = req.params;
  const { vid, name, email, bookName } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "invalid id" });
  }

  console.log(req.body);

  const qry =
    "UPDATE `donor` SET `status`='Process', `volunteer_id` = ? WHERE `id` = ?";
  con.query(qry, [vid, id], (err, data) => {
    if (err) {
      console.log("error in update request", err);
    } else {
      SendMailVolunteerAccepted(name, email, bookName);
      return res.json({ msg: "Volunteer Accept Request successfuly " });
    }
  });
};

const Freezvolunteer = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "invalid credential" });
  }
  //   update query for status change
  const sql = "UPDATE `volunteer` SET status=0 WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in freeze volunteer", err });
    } else {
      SendMailFreeze(name, email);
      return res.json({ msg: "volunteer Approve request  successfuly" });
    }
  });
};

const CompleteVolunteer = (req, res) => {
  // function for the change status
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "volunteer id is required" });
  }
  //   update query for status change
  const sql = "UPDATE `volunteer` SET status= 'complete' WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in complete volunteer", err });
    } else {
      return res.json({ msg: "volunteer complete request  successfuly", data });
    }
  });
};
const GetVolunteer = (req, res) => {
  const userId = req.params.userId;
  const qry = "SELECT * FROM `volunteer` WHERE id = ?";
  con.query(qry, [userId], (error, data) => {
    if (error) {
      return res.json({ msg: "error in fetching", error });
    }
    if (data.length > 0) {
      return res.json(data[0]);
    } else {
      return res.json({ msg: "volunteer not found" });
    }
  });
};
const UpdateProfileVolunteer = (req, res) => {
  const { userId } = req.params;
  const { name, email, phone, profile, code } = req.body;
  let checkCode = parseInt(code);

  console.log(req.body);

  const sql1 = "SELECT * FROM `verify` WHERE `email` = ?";
  con.query(sql1, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data[0].code !== checkCode) {
        return res.json({ msg: "Invalid Verifcation Code!!!" });
      } else {
        const sql2 =
          "UPDATE `volunteer` SET name= ?, email= ?, phone= ?, profile= ? WHERE id = ?";
        con.query(
          sql2,
          [name, email, phone, profile, userId],
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
const SendCode = async (req, res) => {
  const { email } = req.body.editData;
  // console.log(req.body)
  const code = await SendMailVerifyEmail(email);
  console.log(code);
  if (code < 0) {
    return res.json({ msg: "cannot generate code" });
  } else {
    const sql = "INSERT INTO `verify`(email ,code) VALUES(? , ?)";
    con.query(sql, [email, code], (err, data) => {
      console.log(email, "email ha ye");
      if (err) throw err;
      return res.json({ msg: "code send to your email" });
    });
  }
};
const GetVolunteerImage = (req, res) => {
  const { userId } = req.params;
  console.log(req.params);

  const sql = "SELECT profile FROM `volunteer`  WHERE  id = ?  ";

  con.query(sql, [userId], (err, data) => {
    if (err) throw err;
    console.log(err);

    return res.json(data[0].profile);
  });
};

module.exports = {
  CreateVolunteer,
  FetchVolunteer,
  Freezvolunteer,
  ApproveVolunteer,
  RejectVolunteer,
  CompleteVolunteer,
  LoginVolunteer,
  VolunteerAcceptRequest,
  FetachVolProcessReq,
  FetchVolunteerProcessAll,
  FetchVolunteerCompleteAll,
  GetVolunteer,
  UpdateProfileVolunteer,
  SendCode,
  GetVolunteerImage,
  AdminFetchVolunteerProcessAll,
  AdminFetchVolunteerCompleteAll,
};
