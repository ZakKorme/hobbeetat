import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  notes: Array<object> | null;
};

const initialState: State = {
  notes: null
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state: State, action: PayloadAction<{ notes: Array<object> }>) {
      state.notes = action.payload.notes;
    },
    createNewNote(
      state: State,
      action: PayloadAction<{
        newNote: Array<object>;
      }>
    ) {
      state.notes = [...state.notes??[], action.payload.newNote];
    },
    updateNoteTitle(
      state: State,
      action: PayloadAction<{ updatedNote: Array<object> }>
    ) {
        state.notes = [...state.notes??[], action.payload.updatedNote];
    },
    updateNote(state: State, action: PayloadAction<{ updatedNote: Array<object> }>) {
        state.notes = [...state.notes??[], action.payload.updatedNote];
    },
    clearNotes(state: State) {
      state.notes = null;
    }
  }
});

export default noteSlice;
