import { setIsViewingNote, setNoteInView } from "../../slices/notesSlice";
import { useAppDispatch } from "../../hooks";

const styles = {
  button:
    "rounded-lg bg-gray-200 font-light px-2 py-1 md:px-5 md:py-2 lg:hover:bg-gray-300 transition duration-200 dark:bg-gray-600 lg:dark:hover:bg-gray-500",
};

const AddNote = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setNoteInView("new"));
    dispatch(setIsViewingNote(true));
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      + Add New Note
    </button>
  );
};

export default AddNote;
