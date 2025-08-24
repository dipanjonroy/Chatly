import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showProfile: false,
  isEditProfile: false,
  showNotificationBox: false,
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setShowProfile: (state, action) => {
      state.showProfile = action.payload;
    },

    setIsEditProfile: (state, action) => {
      state.isEditProfile = action.payload;
    },

    toggleNotificationBox: (state) => {
      state.showNotificationBox = !state.showNotificationBox;
    },
    closeNotificationBox: (state) => {
      state.showNotificationBox = false;
    },
  },
});

export const {
  setShowProfile,
  setIsEditProfile,
  toggleNotificationBox,
  closeNotificationBox,
} = profileSlice.actions;
export default profileSlice.reducer;
