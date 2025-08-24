const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },

  strategy: {
    type: String,
  },

  profileImage: {
    url: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },

  socketId: {
    type: String,
  },

  isOnline: {
    type: Boolean,
    default: false,
  },

  lastSeen: {
    type: String,
    default: Date.now,
  },

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  friendRequest: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  sentFriendRequest: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]

});

const User = model("User", schema);

module.exports = User;
