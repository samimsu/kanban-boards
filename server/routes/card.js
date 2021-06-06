const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createCard,
  updateCardName,
  updateCardDescription,
} = require("../controllers/card");

router.route("/create").post(protect, createCard);
router.route("/updateName").post(protect, updateCardName);
router.route("/updateDescription").post(updateCardDescription);

module.exports = router;
