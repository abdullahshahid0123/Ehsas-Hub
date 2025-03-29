const { con } = require("../config/db");

const NeedyRequest = (req, res) => {
  const id = req.params.id;

  const { reqId } = req.body;

  console.log(req.body);

  const sql = "SELECT `request` AS requestCount FROM `users` WHERE id=?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in the needy request request" });
    } else {
      const limitCount = result[0]?.requestCount;
      console.log("limit of this month", limitCount);
      if (limitCount > 2) {
        return res.json({ msg: "request limit complete of this month" });
      } else {
        const sql = "INSERT INTO `needy`(`user_id`, `req_id`) VALUES (?, ?)";
        con.query(sql, [id, reqId], (err, respo) => {
          if (err) {
            console.log(err);
            return res.json(err);
          } else {
            IncreaseReq(id, limitCount);
            return res.json({ msg: "Request submitted" });
          }
        });
      }
      // const user = { id,bookname };
    }
  });
};

async function IncreaseReq(uid, limit) {
  const newLimint = limit + 1;

  const sql = "UPDATE `users` SET `request`= ? WHERE `id` = ?";
  con.query(sql, [newLimint, uid], (err, data) => {
    if (err) throw err;
    console.log("Request Updated");
  });
}

const ApproveNeedy = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE `users` SET status='approved' WHERE id=? ";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "error in approve needy request ", err });
    }
    return res.json({ msg: "successfuly approve request", data });
  });
};

const CompleteNeedy = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE `users` SET status='Delivered' WHERE id=? ";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "error in Delivered needy request ", err });
    }
    return res.json({ msg: "successfuly Delivered needy request", data });
  });
};

const FetchNeedyPending = (req, res) => {
  // "SELECT n.* u.id, u.name, u.email, u.phone, u.gender, u.address, d.book_name, d.book_edition, d.auther_name, d.book_image, n.req_status FROM needy n JOIN users u ON u.id = n.req_id JOIN donor d ON d.id = n.user_id WHERE n.req_status = 'Pending'";

  const sql =
    "SELECT n.*, u.name, u.email, u.phone, u.address, u.gender FROM needy n JOIN users u ON u.id=n.user_id  WHERE n.req_status = 'Pending'";
  con.query(sql, (err, data) => {
    console.log(data);
    if (err) {
      console.log("error in fetch Needy", err);
    }
    console.log(data);
    return res.json({ msg: "Needy fetch successfuly ", data });
  });
};

const UpdateNeedyApproved = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "needy id is required" });
  }
  //   update query for status
  const sql = "UPDATE `needy` SET req_status='Approved'  WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in approving needy", err });
    } else {
      return res.json({ msg: " Needy Approve Successfuly" });
    }
  });
};
const UpdateNeedyProcess = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "needy id is required" });
  }
  //   update query for status
  const sql = "UPDATE `needy` SET req_status='Process'  WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in Process needy", err });
    } else {
      return res.json({ msg: " Needy in  Process" });
    }
  });
};
const RejectNeedy = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "try again" });
  }
  const qry = "DELETE FROM `needy` WHERE id=?";
  con.query(qry, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "error in reject donor", err });
    } else {
      return res.json({ msg: "donor request reject" });
    }
  });
};

const FetchNeedyApproved = (req, res) => {
  const sql =
    " SELECT n.*, u.name, u.email, u.phone FROM needy n JOIN users u ON u.id=n.user_id  WHERE n.req_status = 'Approved'";
  con.query(sql, (err, data) => {
    if (err) {
      console.log("error in fetch Approved", err);
    } else {
      return res.json({ msg: "Approved fetch successfuly ", data });
    }
  });
};
const FetchNeedyProcess = (req, res) => {
  const sql =
    " SELECT n.*, u.name, u.email, u.phone FROM needy n JOIN users u ON u.id=n.user_id  WHERE n.req_status = 'Process'";
  con.query(sql, (err, data) => {
    if (err) {
      console.log("error in fetch Approved", err);
    } else {
      return res.json(data);
    }
  });
};
const UpdateNeedyDelivered = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "needy id is required" });
  }
  //   update query for status
  const sql = "UPDATE `needy` SET req_status='Delivered'  WHERE id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "error in Delivered needy", err });
    } else {
      return res.json({ msg: " Needy Book Delivered" });
    }
  });
};
const FetchNeedyDelivered = (req, res) => {
  const sql =
    "SELECT n.*, u.name, u.email, u.phone FROM needy n JOIN users u ON u.id=n.user_id  WHERE n.req_status = 'Delivered'";
  con.query(sql, (err, data) => {
    if (err) {
      console.log("error in fetch Delivered", err);
    } else {
      return res.json({ msg: "Delivered fetch successfuly ", data });
    }
  });
};

module.exports = {
  ApproveNeedy,
  CompleteNeedy,
  NeedyRequest,
  FetchNeedyPending,
  FetchNeedyApproved,
  FetchNeedyDelivered,
  UpdateNeedyApproved,
  RejectNeedy,
  FetchNeedyProcess,
  UpdateNeedyProcess,
  UpdateNeedyDelivered,
};
