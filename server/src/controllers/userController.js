const {
  getUserDetails,
  updateUserDetails,
  getUsersList,
  getFriendRequest,
  getFriends,
  getSentFriendRequests,
} = require("../services/userServices");
const ApiError = require("../utilities/error");

module.exports.getUserDetailsController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new ApiError(403, "User ID is required.");

    const user = await getUserDetails(userId);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.updateUserDetailsController = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName } = req.body;

    await updateUserDetails(userId, firstName, lastName);

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (error) {
    throw error;
  }
};

module.exports.userListController = async (req, res) => {
  try {
    const { page = 1, limit = 0, keyword = "0" } = req.params;
    const userId = req.userId;

    const { users, total } = await getUsersList(userId, page, limit, keyword);

    res.status(200).json({
      success: true,
      users,
      total,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.friendRequestController = async (req, res) => {
  try {
    const userId = req.userId;

    const friendRequest = await getFriendRequest(userId);

    res.status(200).json({
      success: true,
      friendRequest,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.friendsListController = async (req, res) => {
  try {
    const userId = req.userId;
    const friendsList = await getFriends(userId);

    res.status(200).json({
      success: true,
      friendsList
    })
  } catch (error) {
    throw error
  }
};

module.exports.sentFriendRequestController = async (req, res) => {
  try {
    const userId = req.userId;
    const sentFriendRequestList = await getSentFriendRequests(userId);

    res.status(200).json({
      success: true,
      sentFriendRequestList
    })
  } catch (error) {
    throw error
  }
};
