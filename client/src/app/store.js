import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../features/loader/loaderSlice";
import checkAuthReducer from "../features/auth/checkAuthSlice";
import loginReducer from "../features/auth/loginSlice";
import logoutReducer from "../features/auth/logOutSlice";
import searchReducer from "../features/main/searchSlice";
import profileReducer from "../features/profile/profileSlice";
import messageReducer from "../features/chat/messageSlice";
import otpReducer from "../features/auth/otpSlice";
import registerReducer from "../features/auth/registerSlice";
import userDetailsReducer from "../features/users/userDetailsSlice";
import profileImageReducer from "../features/profile/profileImageSlice";
import userListReducer from "../features/users/userListSlice";
import notificationReducer from "../features/Notification/toastSlice";
import friendRequestReducer from "../features/users/friendRequestSlice";
import friendsReducer from "../features/users/friendsSlice";
import sentRequestReducer from "../features/users/sentRequestSlice";
import chatRoomReducer from "../features/chat/chatRoomSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,

    //Auth
    checkAuth: checkAuthReducer,
    login: loginReducer,
    logout: logoutReducer,
    otp: otpReducer,
    register: registerReducer,

    //profile
    profile: profileReducer,
    profileImage: profileImageReducer,

    //Main
    search: searchReducer,

    //Users
    userDetails: userDetailsReducer,
    userList: userListReducer,
    friendRequest: friendRequestReducer,
    friends: friendsReducer,
    sentFriendRequests: sentRequestReducer,

    notification: notificationReducer,

    //Chats
    chatRoom: chatRoomReducer,
    message: messageReducer,
  },
});

export default store;
