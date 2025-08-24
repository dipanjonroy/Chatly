import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.get("/logout");

      return data.message;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to log out."
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const logoutSlice = createSlice({
  name: "Logout",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logOut.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to log out.");
      });
  },
});

export default logoutSlice.reducer;
