import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "./notesTypes";

interface NotesStateType {
  notes: Note[];
  isViewingNote: boolean;
  noteInView: Note | "new" | null;
}

const getInitialState = (): NotesStateType => {
  const storedNotes = localStorage.getItem("notes");

  const initialState: NotesStateType = {
    noteInView: null,
    notes: storedNotes ? JSON.parse(storedNotes) : [],
    isViewingNote: false,
  };

  return initialState;
};

const initialState: NotesStateType = getInitialState();

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload];
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const noteIdToRemove = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteIdToRemove);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const updatedNote = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    setNoteInView: (state, action: PayloadAction<Note | "new" | null>) => {
      state.noteInView = action.payload;
    },
    setIsViewingNote: (state, action: PayloadAction<boolean>) => {
      state.isViewingNote = action.payload;
    },
  },
});

export const {
  addNote,
  removeNote,
  updateNote,
  setNoteInView,
  setIsViewingNote,
} = notesSlice.actions;

export default notesSlice.reducer;
