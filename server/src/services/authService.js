const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const ApiError = require("../utilities/error");
const { generateOtp } = require("../utilities/generateOtp");
const sendEmail = require("../utilities/nodeMailer");
const bcrypt = require("bcrypt");

module.exports.sendOtp = async (email) => {
  try {
    const isExist = await User.exists({ email });
    if (isExist) throw new ApiError(409, "User already exists.");

    const isOtpSent = await Otp.exists({ email, isVerified: false });
    if (isOtpSent)
      throw new ApiError(409, "OTP is already sent to your email.");

    const isVerified = await Otp.exists({ email, isVerified: true });
    if (isVerified)
      throw new ApiError(
        409,
        "OTP is already verified. Please complete the profile."
      );

    const otp = generateOtp();

    const emailOptions = {
      to: email,
      subject: "Chatly-Verify OTP to register",
      html: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h2>Welcome to Chatly 👋</h2>
          <p>Your verification OTP is:</p>
          <h1 style="letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 15 minutes.</p>
        </div>
      `,
    };

    await sendEmail(emailOptions);

    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    });
    return;
  } catch (error) {
    throw error;
  }
};

module.exports.registerUser = async (
  firstName,
  lastName,
  email,
  password,
  otp
) => {
  try {
    console.log(firstName);
    const isRegister = await User.exists({ email });
    if (isRegister)
      throw new ApiError(409, "User is already register with this email.");

    const getOtp = await Otp.findOne({ email });
    if (!getOtp)
      throw new ApiError(
        404,
        "OTP is expired or not found. Please resend OTP."
      );

    if (getOtp.isVerified) {
      throw new ApiError(409, "Otp is already verified.");
    }

    if (getOtp.otp !== otp) {
      throw new ApiError(403, "Incorrect OTP. Please try again.");
    }

    if (getOtp.expiresAt < new Date()) {
      throw new ApiError(403, "OTP has expired. Please request a new one.");
    }

    await Otp.findOneAndUpdate(
      { email },
      { expiresAt: new Date(Date.now() + 60 * 60 * 1000), isVerified: true },
      { runValidators: true }
    );

    const userData = {
      name: {
        firstName,
        lastName,
      },
      email,
      password,
    };

    const createdUser = await User.create(userData);

    const newUser = await User.findById(createdUser._id).select(
      "-__v -createdAt -updatedAt"
    );

    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports.loginUser = async (email, password) => {
  try {
    const registerUser = await User.findOne({ email }).select("password");
    if (!registerUser) throw new ApiError(404, "User not found.");

    const isPassword = await bcrypt.compare(password, registerUser.password);
    if (!isPassword) throw new ApiError(403, "Incorrect password.");

    const user = await User.findById(registerUser._id);

    return user;
  } catch (error) {
    throw error;
  }
};

