import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const updateUser = createAsyncThunk(
  "user/update",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.put("/updateUserDetails", payload);
      return data?.message;
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
};

const updateProfileSlice = createSlice({
  name: "Update user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to update profile.");
      });
  },
});

export default updateProfileSlice.reducer;
