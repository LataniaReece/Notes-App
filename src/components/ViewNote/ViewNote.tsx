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

const ViewNote = () => {
  const { noteInView } = useAppSelector((state) => state.notes);

  const [selectedTags, setSelectedTags] = useState<Note["tags"]>(
    (noteInView && noteInView !== "new" && noteInView.tags) || []
  );
  const [selectedTitle, setSelectedTitle] = useState<Note["title"]>(
    (noteInView && noteInView !== "new" && noteInView.title) || ""
  );
  const [selectedText, setSelectedText] = useState<Note["text"]>(
    (noteInView && noteInView !== "new" && noteInView.text) || ""
  );
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmitNote = () => {
    setMessage("");

    if (!noteInView) {
      setMessage("No note found");
      return;
    }

    if (!selectedTitle || !selectedTags || !selectedText) {
      setMessage("Please enter all fields");
      return;
    }

    // If new note in view add note
    if (noteInView === "new") {
      dispatch(
        addNote({
          title: selectedTitle,
          tags: selectedTags,
          text: selectedText,
        })
      );
      toast.success("New note added!");
    } else {
      // Note is not new so update note
      dispatch(
        updateNote({
          ...noteInView,
          title: selectedTitle,
          tags: selectedTags,
          text: selectedText,
        })
      );
      toast.success("Note updated!");
    }

    dispatch(setNoteInView(null));
    dispatch(setIsViewingNote(false));
  };

  useEffect(() => {
    // Update state when a new noteInView is set
    if (noteInView && noteInView !== "new") {
      setSelectedTags(noteInView.tags || []);
      setSelectedTitle(noteInView.title || "");
      setSelectedText(noteInView.text || "");
    } else {
      // Reset state if noteInView is "new"
      setSelectedTags([]);
      setSelectedTitle("");
      setSelectedText("");
    }
  }, [noteInView]);

  return (
    <div className={styles.wrapper}>
      <Breadcrumb />
      <Title
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
        autoFocus={noteInView === "new"}
      />
      {noteInView &&
        noteInView !== "new" &&
        noteInView.updated_at &&
        isValid(noteInView.updated_at) && (
          <div className={styles.dateWrapper}>
            <p className={styles.dateLabel}>Last Modified:</p>
            <p className={styles.dateValue}>
              {noteInView &&
                isValid(noteInView.updated_at) &&
                format(new Date(noteInView.updated_at), "MMMM dd, yyyy h:mm a")}
            </p>
          </div>
        )}
      <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Editor selectedText={selectedText} setSelectedText={setSelectedText} />
      {message && <p className={styles.alert}>{message}</p>}
      <ViewNoteActions handleSubmit={handleSubmitNote} />
    </div>
  );
};

export default ViewNote;
