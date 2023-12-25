import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import classnames from "classnames";
import DOMPurify from "dompurify";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

import Pagination from "./Pagination";
import EmptyNotesDisplay from "./EmptyNotesDisplay";
import { Note } from "../../slices/notesTypes";
import {
  clearAllNotes,
  deleteNote,
  setIsViewingNote,
  setNoteInView,
} from "../../slices/notesSlice";

const styles = {
  noteItem: "rounded-lg mb-3 p-3 cursor-pointer border border-transparent",
  unSelectedNoteItem: "bg-gray-50 hover:bg-gray-100",
  selectedNoteItem: "bg-gray-100",
  date: "uppercase text-xs text-gray-400 font-extralight",
  title: "text-gray-500 ",
  selectedTitle: "font-bold",
  text: " text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis font-light mb-3 text-sm",
  selectedText: "font-normal",
  tagsContainer: "flex gap-2",
  tagItem: "rounded-lg bg-gray-100 p-1 font-extralight text-xs",
  footer: "flex justify-between items-center",
  clearButton:
    "rounded-lg bg-gray-700 text-white text-sm px-2 p-2 border border-gray-700 hover:bg-gray-800",
};

const NotesList = () => {
  const { notes, noteInView, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.notes
  );
  const dispatch = useDispatch();

  if (!notes || notes.length === 0) {
    return <EmptyNotesDisplay />;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedNotes = notes.slice(startIndex, endIndex);

  const handleViewNote = (note: Note) => {
    if (note) {
      dispatch(setNoteInView(note));
      dispatch(setIsViewingNote(true));
    }
  };

  const handleClearNotes = () => {
    if (window.confirm("Are you sure you want to clear all notes?")) {
      dispatch(clearAllNotes());
      toast.success("Notes cleared!");
    }
  };

  const handleDeleteNote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: Note
  ) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${note.title}"`)) {
      if (note && note.id) {
        dispatch(deleteNote(note.id));
        toast.success(`Note deleted!`);
      } else {
        toast.error(`Error. Please try again.`);
      }
    }
  };

  return (
    <>
      {paginatedNotes.map((note) => (
        <div
          className={classnames(styles.noteItem, {
            [styles.unSelectedNoteItem]:
              !noteInView ||
              noteInView === "new" ||
              (noteInView && note.id !== noteInView.id),
            [styles.selectedNoteItem]:
              noteInView && noteInView !== "new" && note.id === noteInView.id,
          })}
          key={note.id}
          onClick={() => handleViewNote(note)}
        >
          <div className="flex justify-between">
            <p className={styles.date}>
              {format(new Date(note.updated_at), "MM/dd/yy h:mm a")}
            </p>
            <button onClick={(e) => handleDeleteNote(e, note)}>
              <IoMdClose />
            </button>
          </div>
          <p
            className={classnames(styles.title, {
              [styles.selectedTitle]:
                noteInView && noteInView !== "new" && note.id === noteInView.id,
            })}
          >
            {note.title}
          </p>
          <div
            className={classnames(styles.text, {
              [styles.selectedText]:
                noteInView && noteInView !== "new" && note.id === noteInView.id,
            })}
            dangerouslySetInnerHTML={sanitizeAndRenderHTML(note.text)}
          />
          <div className={styles.tagsContainer}>
            {note.tags.map((tag) => (
              <p key={tag} className={styles.tagItem}>
                {tag}
              </p>
            ))}
          </div>
        </div>
      ))}
      <div className={styles.footer}>
        <button onClick={handleClearNotes} className={styles.clearButton}>
          Clear all notes
        </button>
        <Pagination totalItems={notes.length} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
};

const sanitizeAndRenderHTML = (htmlString: string) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlString);
  const div = document.createElement("div");
  div.innerHTML = sanitizedHTML;

  // Concatenate the text content of all child nodes (ignoring HTML tags)
  const concatenatedText = Array.from(div.childNodes)
    .map((child) => child.textContent || "")
    .join("");

  return { __html: concatenatedText };
};

export default NotesList;
