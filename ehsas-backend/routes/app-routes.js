const express = require('express');
const Test = require('../Controller/test-controller');
const { CreateUser, LoginUser, FetchUser, UpdateInterest } = require('../Controller/auth-controller');
const { CreateVolunteer, FetchVolunteer, ApproveVolunteer, CompleteVolunteer } = require('../Controller/Volunteer');
const { CreateDonor, ApproveDonor, CompleteDonor } = require('../Controller/Donor');
const { NeedyRequest, ApproveNeedy, CompleteNeedy } = require('../Controller/Needy');

const router = express.Router();


router.get("/test", Test);
// user routes
router.post("/create-user", CreateUser)
router.post("/login", LoginUser)
router.put("/update-interest/:id", UpdateInterest)
// admin routes
router.get("/fetch-user/:userId", FetchUser)
router.post("/create-volunteer", CreateVolunteer)
router.get("/fetch-volunteer", FetchVolunteer)
// admin donor routes
router.post("/create-donor", CreateDonor)
router.put("/approve-donor/:id", ApproveDonor)
router.put("/complete-donor/:id", CompleteDonor)
//admin volunteer routes
router.put("/approve-volunteer/:id", ApproveVolunteer)
router.put("/complete-volunteer/:id", CompleteVolunteer)
// admin needy routes
router.get("/needy-request/:id", NeedyRequest)
router.get("/approve-needy/:id", ApproveNeedy)
router.get("/complete-needy/:id", CompleteNeedy)














module.exports = router;