import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsViewingNote, setNoteInView } from "../../slices/notesSlice";
import { RootState } from "../../store";

const ViewNoteActions: FC<{ handleSubmit: () => void }> = ({
  handleSubmit,
}) => {
  const { noteInView } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setNoteInView(null));
    dispatch(setIsViewingNote(false));
  };

  return (
    <div className="mt-4 mb-5 flex gap-2">
      <button
        className="rounded-lg bg-gray-700 text-white px-2 p-2 border border-gray-700 hover:bg-gray-800"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        className="rounded-lg border border-gray-600 text-gray-600 px-2 p-2 hover:bg-gray-200"
        onClick={handleSubmit}
      >
        {noteInView === "new" ? "Add note" : "Update note"}
      </button>
    </div>
  );
};

export default ViewNoteActions;
