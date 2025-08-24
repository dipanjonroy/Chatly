const express = require("express");
const { isLoggedIn } = require("../middlewares/authChecker");
const {
  createChatController,
  getMessagesController,
  getChatRoomsController,
} = require("../controllers/chatControllers");
const router = express.Router();

router.get("/createChatRoom/:friendId", isLoggedIn, createChatController);
router.get("/getMessages/:chatRoomId", isLoggedIn, getMessagesController);
router.get("/getChatRooms", isLoggedIn, getChatRoomsController);

module.exports = router;
