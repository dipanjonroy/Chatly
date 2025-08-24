const { Schema, model } = require("mongoose");

const schema = new Schema({
  members: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],

  isGroup: {
    type: Boolean,
    default: false,
  },

  lastMessage: {
    content: {
      type: String,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    readBy: [
      {
        _id: false,
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
});

const ChatRoom = model("ChatRoom", schema);

module.exports = ChatRoom;
