import AddNote from "./MyNotes/AddNote";
import NotesList from "./MyNotes/NotesList";

const styles = {
  heading: "text-4xl mb-4",
};

const MyNotes = () => {
  return (
    <>
      <h2 className={styles.heading}>My Notes</h2>
      <AddNote />
      <NotesList />
    </>
  );
};

export default MyNotes;
