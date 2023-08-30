const express = require("express");
const router = express.Router();
const {
  getAllVisitors,
  addVisitor,
} = require("../controllers/visitorsController");
const { getAllUsers, deleteUser } = require("../controllers/usersController");

router.route("/visitors").get(getAllVisitors).post(addVisitor);
router.route("/users").get(getAllUsers).delete(deleteUser);

module.exports = router;
