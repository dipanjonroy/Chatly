import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";

export const getFriends = createAsyncThunk(
  "user/friends",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      const { data } = await axiosInstance("/friends");
      return data.friendsList;
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
  friendsList: [],
};

const friendsSlice = createSlice({
  name: "FriendList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friendsList = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default friendsSlice.reducer;
