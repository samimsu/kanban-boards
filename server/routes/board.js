const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { fullBoardById, updateBoard, boardTitle } = require("../controllers/board");

router.route("/").get(protect, fullBoardById);
router.route("/update").post(protect, updateBoard);
router.route("/title").get(protect, boardTitle);

module.exports = router;
