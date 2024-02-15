import { useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { toast } from "react-toastify";

import Breadcrumb from "./Breadcrumb";
import Editor from "./Editor";
import Tags from "./Tags";
import Title from "./Title";
import ViewNoteActions from "./ViewNoteActions";
import {
  addNote,
  setIsViewingNote,
  setNoteInView,
  updateNote,
} from "../../slices/notesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const styles = {
  wrapper: "p-2 h-full",
  dateWrapper: "flex flex-col md:flex-row md:gap-3 mb-3",
  dateLabel: "font-medium",
  dateValue: "font-light",
  alert: "mt-3 bg-red-50 border border-red-300 text-red-400 px-4 py-3",
};

interface NoteState {
  tags: ("Personal" | "Work" | "Study" | "Important" | "To-do" | "Journal")[];
  title: string;
  text: string;
}

const ViewNote = () => {
  const { noteInView } = useAppSelector((state) => state.notes);

  const [note, setNote] = useState<NoteState>({
    tags: [],
    title: "",
    text: "",
  });

  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (noteInView && noteInView !== "new") {
      setNote({
        tags: noteInView.tags || [],
        title: noteInView.title || "",
        text: noteInView.text || "",
      });
    } else {
      setNote({ tags: [], title: "", text: "" });
    }
  }, [noteInView]);

  const handleSubmitNote = () => {
    setMessage("");

    if (!noteInView) {
      setMessage("No note found");
      return;
    }

    const { tags, title, text } = note;
    if (!title || !tags.length || !text) {
      setMessage("Please enter all fields");
      return;
    }

    if (noteInView === "new") {
      dispatch(addNote({ ...note }));
      toast.success("New note added!");
    } else {
      dispatch(updateNote({ ...noteInView, ...note }));
      toast.success("Note updated!");
    }

    dispatch(setNoteInView(null));
    dispatch(setIsViewingNote(false));
  };

  return (
    <div className={styles.wrapper} data-testid="view-note-wrapper">
      <Breadcrumb />
      <Title
        selectedTitle={note.title}
        setSelectedTitle={(newTitle) =>
          setNote((prev) => ({ ...prev, title: newTitle }))
        }
        autoFocus={noteInView === "new"}
      />
      {noteInView &&
        noteInView !== "new" &&
        noteInView.updated_at &&
        isValid(noteInView.updated_at) && (
          <div className={styles.dateWrapper}>
            <p className={styles.dateLabel}>Last Modified:</p>
            <p className={styles.dateValue}>
              {format(new Date(noteInView.updated_at), "MMMM dd, yyyy h:mm a")}
            </p>
          </div>
        )}
      <Tags
        selectedTags={note.tags}
        setSelectedTags={(tags) => setNote((prev) => ({ ...prev, tags }))}
      />
      <Editor
        selectedText={note.text}
        setSelectedText={(text) => setNote((prev) => ({ ...prev, text }))}
      />
      {message && (
        <p className={styles.alert} data-testid="note-alert">
          {message}
        </p>
      )}
      <ViewNoteActions handleSubmit={handleSubmitNote} />
    </div>
  );
};

export default ViewNote;
