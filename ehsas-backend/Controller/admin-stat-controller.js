const { con } = require("../config/db");

// users
const CountPendingUsers = (req, res) => {
  const sql =
    "SELECT COUNT(id) as pendingUsers FROM `users` WHERE status is null";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].pendingUsers);
  });
};

const CountActiveUsers = (req, res) => {
  const sql = "SELECT COUNT(id) as activeUsers FROM `users` WHERE status =  1";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].activeUsers);
  });
};

const CountFreezeUsers = (req, res) => {
  const sql = "SELECT COUNT(id) as freezeUsers FROM `users` WHERE status =  0";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].freezeUsers);
  });
};









const CountVolunteer = (req, res) => {
  const sql = "SELECT COUNT(id) as volUsers FROM `volunteer` WHERE status = 1";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].volUsers);
  });
};

// Donor
const CountPendingDonor = (req, res) => {
  const sql =
    "SELECT COUNT(id) as pendingDonor FROM `donor` WHERE `status` = 'Pending'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].pendingDonor);
  });
};

const CountApprovedDonor = (req, res) => {
  const sql =
    "SELECT COUNT(id) as approvedDonor FROM `donor` WHERE `status` = 'Approved'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].approvedDonor);
  });
};

const CountProcessDonor = (req, res) => {
  const sql =
    "SELECT COUNT(id) as processDonor FROM `donor` WHERE `status` = 'Process'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].processDonor);
  });
};

const CountCompletedDonor = (req, res) => {
  const sql =
    "SELECT COUNT(id) as completeDonor FROM `donor` WHERE `status` = 'Delivered'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].completeDonor);
  });
};

// Needy
const CountPendingNeedy = (req, res) => {
  const sql =
    "SELECT COUNT(id) as pendingNeedy FROM `needy` WHERE `req_status` = 'Pending'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].pendingNeedy);
  });
};

const CountApprovedNeedy = (req, res) => {
  const sql =
    "SELECT COUNT(id) as approvedNeedy FROM `needy` WHERE `req_status` = 'Approved'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].approvedNeedy);
  });
};

const CountProcessNeedy = (req, res) => {
  const sql =
    "SELECT COUNT(id) as processNeedy FROM `needy` WHERE `req_status` = 'Process'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].processNeedy);
  });
};

const CountCompletedNeedy = (req, res) => {
  const sql =
    "SELECT COUNT(id) as completeNeedy FROM `needy` WHERE `req_status` = 'Delivered'";
  con.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].completeNeedy);
  });
};

// volunteer
const CountVolNew = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT COUNT(volunteer_id) as volNewCount FROM `donor` WHERE `status` = 'Approved' AND `volunteer_id` = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].volNewCount);
  });
};

const CountVolProcess = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT COUNT(volunteer_id) as volProcessCount FROM `donor` WHERE `status` = 'Process' AND `volunteer_id` = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].volProcessCount);
  });
};

const CountVolCompleted = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT COUNT(volunteer_id) as volCompletedCount FROM `donor` WHERE `status` = 'Delivered' OR `status` = 'Active' AND `volunteer_id` = ?";
  con.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].volCompletedCount);
  });
};

module.exports = {
  CountPendingUsers,
  CountActiveUsers,
  CountFreezeUsers,
  CountVolunteer,
  CountPendingDonor,
  CountApprovedDonor,
  CountProcessDonor,
  CountCompletedDonor,
  CountPendingNeedy,
  CountApprovedNeedy,
  CountProcessNeedy,
  CountCompletedNeedy,
  CountVolNew,
  CountVolProcess,
  CountVolCompleted,
};
