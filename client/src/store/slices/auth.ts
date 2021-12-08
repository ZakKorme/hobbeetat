import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountResponse } from "../../types";

type State = {
  token: string | null;
  refreshToken: string | null;
  account: AccountResponse | null;
  hobbies: Array<string> | null;
};

const initialState: State = {
  token: null,
  refreshToken: null,
  account: null,
  hobbies: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: State,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
    },
    setAccount(
      state: State,
      action: PayloadAction<{ user: AccountResponse; hobbies: Array<string> }>
    ) {
      state.account = action.payload.user;
      state.hobbies = action.payload.hobbies;
    },
    logout(state: State) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
      state.hobbies = null;
    }
  }
});

export default authSlice;
