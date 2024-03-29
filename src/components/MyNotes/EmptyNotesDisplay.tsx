import { FC } from "react";
import { setIsViewingNote, setNoteInView } from "../../slices/notesSlice";
import { IoAlertCircle } from "react-icons/io5";
import { useAppDispatch } from "../../hooks";

const EmptyNotesDisplay: FC = () => {
  const dispatch = useAppDispatch();

  const handleAddNewNote = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setNoteInView("new"));
    dispatch(setIsViewingNote(true));
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <IoAlertCircle size={50} style={{ margin: "10px" }} />
      <p className="text-2xl mb-1">No Notes found</p>
      <p className="italic font-xs font-light text-gray-400 ">
        <a
          href="#"
          onClick={(e) => handleAddNewNote(e)}
          className="underline lg:hover:no-underline"
        >
          Add a new note
        </a>{" "}
        to see notes here.
      </p>
    </div>
  );
};

export default EmptyNotesDisplay;
