const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" }
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

// @route PUT /users/update
// @desc Update a user
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { user } = req.body;

  try {
    console.log(user)
    const attempt = await User.findByIdAndUpdate(user.id, user ).exec();
    console.log(attempt)
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }

})