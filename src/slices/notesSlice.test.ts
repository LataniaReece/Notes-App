import { vi } from "vitest";
import { data } from "./intialData";
import notesReducer, {
  addNote,
  clearAllNotes,
  createNote,
  deleteNote,
  setCurrentPage,
  setIsViewingNote,
  setNoteInView,
  toggleTheme,
  updateNote,
} from "./notesSlice";

describe("Notes Reducer", () => {
  const initialState = {
    currentPage: 1,
    isViewingNote: false,
    itemsPerPage: 5,
    noteInView: null,
    notes: data,
    theme: "light",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("returns initial state when called with undefined state and an unknown action", () => {
    expect(notesReducer(undefined, { type: "noop" })).toEqual(initialState);
  });

  it("supports adding a note with correct details", () => {
    const testNote = createNote({
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
    });
    expect(notesReducer(undefined, addNote(testNote))).toEqual({
      ...initialState,
      notes: expect.arrayContaining([testNote]),
    });
  });

  it("supports deleting a note", () => {
    const testNote = createNote({
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
    });
    const stateAfterAdd = notesReducer(undefined, addNote(testNote));
    expect(stateAfterAdd).toEqual({
      ...initialState,
      notes: expect.arrayContaining([testNote]),
    });

    expect(notesReducer(stateAfterAdd, deleteNote(testNote.id))).toEqual({
      ...initialState,
      notes: expect.not.arrayContaining([testNote]),
    });
  });

  it("updating a note with correct details", async () => {
    const testNote = createNote({
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
    });

    // Add the testNote
    const stateAfterAdd = notesReducer(undefined, addNote(testNote));
    expect(stateAfterAdd).toEqual({
      ...initialState,
      notes: expect.arrayContaining([testNote]),
    });

    // Speed time up so that when we update, updated_at is different than created_at as we expect in real world
    vi.useFakeTimers();
    vi.advanceTimersByTime(20000);

    // Update the note and check the state
    const updatedNoteTitle = "Updated Test Note!";
    const stateAfterUpdate = notesReducer(
      stateAfterAdd,
      updateNote({ ...testNote, title: updatedNoteTitle })
    );

    const updatedNote = stateAfterUpdate.notes.find(
      (note) => note.title === updatedNoteTitle
    );
    expect(stateAfterUpdate).toEqual({
      ...initialState,
      notes: expect.arrayContaining([updatedNote]),
    });
    // Check that original testNote is not present in the state
    expect(stateAfterUpdate).toEqual({
      ...initialState,
      notes: expect.not.arrayContaining([testNote]),
    });
    // Make sure updated_at was updated
    if (updatedNote) {
      expect(updatedNote.updated_at).not.toEqual(testNote.updated_at);
    } else {
      throw new Error("Updated note is undefined");
    }
  });

  it("supports clearing all notes", () => {
    const testNote = createNote({
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
    });

    // Check clearAll with no added notes
    expect(notesReducer(undefined, clearAllNotes())).toEqual({
      ...initialState,
      notes: [],
    });

    // Add a test note and check clearAll
    const stateAfterAdd = notesReducer(undefined, addNote(testNote));
    expect(stateAfterAdd).toEqual({
      ...initialState,
      notes: expect.arrayContaining([testNote]),
    });
    expect(notesReducer(stateAfterAdd, clearAllNotes())).toEqual({
      ...initialState,
      notes: [],
    });
  });

  it("should set noteInView correctly", () => {
    const testNote = createNote({
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
    });

    expect(notesReducer(undefined, setNoteInView("new"))).toEqual({
      ...initialState,
      noteInView: "new",
    });
    expect(notesReducer(undefined, setNoteInView(testNote))).toEqual({
      ...initialState,
      noteInView: testNote,
    });
  });

  it("should set isViewingNote correctly", () => {
    expect(notesReducer(undefined, setIsViewingNote(true))).toEqual({
      ...initialState,
      isViewingNote: true,
    });
  });

  it("should set currentPage correctly", () => {
    expect(notesReducer(undefined, setCurrentPage(2))).toEqual({
      ...initialState,
      currentPage: 2,
    });
  });

  it("should set theme correctly", () => {
    const toggleToDarkState = notesReducer(undefined, toggleTheme());

    expect(toggleToDarkState).toEqual({
      ...initialState,
      theme: "dark",
    });
    expect(notesReducer(toggleToDarkState, toggleTheme())).toEqual({
      ...initialState,
      theme: "light",
    });
  });
});
