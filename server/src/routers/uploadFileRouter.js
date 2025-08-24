const express = require("express");
const { isLoggedIn } = require("../middlewares/authChecker");
const { upload } = require("../middlewares/multer");
const {
  uploadProfileImageController,
  deleteProfileImageController,
} = require("../controllers/imageUploadController");
const router = express.Router();

router.post(
  "/uploadImage",
  isLoggedIn,
  upload.single("profileImage"),
  uploadProfileImageController
);

router.delete(
  "/deleteProfileImage",
  isLoggedIn,
  deleteProfileImageController
);

module.exports = router;
