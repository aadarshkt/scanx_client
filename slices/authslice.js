import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { decode } from "react-native-pure-jwt";
import { getItem } from "../utils/localStore";

export const getAuthToken =
  createAsyncThunk(
    "auth/getAuthToken",
    async () => {
      try {
        const token = getItem("token");
        console.log(token);
        const decodedToken =
          decode(token);
        const tokenExpirationTime =
          decodedToken.exp;
        console.log(
          tokenExpirationTime
        );
        return token;
      } catch (error) {
        console.error(
          "Cannot fetch token from local storage."
        );
        return;
      }
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    //update the global token state.
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { updateToken } =
  authSlice.actions;

export default authSlice.reducer;
