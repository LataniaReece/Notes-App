import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCurrentNote } from "../../slices/notesSlice";

const styles = {
  wrapper: "flex gap-2 font-light pt-2 pb-5 border-b border-gray-100 ",
  button: "hover:underline hover:text-gray-500 transition duration-100",
};

const Breadcrumb = () => {
  const { currentNote } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentNote(null));
  };
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleClick}>
        My Notes
      </button>
      <p>{`>`}</p>
      <p>{currentNote?.title}</p>
    </div>
  );
};

export default Breadcrumb;
