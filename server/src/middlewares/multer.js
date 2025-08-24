const multer = require("multer");
const path = require("path");
const ApiError = require("../utilities/error");
const { storage } = require("../cloudinary");

const maxImgSize = 1024 * 1024 * 3;
const allowedImgType = ["jpg", "jpeg", "png", "gif", "webp"];

const fileFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  const isAllowed = allowedImgType.includes(extName.slice(1));
  if (!isAllowed) {
    cb(
      new ApiError(401, "Only image files (JPG, PNG, GIF, WebP) are allowed!"),
      false
    );
  } else {
    cb(null, true);
  }
};

module.exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxImgSize },
});
