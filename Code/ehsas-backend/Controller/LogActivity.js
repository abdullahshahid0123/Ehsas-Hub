const { con } = require("../config/db");

const GetLogActivity = (req, res) => {
  const { userId, bookId, action } = req.body;

  const sql =
    "INSERT INTO `interactions`(`user_id`, `book_id`, `action`) VALUES (?, ?, ?)";
  con.query(sql, [userId, bookId, action], (err, result) => {
    if (err) throw err;
    if (action === "like") {
      res.json({ msg: AddtoFav(userId, bookId) });
    }
    console.log("Activity Stored");
  });
};

async function AddtoFav(user_id, book_id) {
  const check =
    "SELECT * FROM `favbooks` WHERE `user_id` = ? AND `book_id` = ?";
  con.query(check, [user_id, book_id], (reject, resolve) => {
    if (reject) throw err;
    if (resolve.length > 0) {
      return "Already Liked!!!";
    } else {
      const sql = "INSERT INTO `favbooks`(`user_id`, `book_id`) VALUES (?, ?)";
      con.query(sql, [user_id, book_id], (err, data) => {
        if (err) throw err;
        return "Add to Favourite Successfuly";
      });
    }
  });
}

const GetFavBooks = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT d.*, f.id as favId  FROM favbooks as f JOIN donor as d ON f.book_id = d.id WHERE f.user_id = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const RemoveFav = (req, res) => {
  const { id } = req.params;
  console.log(id);

  const sql = "DELETE FROM favbooks WHERE id = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Removed!" });
  });
};

const SearchBook = (req, res) => {
  const { search } = req.params;

  const sql = `SELECT * FROM donor WHERE book_name LIKE '%${search}%' ORDER BY id LIMIT 9`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    return res.json(results);
  });
};


module.exports = {
  GetLogActivity,
  SearchBook,
  GetFavBooks,
  RemoveFav,
};
