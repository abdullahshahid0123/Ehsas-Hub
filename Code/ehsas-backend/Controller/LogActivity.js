const { con } = require("../config/db");

const GetLogActivity = (req, res) => {
  const { userId, bookId, action } = req.body;

  const sql =
    "INSERT INTO `interactions`(`user_id`, `book_id`, `action`) VALUES (?, ?, ?)";
  con.query(sql, [userId, bookId, action], (err, result) => {
    if (err) throw err;
    return res.json({ msg: "Activity Store" });
  });
};

module.exports = {
  GetLogActivity,
};
