import { FC, useState } from "react";
import {
  deleteNote,
  setIsViewingNote,
  setNoteInView,
} from "../../slices/notesSlice";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import { useAppDispatch, useAppSelector } from "../../hooks";

const styles = {
  wrapper:
    "mt-4 mb-5 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 sm:items-center",
  btnContainer: "flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center",
  cancelBtn:
    "order-2 sm:order-1 rounded-lg bg-gray-700 text-white px-2 py-2 sm:mr-3 border border-gray-700 lg:hover:bg-gray-800",
  saveBtn:
    "order-1 sm:order-2 rounded-lg border border-gray-600 text-gray-600 px-2 p-2 lg:hover:bg-gray-200 dark:text-white lg:dark:hover:bg-gray-500",
  deleteBtn:
    "rounded-lg bg-rose-700 border border-rose-700 text-white px-2 py-2 lg:hover:bg-rose-600 lg:hover:border-rose-600 dark:bg-rose-900 dark:border-rose-900 lg:dark:hover:bg-rose-700 lg:dark:hover:border-rose-700",
};

const ViewNoteActions: FC<{ handleSubmit: () => void }> = ({
  handleSubmit,
}) => {
  const [showDeleteNoteConfirmation, setShowDeleteNoteConfirmation] =
    useState(false);
  const { noteInView } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(setNoteInView(null));
    dispatch(setIsViewingNote(false));
  };

  const handleDeleteNote = () => {
    if (!noteInView || noteInView === "new") {
      toast.error("Error. Please try again");
      return;
    }
    setShowDeleteNoteConfirmation(true);
  };

  const confirmDelete = () => {
    if (noteInView && noteInView !== "new" && noteInView.id) {
      dispatch(setNoteInView(null));
      dispatch(setIsViewingNote(false));
      dispatch(deleteNote(noteInView.id));
      setShowDeleteNoteConfirmation(false);
      toast.success(`Note deleted!`);
    } else {
      toast.error(`Error. Please try again.`);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSubmit}>
            {noteInView === "new" ? "Add note" : "Update note"}
          </button>
        </div>
        {noteInView && noteInView !== "new" && (
          <button className={styles.deleteBtn} onClick={handleDeleteNote}>
            Delete Note
          </button>
        )}
      </div>
      <CustomModal
        isOpen={showDeleteNoteConfirmation}
        setIsOpen={setShowDeleteNoteConfirmation}
        handleConfirm={confirmDelete}
        label="Delete Confirmation"
        text={`Are you sure you want to delete ${
          noteInView && noteInView !== "new" && noteInView.title
        }?`}
      />
    </>
  );
};

export default ViewNoteActions;
