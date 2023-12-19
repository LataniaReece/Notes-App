import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setCurrentNote } from "../../slices/notesSlice";

const styles = {
  button:
    "rounded-full bg-gray-200 font-light px-4 py-2 mb-4 hover:bg-gray-300 transition duration-200",
};

const AddNote = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const newEmptyNote = {
      id: uuidv4(),
      title: "New Note",
      text: "Add note details",
      tags: [],
      created_at: null,
      updated_at: null,
    };
    dispatch(setCurrentNote(newEmptyNote));
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      + Add New Note
    </button>
  );
};

export default AddNote;
