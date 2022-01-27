import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationResponse } from "../../types";

type State = {
  unread: NotificationResponse | null;
  read: NotificationResponse | null;
};

const initialState: State = {
  unread: null,
  read: null
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setUnreadNotifications(
      state: State,
      action: PayloadAction<{
        unread: NotificationResponse;
      }>
    ) {
      state.unread = action.payload.unread;
    },
    setReadNotifications(
      state: State,
      action: PayloadAction<{
        read: NotificationResponse;
      }>
    ) {
      state.read = action.payload.read;
    },
    clearNotifications(state: State) {
      state.read = null;
      state.unread = null;
    }
  }
});

export default notificationSlice;
