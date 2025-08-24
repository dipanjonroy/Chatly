const {
  createChatRoom,
  getMessages,
  getChatRooms,
} = require("../services/chatServices");
const ApiError = require("../utilities/error");

module.exports.createChatController = async (req, res) => {
  try {
    const userId = req.userId;
    const { friendId } = req.params;

    const chatRoom = await createChatRoom(userId, friendId);

    res.status(201).json({
      success: true,
      chatRoom,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.getMessagesController = async (req, res) => {
  const { chatRoomId } = req.params;
  if (!chatRoomId) throw new ApiError(403, "ChatroomId is required");

  const messages = await getMessages(chatRoomId);

  res.status(200).json({
    success: true,
    messages,
  });
};

module.exports.getChatRoomsController = async (req, res) => {
  try {
    const userId = req.userId;

    const chatRooms = await getChatRooms(userId);

    res.status(200).json({
      success: true,
      chatRooms,
    });
  } catch (error) {
    throw error;
  }
};
