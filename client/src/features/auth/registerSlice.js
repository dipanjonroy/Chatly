import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      const { data } = await axiosInstance.post("/register", payload);
      return data?.message;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to register."
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

  registerPayload: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    otp: "",
  },
};

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    addToRegisterPayload: (state, action) => {
      const { name, value } = action.payload;
      state.registerPayload[name] = value;
    },

    resetRegisterPayload: (state) => {
      state.registerPayload = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        otp: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to register.");
      });
  },
});

export const { addToRegisterPayload, resetRegisterPayload } =
  registerSlice.actions;
export default registerSlice.reducer;
