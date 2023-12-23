import { useSelector } from "react-redux";
import { RootState } from "./store";
import classnames from "classnames";

import MyNotes from "./components/MyNotes/MyNotes";
import ViewNote from "./components/ViewNote/ViewNote";

const App = () => {
  const { isViewingNote } = useSelector((state: RootState) => state.notes);

  const styles = {
    wrapper: "h-screen grid grid-cols-12 gap-7 p-5",
    myNotes: classnames({
      "col-span-12 md:col-span-4 lg:col-span-3": isViewingNote,
      "col-span-12 md:col-span-12 lg:col-span-12": !isViewingNote,
    }),
    currentNote: "col-span-12 md:col-span-8 lg:col-span-9 h-full",
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.myNotes}>
        <MyNotes />
      </div>
      {isViewingNote && (
        <div className={styles.currentNote}>
          <ViewNote />
        </div>
      )}
    </div>
  );
};

export default App;
