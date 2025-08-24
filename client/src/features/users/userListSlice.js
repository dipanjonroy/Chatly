import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const getUserList = createAsyncThunk(
  "user/userList",
  async ({ page, limit, keyword }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.get(
        `/getUserList/${page}/${limit}/${keyword}`
      );
      const { users, total } = data;
      return { users, total };
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
  userList: [],
  totalUsers: 0,
};

const userListSlice = createSlice({
  name: "User List",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = true;
        state.userList = action.payload?.users;
        state.totalUsers = action.payload?.total;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to get users list.");
      });
  },
});

export default userListSlice.reducer;
