import { FC } from "react";
import AddNoteButton from "./AddNoteButton";
import NotesList from "./NotesList";
import DarkModeToggle from "../DarkModeToggle";

const styles = {
  heading: "text-4xl mb-7",
};

const MyNotes: FC = () => {
  return (
    <>
      <h2 className={styles.heading}>My Notes</h2>
      <div className="flex items-center  justify-between gap-2 mb-4">
        <AddNoteButton />
        <DarkModeToggle />
      </div>
      <NotesList />
    </>
  );
};

export default MyNotes;
