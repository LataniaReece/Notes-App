// Pagination.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import { RootState } from "../../store";
import { setCurrentPage } from "../../slices/notesSlice";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const styles = {
  wrapper: "flex justify-end gap-3 text-sm",
  button: "hover:underline hover:text-gray-500 dark:hover:text-gray-400",
  hiddenButton: "hidden",
  icons:
    "text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-500",
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
}) => {
  const dispatch = useDispatch();
  const { currentPage, noteInView } = useSelector(
    (state: RootState) => state.notes
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div
      className={classnames(styles.wrapper, {
        "py-3": noteInView,
        "p-3": !noteInView,
      })}
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${styles.button} ${
          currentPage === 1 ? styles.hiddenButton : ""
        }`}
      >
        <MdKeyboardArrowLeft size={20} className={styles.icons} />
      </button>
      <span>
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${styles.button} ${
          currentPage === totalPages ? styles.hiddenButton : ""
        }`}
      >
        <MdKeyboardArrowRight size={20} className={styles.icons} />
      </button>
    </div>
  );
};

export default Pagination;
