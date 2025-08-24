import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const getUserDetails = createAsyncThunk(
  "user/userDetails",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.get(`/getUserDetails/${userId}`);

      return data?.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get user details."
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);

const initialState = {
  loading: false,
  error: null,

  user: {},
};

const userDetailsSlice = createSlice({
  name: "User Details",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to get user details.");
      });
  },
});

export default userDetailsSlice.reducer;
