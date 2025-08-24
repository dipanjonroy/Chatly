const ChatRoom = require("../models/chatRoomModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const ApiError = require("../utilities/error");
const mongoose = require("mongoose");

module.exports.createChatRoom = async (userId, friendId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found.");

    if (!user.friends.includes(friendId))
      throw new ApiError(403, "You can only chat with your friend.");

    let chatRoom = await ChatRoom.findOne({
      members: { $all: [userId, friendId], $size: 2 },
      isGroup: false,
    });

    if (!chatRoom) {
      chatRoom = await ChatRoom.create({
        members: [userId, friendId],
        isGroup: false,
      });
    }

    return chatRoom;
  } catch (error) {
    throw error;
  }
};

module.exports.sendMessage = async (chatRoomId, senderId, text) => {
  try {
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) throw new ApiError(404, "Chatroom not found.");

    if (!chatRoom.members.includes(senderId))
      throw new ApiError(403, "Not allowed to send messages here.");

    const newMessage = await Message.create({
      chatRoom: chatRoomId,
      sender: senderId,
      message: text,
      readBy: [{ userId: senderId, readAt: Date.now() }],
    });

    chatRoom.lastMessage = {
      content: text,
      sender: senderId,
      isRead: false,
      readBy: [{ userId: senderId, readAt: Date.now() }],
      timestamp: Date.now(),
    };

    await chatRoom.save();

    const message = await Message.findById(newMessage._id).populate(
      "sender",
      "name profileImage"
    );

    return message;
  } catch (error) {
    throw error;
  }
};

module.exports.getMessages = async (chatRoomId) => {
  try {
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) throw new ApiError(404, "Chatroom not found.");

    const messages = await Message.find({ chatRoom: chatRoomId })
      .populate("sender", "name profileImage")
      .sort({ createdAt: 1 });

    return messages;
  } catch (error) {
    throw error;
  }
};

module.exports.getChatRooms = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found.");

    const myId = new mongoose.Types.ObjectId(userId);

    const pipeline = [
      {
        $match: {
          members: { $in: [myId] },
        },
      },

      {
        $addFields: {
          friendId: {
            $first: {
              $filter: {
                input: "$members",
                as: "member",
                cond: { $ne: ["$$member", myId] },
              },
            },
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "friendId",
          foreignField: "_id",
          as: "friend",
        },
      },

      {
        $unwind: "$friend",
      },

      {
        $project: {
          _id: 1,
          isGroup: 1,
          lastMessage: 1,
          isRead: 1,
          readBy: 1,
          friend: {
            _id: "$friend._id",
            name: {
              $concat: ["$friend.name.firstName", " ", "$friend.name.lastName"],
            },
            profileImage: "$friend.profileImage.url",
            isOnline: 1,
          },
        },
      },
    ];

    const chatRooms = await ChatRoom.aggregate(pipeline);

    return chatRooms;
  } catch (error) {
    throw error;
  }
};

module.exports.updateReadMessage = async (chatRoomId, userId) => {
  try {
    const messages = await Message.find({ chatRoom: chatRoomId });

    for (const msg of messages) {
      const alreadyReadMessages = msg.readBy.some((m) => m.userId === userId);
      if (!alreadyReadMessages) {
        msg.readBy.push({ userId, readAt: Date.now() });
        await msg.save();
      }
    }

    const chatRoom = await ChatRoom.findById(chatRoomId);

    if(chatRoom){
      const alreadySeen = chatRoom.lastMessage.readBy.some(r=>r.userId.toString() === userId);
      if(!alreadySeen){
        chatRoom.lastMessage.readBy.push({userId, readAt: Date.now()})
      }
    }
  } catch (error) {
    throw error;
  }
};
