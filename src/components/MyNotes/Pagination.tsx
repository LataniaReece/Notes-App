// Pagination.tsx
import React from "react";
import classnames from "classnames";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import { setCurrentPage } from "../../slices/notesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const styles = {
  wrapper: "flex justify-end gap-3 text-sm",
  button:
    "lg:hover:underline lg:hover:text-gray-500 lg:dark:hover:text-gray-400",
  hiddenButton: "hidden",
  icons:
    "text-black lg:hover:text-gray-500 dark:text-white lg:dark:hover:text-gray-500",
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
}) => {
  const dispatch = useAppDispatch();
  const { currentPage, noteInView } = useAppSelector((state) => state.notes);

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
