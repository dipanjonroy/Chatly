import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.post("/login", payload);
      return data?.message;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to login."
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);

const initialState = {
 loginPayload: {
    email: "",
    password: "",
  },

  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    addToLoginPayload: (state, action) => {
      const { name, value } = action.payload;
      state.loginPayload[name] = value;
    },

    resetLoginPayload: (state) => {
      state.loginPayload = {
        email: "",
        password: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { addToLoginPayload, resetLoginPayload } = loginSlice.actions;

export default loginSlice.reducer;
