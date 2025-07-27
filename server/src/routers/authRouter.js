const express = require("express");
const {
  sendOtpController,
  registerUserController,
  loginUserController,
  logOutUserController,
  authChekerController,
} = require("../controllers/authController");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../middlewares/validators");
const { isLoggedIn, isLoggedOut } = require("../middlewares/authChecker");
const router = express.Router();

router.post("/send-otp", isLoggedOut, userRegisterValidator, sendOtpController);

router.post(
  "/register",
  isLoggedOut,
  userRegisterValidator,
  registerUserController
);

router.post("/login", isLoggedOut, userLoginValidator, loginUserController);

router.get("/logout", isLoggedIn, logOutUserController);

router.get("/check-auth", isLoggedIn, authChekerController)

module.exports = router;
