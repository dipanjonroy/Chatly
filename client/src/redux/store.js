import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./stateSlice/loaderSlice";
import authReducer from "./stateSlice/authSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
  },
});
