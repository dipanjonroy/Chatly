const express = require("express");
const { isLoggedIn } = require("../middlewares/authChecker");
const {
  getUserDetailsController,
  updateUserDetailsController,
  userListController,
  friendRequestController,
  friendsListController,
  sentFriendRequestController,
} = require("../controllers/userController");
const { userUpdateValidator } = require("../middlewares/validators");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.get("/getUserDetails/:userId", isLoggedIn, getUserDetailsController);
router.put(
  "/updateUserDetails",
  isLoggedIn,
  userUpdateValidator,
  updateUserDetailsController
);
router.get(
  "/getUserList/:page/:limit/:keyword",
  isLoggedIn,
  userListController
);

router.get("/friendRequest", isLoggedIn, friendRequestController);
router.get("/friends", isLoggedIn, friendsListController);
router.get("/sentFriendRequest", isLoggedIn, sentFriendRequestController);
module.exports = router;
