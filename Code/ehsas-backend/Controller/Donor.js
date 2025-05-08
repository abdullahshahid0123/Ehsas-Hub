const { json } = require("body-parser");
const { con } = require("../config/db");
const {
  SendMailApproveBookDonation,
  SendMailBookReceived,
} = require("../mail/app-mailer");

async function AddBookDataSet(id, title, author, coverImg, genres) {
  const genArray = JSON.stringify(genres);
  const data = [id, title, author, coverImg, genArray];
  const sql =
    "INSERT INTO `books`(`bookId`, `title`, `author`, `coverImg`, `genres`) VALUES (?)";
  con.query(sql, [data], (err, data) => {
    if (err) throw err;
    console.log("Book added to dataset");
  });
}

const CreateDonor = (req, res) => {
  // req from the user
  const {
    id,
    book_name,
    generes,
    book_edition,
    auther_name,
    book_image,
    userEmail,
  } = req.body;
  // console.log(req.body)

  if (
    !id ||
    !book_name ||
    !generes ||
    !book_edition ||
    !auther_name ||
    !book_image
  ) {
    return res.status(404).json({ msg: "Fields are required" });
  }
  const user = [id, book_name, generes, book_edition, auther_name, book_image];

  // console.log(user)

  // console.log(req.body)

  // sql  query for the database to create data
  const sql =
    "INSERT INTO donor(user_id, book_name, generes, book_edition, auther_name, book_image) VALUES (?)";
  con.query(sql, [user], (err, data) => {
    if (err) {
      console.log("error in create donor", err);
    } else {
      // console.log(data.insertId)
      AddBookDataSet(
        data.insertId,
        book_name,
        auther_name,
        book_image,
        generes
      );
      return res.json({ msg: "donor created successfuly" });
    }
  });
};

const FetchDonProcessReq = (req, res) => {
  const sql =
    "SELECT d.*, u.name, u.email, u.phone, u.address, v.name as vname FROM donor d JOIN users u ON u.user_id = d.user_id JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Process'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    // console.log(data);
    return res.json(data);
  });
};

const FetchDonor = (req, res) => {
  const sql =
    "SELECT d.*, u.name, u.email, u.phone, u.address FROM donor d JOIN users u ON u.user_id = d.user_id WHERE d.status = 'Pending'";
  con.query(sql, (err, data) => {
    if (err) {
      console.log("error in fetch donor", err);
    }
    return res.json({ msg: "donor fetch successfuly ", data });
  });
};

const FetchDonorApproved = (req, res) => {
  const sql =
    "SELECT d.*, u.name, u.email, u.phone, u.address FROM donor d JOIN users u ON u.user_id = d.user_id WHERE d.status = 'Approved'";
  con.query(sql, (err, data) => {
    if (err) {
      console.log("error in deliver donor", err);
    }
    return res.json({ msg: "donor fetch deliver successfuly ", data });
  });
};

// For admin SELECT d.*, u.name, u.email, u.phone, u.address, v.name as vname FROM donor d JOIN users u ON u.id = d.user_id JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Process';
// For Volunteer SELECT d.*, u.name, u.email, u.phone, u.address, v.name as vname FROM donor d JOIN users u ON u.id = d.user_id JOIN volunteer v ON v.id = d.volunteer_id WHERE d.status = 'Process' AND d.volunteer_id = 2;
const FetchDonorDelivered = (req, res) => {
  const sql =
    "SELECT d.*, u.name, u.email, u.phone, u.address FROM donor d JOIN users u ON u.user_id = d.user_id WHERE d.status = 'Delivered'";
  con.query(sql, (err, data) => {
    if (err) {
      console.log("error in deliver donor", err);
    }
    return res.json({ msg: "donor fetch deliver successfuly ", data });
  });
};

const RejectDonor = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "try again" });
  }
  const qry = "DELETE FROM `donor` WHERE id=?";
  con.query(qry, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in reject donor", err });
    } else {
      return res.json({ msg: "donor request reject" });
    }
  });
};
const UpdateDelivere = (req, res) => {
  const { id } = req.params;
  const { name, email, bookName } = req.body;
  if (!id) {
    return res.status(400).json({ msg: " id is required" });
  }
  //   update query for deliver
  const sql = "UPDATE `donor` SET `status`='Delivered' WHERE id=? ";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in updating donor", err });
    } else {
      SendMailBookReceived(name, email, bookName);
      return res.json({ msg: " deliver successfuly", data });
    }
  });
};
const UpdateActive = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: " id is required" });
  }
  const sql = "UPDATE `donor` SET `status`='Active' WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in updating Active", err });
    } else {
      return res.json({ msg: " Active Successfuly" });
    }
  });
};

const FetchActive = (req, res) => {
  // console.log(req.query);
  // const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 18;
  // const offset = (page - 1) * limit;

  const sql = "SELECT * FROM donor WHERE status = 'Active' ORDER BY id LIMIT ?";
  con.query(sql, [limit], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in updating Active", err });
    } else {
      return res.json(data);
    }
  });
};
const UpdateDeactivate = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: " id is required" });
  }
  const sql = "UPDATE `donor` SET `status`='Deactivate' WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in updating Active", err });
    } else {
      return res.json({ msg: " Deactive Successfuly" });
    }
  });
};

const ApproveDonor = (req, res) => {
  // function fort the change status
  const { id } = req.params;
  const { name, email, bookName } = req.body;
  if (!id) {
    return res.status(400).json({ msg: "Donor id is required" });
  }
  //   update query for status
  const sql = "UPDATE `donor` SET status='Approved'  WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in approving donor", err });
    } else {
      SendMailApproveBookDonation(name, email, bookName);
      return res.json({ msg: " donor approve successfuly", data });
    }
  });
};

const CompleteDonor = (req, res) => {
  // function for the change status
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "Donor id is required" });
  }
  //   update query for status change
  const sql = "UPDATE `donor` SET status= 'complete' WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in complete donor", err });
    }
    if (data.affectedRows === 0) {
      return res.status(500).json({ msg: "donor not found ", err });
    }
    return res.json({ msg: "donor complete request  successfuly", data });
  });
};

module.exports = {
  CreateDonor,
  FetchDonor,
  ApproveDonor,
  CompleteDonor,
  RejectDonor,
  UpdateDelivere,
  FetchDonorApproved,
  FetchDonorDelivered,
  FetchDonProcessReq,
  UpdateActive,
  FetchActive,
  UpdateDeactivate,
};
