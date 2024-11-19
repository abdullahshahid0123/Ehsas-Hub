const express = require('express');
const Test = require('../Controller/test-controller');
const { CreateUser, LoginUser } = require('../Controller/auth-controller');

const router = express.Router();


router.get("/test", Test);

router.post("/create-user", CreateUser)
router.post("/login", LoginUser)



module.exports = router;