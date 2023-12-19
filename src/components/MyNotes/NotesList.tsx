import { format } from "date-fns";

const mockNotes = [
  {
    id: 1,
    date: new Date("2023-01-01T00:00:00"),
    title: "Exploration Ideas",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    tags: ["Design", "Productivity", "Training"],
  },
  {
    id: 2,
    date: new Date("2023-04-12T00:00:00"),
    title: "Database Systems Week 4",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    tags: ["College", "Lecture", "Daily", "Study"],
  },
  {
    id: 3,
    date: new Date("2023-04-19T00:00:00"),
    title: "Grocery List",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    tags: ["Shopping", "List"],
  },
];

const styles = {
  noteItem: "bg-gray-50 mb-2 p-3",
  date: "uppercase text-xs text-gray-400 font-extralight",
  title: "text-slate-500 font-normal",
  text: "overflow-hidden whitespace-nowrap overflow-ellipsis font-extralight",
  tagsContainer: "flex gap-2",
  tagItem: "bg-gray-100 p-1 font-extralight text-xs",
};

const NotesList = () => {
  return (
    <>
      {mockNotes.map((note) => (
        <div className={styles.noteItem} key={note.id}>
          <p className={styles.date}>{format(note.date, "dd MMM")}</p>
          <p className={styles.title}>{note.title}</p>
          <p className={styles.text}>{note.text}</p>
          <div className={styles.tagsContainer}>
            {note.tags.map((tag) => (
              <p key={tag} className={styles.tagItem}>
                {tag}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NotesList;
