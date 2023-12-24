import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import DOMPurify from "dompurify";
import { Note } from "../../slices/notesTypes";
import { setIsViewingNote, setNoteInView } from "../../slices/notesSlice";
import classnames from "classnames";
import Pagination from "./Pagination";

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
};

const NotesList = () => {
  const { notes, noteInView, currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.notes
  );
  const dispatch = useDispatch();

  if (!notes || notes.length === 0) {
    return <p>No Notes found</p>;
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
          <p className={styles.date}>
            {format(new Date(note.updated_at), "dd MMM")}
          </p>
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
      <Pagination totalItems={notes.length} itemsPerPage={itemsPerPage} />
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
