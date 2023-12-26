import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import classnames from "classnames";
import "react-toastify/dist/ReactToastify.css";

import MyNotes from "./components/MyNotes/MyNotes";
import ViewNote from "./components/ViewNote/ViewNote";
import CustomToastContainer from "./components/CustomToastContainer";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const { isViewingNote, theme, currentPage } = useSelector(
    (state: RootState) => state.notes
  );

  const styles = {
    wrapper:
      "min-h-screen min-w-[320px] overflow-auto grid grid-cols-12 md:gap-3 md:gap-7 px-3  md:px-5 lg:px-10 py-3 md:py-7 dark:bg-slate-900 dark:text-slate-200",
    myNotes: classnames({
      "col-span-12 md:col-span-4 xl:col-span-3 hidden md:block": isViewingNote,
      "col-span-12": !isViewingNote,
    }),
    currentNote: "col-span-12 md:col-span-8 xl:col-span-9 h-full",
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <ErrorBoundary>
      <div className={styles.wrapper}>
        <div className={styles.myNotes}>
          <MyNotes />
        </div>
        {isViewingNote && (
          <div className={styles.currentNote}>
            <ViewNote />
          </div>
        )}

        <CustomToastContainer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
