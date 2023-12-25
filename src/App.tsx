import { useSelector } from "react-redux";
import { RootState } from "./store";
import classnames from "classnames";
import "react-toastify/dist/ReactToastify.css";

import MyNotes from "./components/MyNotes/MyNotes";
import ViewNote from "./components/ViewNote/ViewNote";
import CustomToastContainer from "./components/CustomToastContainer";
import { useEffect } from "react";

const App = () => {
  const { isViewingNote, theme } = useSelector(
    (state: RootState) => state.notes
  );

  const styles = {
    wrapper:
      "h-screen grid grid-cols-12 gap-7 px-10 py-7 dark:bg-slate-900 dark:text-slate-200",
    myNotes: classnames({
      "col-span-12 md:col-span-4 lg:col-span-3": isViewingNote,
      "col-span-12 md:col-span-12 lg:col-span-12": !isViewingNote,
    }),
    currentNote: "col-span-12 md:col-span-8 lg:col-span-9 h-full",
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
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
      <CustomToastContainer />
    </>
  );
};

export default App;
