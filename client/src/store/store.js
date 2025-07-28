import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loaderSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    loader: loadingReducer,
    auth: authReducer,
  },
});

export default store;
