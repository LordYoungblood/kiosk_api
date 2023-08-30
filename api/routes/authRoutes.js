const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/loginController");

router.route("/login").post(login);
//router.route("/register").post(register);
//router.route("/logout").post(logout);

module.exports = router;
