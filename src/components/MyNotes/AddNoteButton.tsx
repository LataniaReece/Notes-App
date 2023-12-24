import { useDispatch } from "react-redux";
import { setIsViewingNote, setNoteInView } from "../../slices/notesSlice";

const styles = {
  button:
    "rounded-lg bg-gray-200 font-light px-5 py-2 mb-4 hover:bg-gray-300 transition duration-200",
};

const AddNote = () => {
  const dispatch = useDispatch();

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
