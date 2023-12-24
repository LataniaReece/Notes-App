import AddNoteButton from "./AddNoteButton";
import NotesList from "./NotesList";

const styles = {
  heading: "text-4xl mb-7",
};

const MyNotes = () => {
  return (
    <>
      <h2 className={styles.heading}>My Notes</h2>
      <AddNoteButton />
      <NotesList />
    </>
  );
};

export default MyNotes;
