const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createCard, updateCard } = require("../controllers/card");

router.route("/create").post(protect, createCard);
router.route("/update").post(protect, updateCard);

module.exports = router;
