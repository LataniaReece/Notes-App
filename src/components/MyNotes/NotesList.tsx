import { format, isValid } from "date-fns";
import classnames from "classnames";
import DOMPurify from "dompurify";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

import Pagination from "./Pagination";
import EmptyNotesDisplay from "./EmptyNotesDisplay";
import {
  clearAllNotes,
  deleteNote,
  setIsViewingNote,
  setNoteInView,
} from "../../slices/notesSlice";
import { useState } from "react";
import CustomModal from "../CustomModal";
import { useAppDispatch, useAppSelector } from "../../hooks";

const styles = {
  noteItem: "rounded-lg mb-3 p-3 cursor-pointer border border-transparent",
  unSelectedNoteItem:
    "bg-gray-50 lg:hover:bg-gray-100 dark:bg-gray-700 lg:dark:hover:bg-gray-600",
  selectedNoteItem: "bg-gray-100 dark:bg-gray-600",
  date: "uppercase text-xs text-gray-400 font-extralight dark:text-slate-400",
  title: "text-gray-500 dark:text-gray-100",
  selectedTitle: "font-bold",
  text: " text-gray-500 dark:text-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis font-light mb-3 text-sm",
  selectedText: "font-normal",
  tagsContainer: "flex gap-2",
  tagItem:
    "rounded-lg bg-gray-100 dark:bg-gray-600 p-1 font-extralight text-xs",
  selectedTagItem: "bg-gray-100 dark:bg-gray-500",
  footer: "flex justify-between",
  clearButton:
    "rounded-lg bg-gray-700 text-white text-sm px-2 p-2 border border-gray-700 lg:hover:bg-gray-800 lg:dark:hover:bg-gray-600",
};

const NotesList = () => {
  const [showDeleteNoteConfirmation, setShowDeleteNoteConfirmation] =
    useState(false);
  const [showClearNotesConfirmation, setShowClearNotesConfirmation] =
    useState(false);
  const [selectedNoteToDelete, setSelectedNoteToDelete] = useState<Note | null>(
    null
  );

  const { notes, noteInView, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.notes
  );
  const dispatch = useAppDispatch();

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

  const handleDeleteNote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: Note
  ) => {
    e.stopPropagation();
    setSelectedNoteToDelete(note);
    setShowDeleteNoteConfirmation(true);
  };

  const confirmDelete = () => {
    if (selectedNoteToDelete && selectedNoteToDelete.id) {
      dispatch(deleteNote(selectedNoteToDelete.id));
      setSelectedNoteToDelete(null);
      setShowDeleteNoteConfirmation(false);
      toast.success(`Note deleted!`);
    } else {
      toast.error(`Error. Please try again.`);
    }
  };

  const confirmClearNotes = () => {
    dispatch(clearAllNotes());
    setShowClearNotesConfirmation(false);
    toast.success(`Notes cleared!`);
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
            {note.updated_at && isValid(note.updated_at) && (
              <p className={styles.date}>
                {format(new Date(note.updated_at), "MM/dd/yy h:mm a")}
              </p>
            )}
            <button
              onClick={(e) => handleDeleteNote(e, note)}
              className="border border-transparent lg:hover:gray lg:hover:border-gray-700 lg:hover:rounded-full lg:dark:hover:border-gray-200"
            >
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
            {note.tags.map((tag: string) => (
              <p
                key={tag}
                className={classnames(styles.tagItem, {
                  [styles.selectedTagItem]:
                    noteInView &&
                    noteInView !== "new" &&
                    note.id === noteInView.id,
                })}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      ))}
      <div
        className={classnames(styles.footer, {
          "items-center flex-row": !noteInView,
        })}
      >
        <button
          onClick={() => setShowClearNotesConfirmation(true)}
          className={styles.clearButton}
        >
          Clear notes
        </button>
        <Pagination totalItems={notes.length} itemsPerPage={itemsPerPage} />
      </div>
      <CustomModal
        isOpen={showDeleteNoteConfirmation}
        setIsOpen={setShowDeleteNoteConfirmation}
        handleConfirm={confirmDelete}
        label="Delete Confirmation"
        text={`Are you sure you want to delete ${
          selectedNoteToDelete ? selectedNoteToDelete.title : ""
        }?`}
      />
      <CustomModal
        isOpen={showClearNotesConfirmation}
        setIsOpen={setShowClearNotesConfirmation}
        handleConfirm={confirmClearNotes}
        label="Clear Notes Confirmation"
        text={"Are you sure you want to clear all notes?"}
      />
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
