import { setIsViewingNote, setNoteInView } from "../../slices/notesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const styles = {
  wrapper: "flex gap-2 font-light pt-2 pb-5 border-b border-gray-100 ",
  button:
    "lg:hover:underline lg:hover:text-gray-500 transition duration-100 lg:dark:hover:text-gray-400",
};

const Breadcrumb = () => {
  const { noteInView } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setNoteInView(null));
    dispatch(setIsViewingNote(false));
  };
  return (
    noteInView && (
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={handleClick}>
          My Notes
        </button>
        <p>{`>`}</p>
        <p>{noteInView === "new" ? "Untitled" : noteInView.title}</p>
      </div>
    )
  );
};

export default Breadcrumb;
