import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountResponse } from "../../types";

type State = {
  token: string | null;
  refreshToken: string | null;
  account: AccountResponse | null;
  hobbies: Array<string> | null;
  groups: Array<string> | null;
};

const initialState: State = {
  token: null,
  refreshToken: null,
  account: null,
  hobbies: null,
  groups: null
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
      action: PayloadAction<{
        user: AccountResponse;
        hobbies: Array<string>;
        groups: Array<string>;
      }>
    ) {
      state.account = action.payload.user;
      state.hobbies = action.payload.hobbies;
      state.groups = action.payload.groups;
    },
    logout(state: State) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
      state.hobbies = null;
      state.groups = null;
    }
  }
});

export default authSlice;
