const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { fullBoardById, updateBoard } = require("../controllers/board");

router.route("/").get(protect, fullBoardById);
router.route("/update").post(protect, updateBoard);

module.exports = router;
