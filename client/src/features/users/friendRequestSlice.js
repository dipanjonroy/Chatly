import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";

export const getFriendRequests = createAsyncThunk(
  "user/friendRequest",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      const { data } = await axiosInstance("/friendRequest");
      return data.friendRequest;
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
  friendRequests: [],
};

const friendRequestSlice = createSlice({
  name: "FriendRequest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFriendRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.friendRequests = action.payload;
      })
      .addCase(getFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default friendRequestSlice.reducer;
