const { sendOtp, registerUser, loginUser } = require("../services/authService");
const ApiError = require("../utilities/error");
const { createToken } = require("../utilities/createToken");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    await sendOtp(email);

    res.status(200).json({
      success: true,
      message: "An OTP is sent to your email.",
    });
  } catch (error) {
    throw error;
  }
};

module.exports.registerUserController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, otp } = req.body;

    if (!otp) {
      throw new ApiError(403, "Otp is required.");
    }

    const data = await registerUser(firstName, lastName, email, password, otp);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const userId = user._id;

    const token = createToken({ userId }, process.env.JWT_ACCESS_KEY, "5m");

    res.cookie("accessToken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    throw error;
  }
};

module.exports.logOutUserController = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    throw error;
  }
};

module.exports.authChekerController = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new ApiError(401, "Please login to access.");

    const { userId } = jwt.decode(accessToken, process.env.JWT_ACCESS_KEY);
    if (!userId) throw new ApiError(403, "Invalide access token.");

    const user = await User.findById(userId).select("-__v -friendRequest -friends -sentFriendRequest");
    if (!user) throw new ApiError(404, "User not found.");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    throw error;
  }
};
