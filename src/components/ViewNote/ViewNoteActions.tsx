import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  setIsViewingNote,
  setNoteInView,
} from "../../slices/notesSlice";
import { RootState } from "../../store";
import { toast } from "react-toastify";

const ViewNoteActions: FC<{ handleSubmit: () => void }> = ({
  handleSubmit,
}) => {
  const { noteInView } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setNoteInView(null));
    dispatch(setIsViewingNote(false));
  };

  const handleDeleteNote = () => {
    if (!noteInView || noteInView === "new") {
      toast.error("Error. Please try again");
      return;
    }

    if (
      window.confirm(`Are you sure you want to delete "${noteInView.title}"`)
    ) {
      if (noteInView.id) {
        dispatch(setNoteInView(null));
        dispatch(setIsViewingNote(false));
        dispatch(deleteNote(noteInView.id));
        toast.success(`Note deleted!`);
      } else {
        toast.error(`Error. Please try again.`);
      }
    }
  };

  return (
    <div className="mt-4 mb-5 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 sm:items-center">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center">
        <button
          className="order-2 sm:order-1 rounded-lg bg-gray-700 text-white px-2 p-2 sm:mr-3 border border-gray-700 hover:bg-gray-800"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="order-1 sm:order-2 rounded-lg border border-gray-600 text-gray-600 px-2 p-2 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-500"
          onClick={handleSubmit}
        >
          {noteInView === "new" ? "Add note" : "Update note"}
        </button>
      </div>
      {noteInView && noteInView !== "new" && (
        <button
          className="rounded-lg bg-rose-700 border border-rose-700 text-white px-2 p-2 hover:bg-rose-600 hover:border-rose-600 dark:bg-rose-900 dark:border-rose-900 dark:hover:bg-rose-700 dark:hover:border-rose-700"
          onClick={handleDeleteNote}
        >
          Delete Note
        </button>
      )}
    </div>
  );
};

export default ViewNoteActions;
