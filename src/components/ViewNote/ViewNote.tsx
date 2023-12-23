import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { v4 as uuid4 } from "uuid";

import Breadcrumb from "./Breadcrumb";
import Editor from "./Editor";
import Tags from "./Tags";
import Title from "./Title";
import ViewNoteActions from "./ViewNoteActions";
import { RootState } from "../../store";
import {
  addNote,
  setIsViewingNote,
  setNoteInView,
  updateNote,
} from "../../slices/notesSlice";

const styles = {
  wrapper: "p-2 h-full",
  dateWrapper: "flex justify-between w-80 mb-3",
  dateLabel: "font-extralight",
  dateValue: "font-light",
  alert: "mt-3 bg-red-50 border border-red-300 text-red-400 px-4 py-3",
};

const ViewNote = () => {
  const { noteInView } = useSelector((state: RootState) => state.notes);

  const [selectedTags, setSelectedTags] = useState<string[]>(
    (noteInView && noteInView !== "new" && noteInView.tags) || []
  );
  const [selectedTitle, setSelectedTitle] = useState<string>(
    (noteInView && noteInView !== "new" && noteInView.title) || ""
  );
  const [selectedText, setSelectedText] = useState<string>(
    (noteInView && noteInView !== "new" && noteInView.text) || ""
  );
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

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

    const formattedNow = format(new Date(), "MM-dd-yyyy HH:mm");

    // If new note in view add note
    if (noteInView === "new") {
      dispatch(
        addNote({
          id: uuid4(),
          title: selectedTitle,
          tags: selectedTags,
          text: selectedText,
          updated_at: formattedNow,
          created_at: formattedNow,
        })
      );
    } else {
      // Note is not new so update note
      dispatch(
        updateNote({
          ...noteInView,
          title: selectedTitle,
          tags: selectedTags,
          text: selectedText,
          updated_at: formattedNow,
        })
      );
    }

    dispatch(setNoteInView(null));
    dispatch(setIsViewingNote(false));
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumb />
      <Title
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
      />
      {noteInView && noteInView !== "new" && noteInView.updated_at && (
        <div className={styles.dateWrapper}>
          <p className={styles.dateLabel}>Last Modified</p>
          <p className={styles.dateValue}>
            {noteInView &&
              format(new Date(noteInView.updated_at), "dd MMMM, yyyy")}
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
