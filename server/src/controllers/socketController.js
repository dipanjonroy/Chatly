const { Server } = require("socket.io");
const {
  updateUserSocketId,
  updateUserActiveStatus,
} = require("../services/userServices");
const User = require("../models/userModel");
const { sendMessage, updateReadMessage } = require("../services/chatServices");
const ChatRoom = require("../models/chatRoomModel");
const Message = require("../models/messageModel");

module.exports.connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["*"],
    },
  });

  const onlineUsers = new Map();
  const activeChats = new Map();

  io.on("connection", (socket) => {
    socket.on("user-connected", ({ userId }) => {
      onlineUsers.set(userId, socket.id);
      updateUserSocketId(userId, socket.id);
      updateUserActiveStatus(userId, true);
    });

    socket.on("send-friend-request", async ({ fromId, toId }) => {
      await User.findByIdAndUpdate(fromId, {
        $addToSet: {
          sentFriendRequest: toId,
        },
      });

      await User.findByIdAndUpdate(toId, {
        $addToSet: { friendRequest: fromId },
      });

      const toSocketId = onlineUsers.get(toId);

      if (toSocketId) {
        io.to(toSocketId).emit("receive-friend-request", { fromId });
      }
    });

    socket.on("reject-friend-request", async ({ fromId, toId }) => {
      await User.findByIdAndUpdate(fromId, {
        $pull: {
          friendRequest: toId,
        },
      });

      await User.findByIdAndUpdate(toId, {
        $pull: {
          sentFriendRequest: fromId,
        },
      });
    });

    socket.on("accept-friend-request", async ({ fromId, toId }) => {
      await User.findByIdAndUpdate(fromId, {
        $pull: {
          friendRequest: toId,
        },
        $addToSet: {
          friends: toId,
        },
      });

      await User.findByIdAndUpdate(toId, {
        $pull: {
          sentFriendRequest: fromId,
        },
        $addToSet: {
          friends: fromId,
        },
      });
    });

    socket.on("join-room", async ({ chatRoomId, userId }) => {
      activeChats.set(userId, socket.id);
      updateReadMessage(chatRoomId, userId);

      const chatRoom = await ChatRoom.findById(chatRoomId);
      for (const memberId of chatRoom.members) {
        if (memberId.toString() !== userId) {
          const friendId = memberId.toString();
          const activeRoomSocket = activeChats.get(friendId);

          if (activeRoomSocket) {
            io.to(activeRoomSocket).emit("message-seen", {
              chatRoomId,
              friendId: userId, 
            });
          }
        }
      }
    });

    socket.on(
      "send-message",
      async ({ chatRoomId, senderId, message, tempId }) => {
        try {
          const msg = await sendMessage(chatRoomId, senderId, message);

          const chatRoom = await ChatRoom.findById(chatRoomId);
          const roomMembers = chatRoom.members;

          for (const member of roomMembers) {
            if (member.toString() !== senderId) {
              const friendId = member.toString();
              const activeRoomSocket = activeChats.get(friendId);
              const isOnlineSocket = onlineUsers.get(friendId);

              if (activeRoomSocket) {
                const isAlreadySeen = msg.readBy.some(
                  (r) => r.userId.toString() === friendId
                );
                if (!isAlreadySeen) {
                  msg.readBy.push({ userId: friendId, readAt: Date.now() });
                  await msg.save();
                }

                const isLastMsgSeen = chatRoom.lastMessage.readBy.some(
                  (r) => r.userId.toString() === friendId
                );
                if (!isLastMsgSeen) {
                  chatRoom.lastMessage.readBy.push({
                    userId: friendId,
                    readAt: Date.now(),
                  });
                  await chatRoom.save();
                }
              }

              const senderSocket =
                activeChats.get(senderId) || onlineUsers.get(senderId);
              if (senderSocket) {
                io.to(senderSocket).emit("message-sent", { tempId, msg });
              }

              if (activeRoomSocket || isOnlineSocket) {
                io.to(activeRoomSocket || isOnlineSocket).emit(
                  "receive-message",
                  {
                    msg,
                    friendId,
                    chatRoomId,
                  }
                );
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          updateUserActiveStatus(userId, false);
          activeChats.delete(userId);
          break;
        }
      }
    });
  });
};
