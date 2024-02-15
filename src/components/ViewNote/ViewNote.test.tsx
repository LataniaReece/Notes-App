import { PropsWithChildren, ReactElement } from "react";
import { describe, it, expect, vi } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

import ViewNote from "./ViewNote";
import notesReducer from "../../slices/notesSlice";

// Mock the react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

// Mock the TinyMCE React component
vi.mock("@tinymce/tinymce-react", () => ({
  Editor: vi.fn(({ onEditorChange, value, init }) => (
    <textarea
      data-testid="mocked-editor"
      value={value}
      onChange={(e) => onEditorChange(e.target.value)}
      style={{ height: init.height }}
    />
  )),
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

describe("ViewNote Component", () => {
  it("renders component", () => {
    render(<ViewNote />);
    const viewNoteEl = screen.getByTestId("view-note-wrapper");
    expect(viewNoteEl).toBeInTheDocument();
  });

  it("displays message when required fields are missing", async () => {
    const initialState = {
      notes: {
        noteInView: "new",
      },
    };
    render(<ViewNote />, { initialState });

    const submitButton = screen.getByTestId("note-submit");
    await userEvent.click(submitButton);

    expect(screen.getByTestId("note-alert")).toHaveTextContent(
      "Please enter all fields"
    );

    // Try with just one field
    const titleInput = screen.getByTestId("note-title-input");
    await userEvent.type(titleInput, "Test Title");

    expect(screen.getByTestId("note-alert")).toHaveTextContent(
      "Please enter all fields"
    );
  });

  it("calls toast.success when a new note is added", async () => {
    const initialState = {
      notes: {
        noteInView: "new",
        notes: [],
      },
    };
    render(<ViewNote />, { initialState });

    const titleInput = screen.getByTestId("note-title-input");
    const personalTag = screen.getByTestId("tag-button-Personal");
    const submitButton = screen.getByTestId("note-submit");

    await userEvent.type(titleInput, "Test Title");
    await userEvent.click(personalTag);
    // Interact with the mocked editor instead of TinyMCE
    const mockedEditor = screen.getByTestId("mocked-editor");
    await userEvent.type(mockedEditor, "Test Text");

    await userEvent.click(submitButton);

    screen.debug();
    expect(toast.success).toHaveBeenCalledWith("New note added!");
  });

  it("updates the store with the new note details", async () => {
    const initialNote = {
      id: "1",
      title: "Initial Title",
      text: "Initial Text",
      tags: ["Personal", "Work"],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const initialState = {
      notes: {
        noteInView: initialNote,
        notes: [initialNote],
      },
    };

    const { store } = render(<ViewNote />, { initialState });

    const state = store.getState();
    const initialNoteFromState = state.notes.notes.find(
      (note: Note) => note.id === initialNote.id
    );

    expect(initialNoteFromState).toBeDefined();
    expect(initialNoteFromState.title).toBe("Initial Title");
    expect(initialNoteFromState.text).toBe("Initial Text");

    const titleInput = screen.getByTestId("note-title-input");
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated Title");

    const mockedEditor = screen.getByTestId("mocked-editor");
    await userEvent.clear(mockedEditor);
    await userEvent.type(mockedEditor, "Updated Text");

    const submitButton = screen.getByTestId("note-submit");
    await userEvent.click(submitButton);

    expect(toast.success).toHaveBeenCalledWith("Note updated!");

    const updatedsState = store.getState();
    const updatedNote = updatedsState.notes.notes.find(
      (note: Note) => note.id === initialNote.id
    );

    expect(updatedNote).toBeDefined();
    expect(updatedNote.title).toBe("Updated Title");
    expect(updatedNote.text).toBe("Updated Text");
  });
});
