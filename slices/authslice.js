import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { decode } from "react-native-pure-jwt";

export const getAuthToken =
  createAsyncThunk(
    "auth/getAuthToken",
    async () => {
      try {
        const token =
          await SecureStore.getItemAsync(
            "authToken"
          );
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
    authToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    //update the global token state.
    updateToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAuthToken.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getAuthToken.fulfilled,
        (state, action) => {
          state.loading = false;
          state.authToken =
            action.payload;
        }
      )
      .addCase(
        getAuthToken.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message;
        }
      );
  },
});

export const { updateToken } =
  authSlice.actions;

export default authSlice.reducer;
