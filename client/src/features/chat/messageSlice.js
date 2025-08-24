import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const getMessages = createAsyncThunk(
  "chat/getMessage",
  async(chatRoomId, {dispatch, rejectWithValue})=>{
    try {
      dispatch(showLoader());

      const {data} = await axiosInstance.get(`/getMessages/${chatRoomId}`);
      return data?.messages
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
)

const initialState = {
  loading:false,
  error:null,
  messages: [],
  friendInfo:{}
};

const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    addFriendInfo: (state,action)=>{
      state.friendInfo = action.payload;
    },

    markMessageAsRead: (state,action)=>{
      const {senderId} = action.payload;
      state.messages = state.messages.map(msg => {
        const alreadySeen = msg.readBy?.some(r => r.userId === senderId);
        if(!alreadySeen){
          return {
            ...msg,
            readBy: [...msg.readBy, {userId: senderId, readAt: Date.now()}]
          }
        }

        return msg;
      })

    },

    updateMessage: (state,action)=>{
      const {tempId,msg } = action.payload;
      const index = state.messages.findIndex(m => m._id === tempId);

      if(index !== -1){
        state.messages[index] = msg;
      } else {
        state.messages.push(msg)
      }
    }
  },
  extraReducers: (builder)=>{
    builder
    .addCase(getMessages.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(getMessages.fulfilled, (state, action)=>{
      state.loading = true;
      state.messages = action.payload;
    })
    .addCase(getMessages.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload || "Something wrong.")
    })
  }
});

export const { addMessage,addFriendInfo,markMessageAsRead, updateMessage } = messageSlice.actions;
export default messageSlice.reducer;
