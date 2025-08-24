const { cloudinary } = require("../cloudinary");
const User = require("../models/userModel");
const ApiError = require("../utilities/error");

module.exports.uploadProfileImage = async (userId, path, filename) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found.");

    const fileInfo = {
      url: path,
      publicId: filename,
    };

    await User.findByIdAndUpdate(
      userId,
      { profileImage: fileInfo },
      { runValidators: true, new: true }
    );

    return;
  } catch (error) {
    throw error;
  }
};


