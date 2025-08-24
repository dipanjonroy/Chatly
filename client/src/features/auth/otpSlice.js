import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const sendRegisterOtp = createAsyncThunk(
  "auth/otp",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      const { data } = await axiosInstance.post("/send-otp", payload);
      return data?.message;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to send otp."
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

const otpSlice = createSlice({
  name: "OTP",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendRegisterOtp.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRegisterOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendRegisterOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to send OTP");
      });
  },
});

export default otpSlice.reducer;
