import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

//CHECK AUTH
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.get("/check-auth");
      return data?.userId;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Access denied");
    } finally {
      dispatch(hideLoader());
    }
  }
);

//LOGIN
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
  user: null,
  isAuthenticated: false,

  loginPayload: {
    email: "",
    password: "",
  },

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "Auth",
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
      //CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      //LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        toast.success(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { addToLoginPayload, resetLoginPayload } = authSlice.actions;

export default authSlice.reducer;
