import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";

export default store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
