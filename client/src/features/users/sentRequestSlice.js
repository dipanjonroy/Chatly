import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";

export const getSentFriendRequests = createAsyncThunk(
  "user/sentFriendRequest",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      const { data } = await axiosInstance("/sentFriendRequest");
      return data.sentFriendRequestList;
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
  sentFriendRequestList: [],
};

const sentRequestSlice = createSlice({
  name: "SentFriendRequest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSentFriendRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSentFriendRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.sentFriendRequestList = action.payload;
      })
      .addCase(getSentFriendRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sentRequestSlice.reducer;
