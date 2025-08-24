import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

const notificationSlice = createSlice({
  name: "Toast",
  initialState,
  reducers: {
    showNotification: (state) => {
      state.visible = true;
    },

    hideNotification: (state) => {
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
