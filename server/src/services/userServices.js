const User = require("../models/userModel");
const ApiError = require("../utilities/error");
const mongoose = require("mongoose");

module.exports.getUserDetails = async (userId) => {
  try {
    const user = await User.findById(userId).select("-__v");
    if (!user) throw new ApiError(404, "User not found.");

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.updateUserDetails = async (userId, firstName, lastName) => {
  try {
    const isUser = await User.exists({ _id: userId });
    if (!isUser) throw new ApiError(401, "User not found.");

    await User.findByIdAndUpdate(userId, { name: { firstName, lastName } });

    return;
  } catch (error) {
    throw error;
  }
};

module.exports.getUsersList = async (userId, page, limit, keyword) => {
  try {
    const pipeline = [
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(userId) },
        },
      },
      {
        $addFields: {
          fullname: {
            $concat: ["$name.firstName", " ", "$name.lastName"],
          },
          image: "$profileImage.url",
        },
      },

      {
        $project: {
          _id: 1,
          fullname: 1,
          image: 1,
        },
      },
    ];

    if (keyword !== "0") {
      pipeline.push({
        $match: {
          fullname: { $regex: keyword.trim(), $options: "i" },
        },
      });
    }

    const count = [...pipeline, { $count: "total" }];
    const countResult = await User.aggregate(count);
    const total = countResult[0]?.total || 0;

    if (total === 0) {
      return {
        users: [],
        total: 0,
      };
    }

    let users;
    let totalPages;

    if (Number(limit) === 0) {
      users = await User.aggregate(pipeline);
      totalPages = 1;
    } else {
      const skip = (Number(page) - 1) * Number(limit);
      pipeline.push({ $skip: skip }, { $limit: Number(limit) });
      users = await User.aggregate(pipeline);
      totalPages = Math.ceil(total / Number(limit));
    }

    if (Number(page) > totalPages)
      throw new ApiError(400, "Page number is not exist.");
    // if (Number(limit) > total)
    //   throw new ApiError(400, "Limit of purchase is exceed.");

    return { users, total };
  } catch (error) {
    throw error;
  }
};

module.exports.updateUserSocketId = async (userId, socketId) => {
  try {
    const isExist = await User.exists({ _id: userId });
    if (!isExist) throw new ApiError(404, "User not found.");

    await User.findByIdAndUpdate(userId, { socketId });
    return;
  } catch (error) {
    throw error;
  }
};

module.exports.updateUserActiveStatus = async (userId, status) => {
  try {
    const isExist = await User.exists({ _id: userId });
    if (!isExist) throw new ApiError(404, "User not found.");

    await User.findByIdAndUpdate(userId, { isOnline: status });
    return;
  } catch (error) {
    throw error;
  }
};

module.exports.getFriendRequest = async (userId) => {
  try {
    const user = await User.findById(userId).populate(
      "friendRequest",
      "name profileImage"
    );
    if (!user) throw new ApiError(404, "User not found.");

    return user.friendRequest;
  } catch (error) {
    throw error;
  }
};

module.exports.getFriends = async (userId) => {
  try {
    const user = await User.findById(userId).populate(
      "friends",
      "name profileImage"
    );
    if (!user) throw new ApiError(404, "User not found.");

    return user.friends;
  } catch (error) {
    throw error;
  }
};

module.exports.getSentFriendRequests= async (userId) => {
  try {
    const user = await User.findById(userId).populate(
      "sentFriendRequest",
      "name profileImage"
    );
    if (!user) throw new ApiError(404, "User not found.");

    return user.sentFriendRequest;
  } catch (error) {
    throw error;
  }
};

