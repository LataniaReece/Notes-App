import { FC } from "react";
import { useDispatch } from "react-redux";
import { setIsViewingNote } from "../../slices/notesSlice";

const ViewNoteActions: FC<{ handleSubmit: () => void }> = ({
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setIsViewingNote(false));
  };

  return (
    <div className="mt-3 flex gap-2">
      <button
        className="bg-slate-800 text-white px-2 p-2 "
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        className="border border-slate-800 px-2 p-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default ViewNoteActions;
