import classnames from "classnames";
import CurrentNote from "./components/CurrentNote/CurrentNote";
import MyNotes from "./components/MyNotes/MyNotes";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App = () => {
  const { currentNote } = useSelector((state: RootState) => state.notes);

  const styles = {
    wrapper: "h-screen grid grid-cols-12 gap-7 p-5",
    myNotes: classnames({
      "col-span-12 md:col-span-4 lg:col-span-3": currentNote,
      "col-span-12 md:col-span-12 lg:col-span-12": !currentNote,
    }),
    currentNote: "col-span-12 md:col-span-8 lg:col-span-9 h-full",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.myNotes}>
        <MyNotes />
      </div>
      {currentNote && (
        <div className={styles.currentNote}>
          <CurrentNote />
        </div>
      )}
    </div>
  );
};

export default App;
