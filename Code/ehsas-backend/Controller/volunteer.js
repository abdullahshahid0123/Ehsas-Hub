const { con } = require("../config/db");
const jwt = require("jsonwebtoken");
const { SendMailRequest } = require("../mail/app-mailer");

const LoginVolunteer = async (req, res) => {
  console.log("Rout hit");
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM volunteer WHERE email=? AND password=? AND status=1";

  con.query(sql, [email, password], (err, data) => {
    if (err) throw err;

    if (data.length > 0) {
      let vol = data[0];

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
};

const CreateVolunteer = (req, res) => {
  // req body from the user
  const { name, email, phone, password, address, image } = req.body;

  const user = [name, email, phone, password, address, image];
  //   check all fields from the user
  if (!name || !email || !phone || !password || !address || !image) {
    return res.status(500).json({ msg: "Fields are required" });
  }

  // sql  query for the database to create data
  const sql =
    "INSERT INTO  volunteer( name, email, phone, password, address, profile) VALUES(?)";
  con.query(sql, [user], (err, data) => {
    if (err) {
      console.log("error in create volunteer", err);
    } else {
      SendMailRequest(name, email);
      return res.json({ msg: "Request submitted successfuly " });
    }
  });
};

const FetachVolProcessReq = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT d.*, u.name, u.email, u.phone, u.address, v.name as vname FROM donor d JOIN users u ON u.id = d.user_id JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Process' AND d.volunteer_id = ?";
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
const FetchVolunteerCompleteAll = (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT d.*, v.name as vname ,v.phone as vphone, v.email as vemail FROM donor d JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'complete' OR d.status = 'Active' AND d.volunteer_id = ?";
  con.query(sql, [id], (err, data) => {
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
  if (!id) {
    return res.status(400).json({ msg: "volunteer id is required" });
  }
  //   update query for status change
  const sql = "UPDATE `volunteer` SET status=1 WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in approve volunteer", err });
    } else {
      return res.json({ msg: "volunteer Approve request  successfuly" });
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
  const { vid } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "invalid id" });
  }

  const qry =
    "UPDATE `donor` SET `status`='Process', `volunteer_id` = ? WHERE `id` = ?";
  con.query(qry, [vid, id], (err, data) => {
    if (err) {
      console.log("error in update request", err);
    } else {
      return res.json({ msg: "Volunteer Accept Request successfuly " });
    }
  });
};

const Freezvolunteer = (req, res) => {
  const { id } = req.params;
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

module.exports = {
  CreateVolunteer,
  FetchVolunteer,
  Freezvolunteer,
  ApproveVolunteer,
  CompleteVolunteer,
  LoginVolunteer,
  VolunteerAcceptRequest,
  FetachVolProcessReq,
  FetchVolunteerProcessAll,
  FetchVolunteerCompleteAll,
};
