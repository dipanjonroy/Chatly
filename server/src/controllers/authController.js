const { sendOtp, registerUser, loginUser } = require("../services/authService");
const ApiError = require("../utilities/error");
const { createToken } = require("../utilities/createToken");

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
      secure: process.env.NODE_ENV === "production", // works if env is set
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
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
    const userId = req.userId;
    res.status(200).json({
      success: true,
      user: userId,
    });
  } catch (error) {
    throw error;
  }
};
