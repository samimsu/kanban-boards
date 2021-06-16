const User = require("../models/User");
const Column = require("../models/Column");
const Board = require("../models/Board");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  // A new board already comes with the "in progress" and "completed" columns and is created for the user when they sign up
  const inProgressColumn = await Column.create({
    title: "In Progress",
    cards: [],
  });

  const completedColumn = await Column.create({
    title: "Completed",
    cards: [],
  });

  const board = await Board.create({
    columns: [inProgressColumn, completedColumn],
  });

  const user = await User.create({
    email,
    password,
    board,
  });

  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          email: user.email,
          board: user.board,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    const fullBoardById = await Board.findById(user.board)
      .populate({ path: "columns", populate: { path: "cards" } })
      .exec();

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          email: user.email,
          board: fullBoardById,
          profilePicture: user.profilePicture,
        }
      }
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const fullBoardById = await Board.findById(user.board)
      .populate({ path: "columns", populate: { path: "cards" } })
      .exec();

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        email: user.email,
        board: fullBoardById,
        profilePicture: user.profilePicture,
      },
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});
