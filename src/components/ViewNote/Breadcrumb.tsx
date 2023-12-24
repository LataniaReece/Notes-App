import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setIsViewingNote, setNoteInView } from "../../slices/notesSlice";

const styles = {
  wrapper: "flex gap-2 font-light pt-2 pb-5 border-b border-gray-100 ",
  button: "hover:underline hover:text-gray-500 transition duration-100",
};

const Breadcrumb = () => {
  const { noteInView } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

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
