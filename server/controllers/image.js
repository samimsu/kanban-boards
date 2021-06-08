const asyncHandler = require("express-async-handler");
const cloudinary = require('cloudinary').v2;

// @route POST /image/upload
// @desc Uploads image
// @access Public
exports.upload = asyncHandler(async (req, res, next) => {
  file = req.filename
  cloudinary.uploader.upload(file).then(function(error, result) {
    if (error) {
      res.status(401);
      throw new Error(error);
    }
    res.status(200).json({
      url: result.url
    })
  })
})