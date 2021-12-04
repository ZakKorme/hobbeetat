import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  currentHobby: string | null;
  groups: Array<object> | null;
  events: Array<object> | null;
  posts: Array<object> | null;
};

const initialState: State = {
  currentHobby: null,
  groups: null,
  events: null,
  posts: null
};

const hobbySlice = createSlice({
  name: "hobby",
  initialState,
  reducers: {
    setHobby(state: State, action: PayloadAction<{ hobby: string }>) {
      state.currentHobby = action.payload.hobby;
    },
    setHobbyGroups(
      state: State,
      action: PayloadAction<{
        groups: Array<object>;
      }>
    ) {
      state.groups = action.payload.groups;
    },
    setHobbyPosts(
      state: State,
      action: PayloadAction<{
        posts: Array<object>;
      }>
    ) {
      state.posts = action.payload.posts;
    },
    setHobbyEvents(
      state: State,
      action: PayloadAction<{
        events: Array<object>;
      }>
    ) {
      state.events = action.payload.events;
    },
    clearHobby(state: State) {
      state.currentHobby = null;
      state.groups = null;
      state.events = null;
      state.posts = null;
    }
  }
});

export default hobbySlice;
