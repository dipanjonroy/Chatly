import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showLoader } from "./loaderSlice";
import axiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";

//Auth Guard API
export const checkAuth = createAsyncThunk(
  "CheckAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const response = await axiosInstance.get("/check-auth");
      const { success, user } = response?.data;

      if (success) {
        return user;
      } else {
        return rejectWithValue("Access denied.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Access denied.");
    }
  }
);

// Login API
export const login = createAsyncThunk(
  "Login",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const response = await axiosInstance.post("/login", payload);
      const { success, message } = response?.data;
      if (success) {
        return message;
      }
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const initialState = {
  userId: null,

  loginPayload: {
    email: "",
    password: "",
  },
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

      //Auth guard
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userId = action.payload;
      })
      .addCase(checkAuth.rejected, (action) => {
        toast.error(action.payload || "Access denied.");
      })

      //Login
      .addCase(login.fulfilled, (state, action) => {
        toast.success(action.payload || "Logged in successfully");
      })
      .addCase(login.rejected, (state, action) => {
       
        toast.error(action.payload);
      });
  },
});

export const { addToLoginPayload, resetLoginPayload } = authSlice.actions;

export default authSlice.reducer;
