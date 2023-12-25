// Pagination.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCurrentPage } from "../../slices/notesSlice";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

const styles = {
  wrapper: "flex justify-end gap-3 text-sm p-3",
  button: "hover:underline hover:text-gray-500 dark:hover:text-gray-400",
  hiddenButton: "hidden",
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
}) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.notes.currentPage
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`${styles.button} ${
          currentPage === 1 ? styles.hiddenButton : ""
        }`}
      >
        Prev
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
        Next
      </button>
    </div>
  );
};

export default Pagination;
