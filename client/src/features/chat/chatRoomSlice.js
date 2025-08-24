import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../libs/axios";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import toast from "react-hot-toast";

export const openRoom = createAsyncThunk(
  "chat/chatRoom",
  async (friendId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      const { data } = await axiosInstance.get(`/createChatRoom/${friendId}`);

      return data?.chatRoom;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const getChatRooms = createAsyncThunk(
  "chat/GetChatRooms",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.get("/getChatRooms");
      return data?.chatRooms;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  chatRoom: {},

  chatRoomsLoading: false,
  chatRoomsError: null,
  chatRoomsList: [],
};

const chatRoomSlice = createSlice({
  name: "Chatroom",
  initialState,
  reducers: {
    addLastMessage: (state, action) => {
      const { chatRoomId, lastMessage } = action.payload;
      const room = state.chatRoomsList.find((r) => r._id === chatRoomId);

      if (room) {
        room.lastMessage = lastMessage;
      }
    },

    addMessageSeen: (state, action) => {
      const { chatRoomId, userId } = action.payload;
      const room = state.chatRoomsList.find((r) => r._id.toString() === chatRoomId);


      if (room && room.lastMessage) {
        const alreadySeen = room.lastMessage?.readBy.some(
          (r) => r.userId === userId
        );

        if (!alreadySeen) {
          room.lastMessage.readBy.push({
            userId,
            readAt: Date.now(),
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(openRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.chatRoom = action.payload;
      })
      .addCase(openRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Something wrong");
      })

      .addCase(getChatRooms.pending, (state) => {
        state.chatRoomsLoading = true;
        state.chatRoomsError = null;
      })
      .addCase(getChatRooms.fulfilled, (state, action) => {
        state.chatRoomsLoading = false;
        state.chatRoomsList = action.payload;
      })
      .addCase(getChatRooms.rejected, (state, action) => {
        state.chatRoomsLoading = false;
        state.chatRoomsError = action.payload;
        toast.error(action.payload || "Something error.");
      });
  },
});

export const { addLastMessage, addMessageSeen } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
