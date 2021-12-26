import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupResponse } from "../../types";

type State = {
  info: GroupResponse | null;
  posts: Array<object> | null;
  events: Array<object> | null;
  pictures: Array<object> | null;
  videos: Array<object> | null;
  documents: Array<object> | null;
};

const initialState: State = {
  info: null,
  posts: null,
  events: null,
  pictures: null,
  videos: null,
  documents: null
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupInfo(state: State, action: PayloadAction<{ info: GroupResponse }>) {
      state.info = action.payload.info;
    },
    setGroup(
      state: State,
      action: PayloadAction<{ posts: Array<object>; events: Array<object> }>
    ) {
      state.posts = action.payload.posts;
      state.events = action.payload.events;
    },
    setGroupResources(
      state: State,
      action: PayloadAction<{ pictures: Array<object>; videos: Array<object> }>
    ) {
      state.pictures = action.payload.pictures;
      state.videos = action.payload.videos;
    },
    clearGroup(state: State) {
      state.info = null;
      state.posts = null;
      state.events = null;
      state.pictures = null;
      state.videos = null;
      state.documents = null;
    }
  }
});

export default groupSlice;
