import { FC } from "react";
import AddNoteButton from "./AddNoteButton";
import NotesList from "./NotesList";
import DarkModeToggle from "../DarkModeToggle";

const styles = {
  heading: "text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-7",
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
