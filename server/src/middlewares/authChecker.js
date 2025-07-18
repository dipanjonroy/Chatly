const User = require("../models/userModel");
const ApiError = require("../utilities/error");
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new ApiError(401, "Please login to access.");

    const { userId } = jwt.decode(accessToken, process.env.JWT_ACCESS_KEY);
    if (!userId) throw new ApiError(403, "Invalide access token.");

    const isUserExist = await User.exists({ _id: userId });
    if (!isUserExist) throw new ApiError(401, "User doesn't exist.");

    req.userId = userId;

    next();
  } catch (error) {
    throw error;
  }
};

module.exports.isLoggedOut = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (accessToken) throw new ApiError(401, "You are already logged in.");
    next();
  } catch (error) {
    throw error;
  }
};
