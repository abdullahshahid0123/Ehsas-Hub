const express = require('express');
const Test = require('../Controller/test-controller');
const { CreateUser, LoginUser, FetchUser } = require('../Controller/auth-controller');
const { CreateVolunteer, FetchVolunteer,ApproveVolunteer,CompleteVolunteer } = require('../Controller/volunteer');
const { CreateDonor, ApproveDonor, CompleteDonor } = require('../Controller/Donor');

const router = express.Router();


router.get("/test", Test);
// user routes
router.post("/create-user", CreateUser)
router.post("/login", LoginUser)
// admin routes
router.get("/fetch-user", FetchUser)
router.post("/create-volunteer", CreateVolunteer)
router.get("/fetch-volunteer", FetchVolunteer)
// admin donor routes
router.post("/create-donor", CreateDonor)
router.put("/approve-donor/:id", ApproveDonor)
router.put("/complete-donor/:id", CompleteDonor)
//admin volunteer routes
router.put("/approve-volunteer", ApproveVolunteer)
router.put("/complete-volunteer", CompleteVolunteer)











module.exports = router;