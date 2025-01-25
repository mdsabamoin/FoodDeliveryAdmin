import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import authReducer from "./authSlice"; // Import the authSlice reducer

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer, // Add the auth slice to the store
  },
});
