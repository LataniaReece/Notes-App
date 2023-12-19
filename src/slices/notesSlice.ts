import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "./notesTypes";

interface NotesStateType {
  currentNote: Note | null;
  notes: Note[] | [];
}

// Check localStorage for inital state or set to empty values
const getInitialState = (): NotesStateType => {
  const storedCurrentNote = localStorage.getItem("currentNote");
  const storedNotes = localStorage.getItem("notes");

  const initialState: NotesStateType = {
    currentNote: storedCurrentNote ? JSON.parse(storedCurrentNote) : null,
    notes: storedNotes ? JSON.parse(storedNotes) : [],
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
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const noteIdToRemove = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteIdToRemove);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const updatedNote = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
    },
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, setCurrentNote } =
  notesSlice.actions;

export default notesSlice.reducer;
