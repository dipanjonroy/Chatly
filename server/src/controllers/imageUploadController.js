const { cloudinary } = require("../cloudinary");
const User = require("../models/userModel");
const { uploadProfileImage } = require("../services/uploadImageService");
const ApiError = require("../utilities/error");

const maxImgSize = 1024 * 1024 * 3;

module.exports.uploadProfileImageController = async (req, res) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded.");
    }

    const { size, path, filename } = req.file;
    if (size > maxImgSize)
      throw new ApiError(403, "Image size should not exceed 3 MB.");

    const userId = req.userId;

    await uploadProfileImage(userId, path, filename);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
    });
  } catch (error) {
    throw error;
  }
};

module.exports.deleteProfileImageController = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found.");

    const publicId = user.profileImage?.publicId;

    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};
