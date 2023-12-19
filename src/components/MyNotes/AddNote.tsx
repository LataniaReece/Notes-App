const styles = {
  input:
    "px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-stone-900 text-sm mb-3",
};

const AddNote = () => {
  return (
    <div>
      <input
        type="text"
        className={styles.input}
        placeholder="+ Add new note"
      />
    </div>
  );
};

export default AddNote;
