import { PropsWithChildren, ReactElement } from "react";
import { describe, it, expect, vi } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

import NotesList from "./NotesList";
import notesReducer from "../../slices/notesSlice";

// Mock the react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

const render = (
  ui: ReactElement,
  { initialState = {}, ...renderOptions } = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const store = configureStore({
    reducer: { notes: notesReducer },
    preloadedState: initialState,
  });

  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

describe("NotesList Component", () => {
  it("renders component", () => {
    render(<NotesList />);
    const notesList = screen.getByTestId("notes-list");
    expect(notesList).toBeInTheDocument();
  });

  it("sets a note in view when clicked", async () => {
    const note = {
      id: "1",
      title: "Test Note",
      text: "Content",
      tags: [],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    const initialState = {
      notes: {
        notes: [note],
        noteInView: null,
        isViewingNote: false,
        currentPage: 1,
        itemsPerPage: 5,
      },
    };
    const { store } = render(<NotesList />, { initialState });
    const notesList = screen.getByTestId("notes-list");
    expect(notesList).toBeInTheDocument();
    expect(notesList).toHaveTextContent(note.title);

    const noteElement = screen.getByTestId(`note-${note.id}`);
    await userEvent.click(noteElement);

    const state = store.getState();
    expect(state.notes.noteInView).toEqual(note);
    expect(state.notes.isViewingNote).toEqual(true);
  });

  it("deletes a note when the delete button is clicked and confirmed", async () => {
    const notes = [
      {
        id: "1",
        title: "Test Note 1",
        text: "Content",
        tags: [],
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Test Note 2",
        text: "Content",
        tags: [],
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ];
    const initialState = {
      notes: {
        notes,
        noteInView: null,
        isViewingNote: false,
        currentPage: 1,
        itemsPerPage: 5,
      },
    };
    const { store } = render(<NotesList />, { initialState });
    await userEvent.click(screen.getByTestId(`delete-button-${notes[0].id}`));
    await userEvent.click(screen.getByTestId("confirm-button"));

    expect(toast.success).toHaveBeenCalledWith("Note deleted!");

    const state = store.getState();
    expect(state.notes.notes).toHaveLength(1);
    expect(state.notes.notes[0].id).toBe("2");
  });
});
