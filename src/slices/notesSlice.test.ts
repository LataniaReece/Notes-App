import notesReducer, {
  addNote,
  clearAllNotes,
  deleteNote,
  setCurrentPage,
  setIsViewingNote,
  setNoteInView,
  toggleTheme,
  updateNote,
} from "./notesSlice";
import { data } from "./intialData";

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
    const testNote = {
      id: "test",
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
      created_at: 1641048937090,
      updated_at: 1641057045090,
    };
    expect(notesReducer(undefined, addNote(testNote))).toEqual({
      ...initialState,
      notes: expect.arrayContaining([testNote]),
    });
  });

  it("supports deleting a note", () => {
    const testNote = {
      id: "test",
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
      created_at: 1641048937090,
      updated_at: 1641057045090,
    };
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

  it("updating a note with correct details", () => {
    const testNote = {
      id: "test",
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
      created_at: 1641048937090,
      updated_at: 1641057045090,
    };
    const updatedNote = {
      ...testNote,
      title: "Updated note",
      updated_at: 1641057045099,
    };
    // Add the testNote
    const stateAfterAdd = notesReducer(undefined, addNote(testNote));
    expect(stateAfterAdd).toEqual({
      ...initialState,
      notes: expect.arrayContaining([testNote]),
    });

    // Update the note and check the state
    const stateAfterUpdate = notesReducer(
      stateAfterAdd,
      updateNote(updatedNote)
    );
    expect(stateAfterUpdate).toEqual({
      ...initialState,
      notes: expect.arrayContaining([updatedNote]),
    });

    // Check that testNote is not present in the state
    expect(stateAfterUpdate).toEqual({
      ...initialState,
      notes: expect.not.arrayContaining([testNote]),
    });
  });

  it("supports clearing all notes", () => {
    const testNote = {
      id: "test",
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
      created_at: 1641048937090,
      updated_at: 1641057045090,
    };

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
    const testNote = {
      id: "test",
      title: "Test Note",
      text: "This is a test note",
      tags: ["Personal", "To-do"],
      created_at: 1641048937090,
      updated_at: 1641057045090,
    };

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
