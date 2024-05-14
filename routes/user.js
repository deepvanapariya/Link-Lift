const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.post('/', handleUserSignup)
    .post("/login", handleUserLogin)

module.exports = router;