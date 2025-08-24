import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "../loader/loaderSlice";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.get("/check-auth");
      return data?.user;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Access denied");
    } finally {
      dispatch(hideLoader());
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,

  loading: false,
  error: null,
};

const checkAuthSlice = createSlice({
  name: "Check Auth",
  initialState,

  extraReducers: (builder) => {
    builder

      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user= action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export default checkAuthSlice.reducer;
