import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "./notesTypes";
import { data } from "./intialData";

interface NotesStateType {
  notes: Note[];
  isViewingNote: boolean;
  noteInView: Note | "new" | null;
  currentPage: number;
  itemsPerPage: number;
  theme: "light" | "dark";
}

const getInitialState = (): NotesStateType => {
  const storedNotes = localStorage.getItem("notes");

  let sortedNotes: Note[] = [];

  if (storedNotes && JSON.parse(storedNotes).length > 0) {
    const parsedNotes: Note[] = JSON.parse(storedNotes);
    sortedNotes = parsedNotes.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      return dateB - dateA;
    });
  } else {
    sortedNotes = data;
  }

  // Get the theme from localStorage or use "light" as the default
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : "light";

  const initialState: NotesStateType = {
    noteInView: null,
    notes: sortedNotes,
    isViewingNote: false,
    currentPage: 1,
    itemsPerPage: 5,
    theme: initialTheme,
  };

  return initialState;
};

const initialState: NotesStateType = getInitialState();

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [action.payload, ...state.notes];
      state.currentPage = 1;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteIdToRemove = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteIdToRemove);
      state.currentPage = 1;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const updatedNote = action.payload;
      const updatedNotes = [
        updatedNote,
        ...state.notes.filter((note) => note.id !== updatedNote.id),
      ];
      state.notes = updatedNotes;
      state.currentPage = 1;
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    },
    setNoteInView: (state, action: PayloadAction<Note | "new" | null>) => {
      state.noteInView = action.payload;
    },
    setIsViewingNote: (state, action: PayloadAction<boolean>) => {
      state.isViewingNote = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearAllNotes: (state) => {
      state.notes = [];
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(state.theme));
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNote,
  setNoteInView,
  setIsViewingNote,
  setCurrentPage,
  clearAllNotes,
  toggleTheme,
} = notesSlice.actions;

export default notesSlice.reducer;
