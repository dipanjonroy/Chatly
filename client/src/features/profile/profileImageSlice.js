import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "../loader/loaderSlice";
import axiosInstance from "../../libs/axios";
import toast from "react-hot-toast";

export const uploadProfileImage = createAsyncThunk(
  "Upload/profileImg",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.post("/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data?.message;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to upload profile image."
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const deleteProfileImage = createAsyncThunk(
  "delete/profileImg",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const { data } = await axiosInstance.delete("/deleteProfileImage", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data?.message;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete profile image."
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const profileImageSlice = createSlice({
  name: "ProfileImage",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to upload image.");
      })
      
      .addCase(deleteProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileImageSlice.reducer;
