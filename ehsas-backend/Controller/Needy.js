const { con } = require("../config/db");

const NeedyRequest = (req, res) => {
  const id = req.params.id;
  const { bookname } = req.body;

  const sql = "SELECT `request` AS requestCount FROM `users` WHERE id=?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "error in the check request", err });
    }
    const requestCount = result[0].requestCount;
    console.log(requestCount);
    if (requestCount >= 3) {
      return res
        .status(400)
        .json({ msg: " request limit complete of this month", err });
    }
    // const user = { id,bookname };
    const qry ="UPDATE `users` SET   `bookname`= ? , `request`=`request` + 1 WHERE id= ? ";
    con.query(qry, [bookname,id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "error in the needy request", err });
      }
      return res.json({ msg: "successfuly submit request", data });
    });
  });
};




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
  const sql = "UPDATE `users` SET status='complete' WHERE id=? ";
  con.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "error in complete needy request ", err });
    }
    return res.json({ msg: "successfuly complete request", data });
  });
};
module.exports = {
  ApproveNeedy,
  CompleteNeedy,
  NeedyRequest,
};
