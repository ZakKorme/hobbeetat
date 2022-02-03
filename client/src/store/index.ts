import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/auth";
import hobbySlice from "./slices/hobby";
import groupSlice from "./slices/group";
import noteSlice from "./slices/notes";
import notificationSlice from "./slices/notifications";
import messagesSlice from "./slices/messages";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  hobby: hobbySlice.reducer,
  group: groupSlice.reducer,
  note: noteSlice.reducer,
  notification: notificationSlice.reducer,
  message: messagesSlice.reducer
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: storage
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;

export default store;
