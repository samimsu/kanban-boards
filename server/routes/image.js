const express = require("express");
const router = express.Router();
const { upload } = require("../controllers/image");

router.route("/upload").post(upload)

module.exports = router;