const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, updateUser } = require("../controllers/user");

router.route("/").get(protect, searchUsers);

router.route("/update").put(protect, updateUser);

module.exports = router;
