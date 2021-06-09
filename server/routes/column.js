const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createColumn, updateColumnTitle } = require("../controllers/column");

router.route("/create").post(protect, createColumn);
router.route("/updateTitle").post(protect, updateColumnTitle);

module.exports = router;
