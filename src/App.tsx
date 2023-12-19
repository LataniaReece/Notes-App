import classnames from "classnames";
import CurrentNote from "./components/CurrentNote";
import MyNotes from "./components/MyNotes";

const App = () => {
  const hasCurrentNote: boolean = true;

  const styles = {
    wrapper: "h-screen grid grid-cols-12 gap-7 p-5",
    myNotes: classnames({
      "col-span-12 md:col-span-4 lg:col-span-3": hasCurrentNote,
      "col-span-12 md:col-span-12 lg:col-span-9": !hasCurrentNote,
    }),
    currentNote: "col-span-8 h-full",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.myNotes}>
        <MyNotes />
      </div>
      {hasCurrentNote && (
        <div className={styles.currentNote}>
          <CurrentNote />
        </div>
      )}
    </div>
  );
};

export default App;
