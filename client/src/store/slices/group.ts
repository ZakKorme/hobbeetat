import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupResponse } from "../../types";

type State = {
  info: GroupResponse | null;
  posts: Array<object> | null;
  events: Array<object> | null;
  pictures: Array<object> | null;
  videos: Array<object> | null;
  documents: Array<object> | null;
  links: Array<object> | null;
};

const initialState: State = {
  info: null,
  posts: null,
  events: null,
  pictures: null,
  videos: null,
  documents: null,
  links: null
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
      action: PayloadAction<{
        pictures: Array<object>;
        videos: Array<object>;
        documents: Array<object>;
        posts: Array<object>;
        events: Array<object>;
        links: Array<object>;
      }>
    ) {
      state.pictures = action.payload.pictures;
      state.videos = action.payload.videos;
      state.documents = action.payload.documents;
      state.posts = action.payload.posts;
      state.events = action.payload.events;
      state.links = action.payload.links;
    },
    setGroupEvent(
      state: State,
      action: PayloadAction<{ events: Array<object> }>
    ) {
      state.events = action.payload.events;
    },
    clearGroup(state: State) {
      state.info = null;
      state.posts = null;
      state.events = null;
      state.pictures = null;
      state.videos = null;
      state.documents = null;
      state.links = null;
    }
  }
});

export default groupSlice;
