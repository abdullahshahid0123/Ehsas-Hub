const express = require("express");
const Test = require("../Controller/test-controller");
const {
  CreateUser,
  LoginUser,
  FetchUser,
  UpdateInterest,
  FetchUserById,
  ApproveUser,
  RejectUser,
  FreezeUser,
  UserForgotPassword,
  userResetPass,
  UpdateProfile,
  UserProfileVerify,
  CountDonateBooks,
  CountReqBook,
  GetProfileImage,
  FeedBack,
  EmailSendCode,
  ShowDonateBooks,
  ShowRequestBooks,
  GetUniqueGen,
} = require("../Controller/auth-controller");
const {
  CreateVolunteer,
  FetchVolunteer,
  ApproveVolunteer,
  CompleteVolunteer,
  Freezvolunteer,

  VolunteerAcceptRequest,
  LoginVolunteer,
  FetachVolProcessReq,
  FetchVolunteerProcessAll,
  FetchVolunteerCompleteAll,
  GetVolunteer,
  UpdateProfileVolunteer,
  SendCode,
  GetVolunteerImage,
  RejectVolunteer,
  AdminFetchVolunteerProcessAll,
  AdminFetchVolunteerCompleteAll,
} = require("../Controller/Volunteer");
const {
  CreateDonor,
  ApproveDonor,
  CompleteDonor,
  FetchDonor,

  RejectDonor,
  FetchDonorApproved,
  FetchDonorDelivered,
  UpdateDelivere,
  FetchDonProcessReq,
  UpdateActive,
  FetchActive,
  UpdateDeactivate,
  FetchActiveAll,
} = require("../Controller/Donor");
const {
  NeedyRequest,
  ApproveNeedy,
  CompleteNeedy,
  FetchNeedyPending,
  FetchNeedyApproved,
  FetchNeedyDelivered,
  UpdateNeedyApproved,
  RejectNeedy,
  FetchNeedyProcess,
  UpdateNeedyProcess,
  UpdateNeedyDelivered,
} = require("../Controller/Needy");
const {
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
  GetFeedback,
} = require("../Controller/admin-stat-controller");
const {
  CreateAdmin,
  LoginAdmin,
  ForgotPassword,
  FetchAdminById,
  SendCodeAdmin,
  verifyUpdateProfile,
  GetAdminProfile,
} = require("../Controller/admin-login");
const {
  GetLogActivity,
  SearchBook,
  GetFavBooks,
  RemoveFav,
} = require("../Controller/LogActivity");

const router = express.Router();

router.get("/test", Test);
// user routes
router.post("/create-user", CreateUser);
router.post("/login", LoginUser);
router.put("/update-interest/:id", UpdateInterest);
router.post("/user-forgot-pass", UserForgotPassword);
router.post("/user-reset-pass/:email", userResetPass);
router.put("/update-profile/:userId", UpdateProfile);
router.post("/user-profile-verify", UserProfileVerify);
router.get("/get-user-image/:userId", GetProfileImage);
router.post("/email-send-code/:email", EmailSendCode);
// user state
router.get("/count-donate-books/:id", CountDonateBooks);
router.get("/count-req-books/:id", CountReqBook);
router.get("/show-donate-books/:id", ShowDonateBooks);
router.get("/show-request-books/:id", ShowRequestBooks);

// Feedback
router.get("/get-feedback", GetFeedback);
router.get("/get-gen", GetUniqueGen);

// admin routes
router.put("/approve-user/:id", ApproveUser);
router.put("/freeze-user/:id", FreezeUser);
router.put("/reject-user/:id", RejectUser);
router.get("/fetch-user", FetchUser);
router.get("/fetchuser-byid/:userId", FetchUserById);
router.post("/create-volunteer", CreateVolunteer);
router.get("/fetch-volunteer", FetchVolunteer);
// admin routes of login and signup
router.post("/create-admin", CreateAdmin);
router.post("/login-admin", LoginAdmin);
router.post("/forgot-password", ForgotPassword);
router.get("/fetchadmin-byid/:userId", FetchAdminById);
router.post("/send-code-admin", SendCodeAdmin);
router.put("/verify-Update-Profile/:userId", verifyUpdateProfile);
router.get("/get-admin-profile/:userId", GetAdminProfile);

// admin donor routes
router.post("/create-donor", CreateDonor);
router.put("/approve-donor/:id", ApproveDonor);
router.put("/complete-donor/:id", CompleteDonor);
router.put("/update-deliver/:id", UpdateDelivere);
router.delete("/reject-donor/:id", RejectDonor);
router.get("/fetch-donor-pending", FetchDonor);
router.get("/fetch-donor-approved", FetchDonorApproved);
router.get("/fetch-d-process", FetchDonProcessReq);
router.get("/fetch-donor-delivered", FetchDonorDelivered);
router.put("/Update-active/:id", UpdateActive);
// active list route of admin
router.get("/fetch-active", FetchActive);
router.put("/Update-deactivate/:id", UpdateDeactivate);

//admin volunteer routes
router.post("/vol-login", LoginVolunteer);
router.put("/approve-volunteer/:id", ApproveVolunteer);
router.put("/reject-volunteer/:id", RejectVolunteer);

router.put("/complete-volunteer/:id", CompleteVolunteer);
router.put("/freeze-volunteer/:id", Freezvolunteer);
router.put("/vol-req-accept/:id", VolunteerAcceptRequest);
router.get("/fetch-vol-process/:id", FetachVolProcessReq);
router.get("/fetch-vol-process-all/:id", FetchVolunteerProcessAll);
router.get("/fetch-vol-complete-all/:id", FetchVolunteerCompleteAll);
router.get("/get-volunteer/:userId", GetVolunteer);

// Admin Volunteer req
router.get("/admin-v-process", AdminFetchVolunteerProcessAll);
router.get("/admin-v-completed", AdminFetchVolunteerCompleteAll);

router.post("/send-code", SendCode);

router.put("/update-profile-volunteer/:userId", UpdateProfileVolunteer);

// admin needy routes
router.put("/needy-request/:id", NeedyRequest);
router.get("/approve-needy/:id", ApproveNeedy);
router.get("/complete-needy/:id", CompleteNeedy);
router.get("/fetch-needy-pending", FetchNeedyPending);
router.put("/update-needy-approved/:id", UpdateNeedyApproved);
router.delete("/Reject-needy/:id", RejectNeedy);
router.get("/fetch-needy-approved", FetchNeedyApproved);
router.get("/fetch-needy-process", FetchNeedyProcess);
router.put("/update-needy-process/:id", UpdateNeedyProcess);
router.put("/update-needy-delivered/:id", UpdateNeedyDelivered);
router.get("/fetch-needy-delivered", FetchNeedyDelivered);

// statistics
router.get("/count-pending-users", CountPendingUsers);
router.get("/count-active-users", CountActiveUsers);
router.get("/count-freeze-users", CountFreezeUsers);
router.get("/count-vol", CountVolunteer);

router.get("/count-pending-donor", CountPendingDonor);
router.get("/count-approve-donor", CountApprovedDonor);
router.get("/count-process-donor", CountProcessDonor);
router.get("/count-complete-donor", CountCompletedDonor);

router.get("/count-pending-needy", CountPendingNeedy);
router.get("/count-approve-needy", CountApprovedNeedy);
router.get("/count-process-needy", CountProcessNeedy);
router.get("/count-complete-needy", CountCompletedNeedy);

router.get("/vol-new-count", CountVolNew);
router.get("/vol-process-count/:id", CountVolProcess);
router.get("/vol-completed-count/:id", CountVolCompleted);
router.get("/get-volunteer-image/:userId", GetVolunteerImage);

// feedback and activites routes
router.post("/feed-back", FeedBack);
// 
router.post("/log-activity", GetLogActivity);
router.get("/search-book/:search", SearchBook);
router.get("/get-fav-books/:id", GetFavBooks);
router.delete("/remove-fav/:id", RemoveFav);
router.get("/fetch-active-all", FetchActiveAll);

module.exports = router;
