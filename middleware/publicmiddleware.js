const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const publicUser = asyncHandler(async (req, res, next) => {

  try {
    // Get user from  the param
    req.user = await User.findById(req.params.id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Not found");
  }
});

module.exports = { publicUser };
