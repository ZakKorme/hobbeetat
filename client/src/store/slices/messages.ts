import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  unread: Array<object> | null;
  read: Array<object> | null;
};

const initialState: State = {
  unread: null,
  read: null
};

const messagesSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setUnreadMessages(
      state: State,
      action: PayloadAction<{
        unread: Array<object>;
      }>
    ) {
      state.unread = action.payload.unread;
    },
    setReadMessages(
      state: State,
      action: PayloadAction<{
        read: Array<object>;
      }>
    ) {
      state.read = action.payload.read;
    },
    clearMessages(state: State) {
      state.read = null;
      state.unread = null;
    }
  }
});

export default messagesSlice;
