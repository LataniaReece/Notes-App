import { FC, useEffect } from "react";
import Modal from "react-modal";

interface CustomModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: () => void;
  label: string;
  text: string;
}

const styles = {
  overlay: "fixed inset-0 bg-black bg-opacity-50 z-40",
  content:
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-11/12 md:w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg",
  label: "text-2lx font-bold dark:text-white",
  text: "text-gray-700 dark:text-gray-300 mb-4",
  buttonContainer: "flex justify-center space-x-4",
  confirmButton:
    "rounded-lg border border-gray-600 text-gray-600 px-2 py-2 w-32 lg:hover:bg-gray-200 dark:text-white lg:dark:hover:bg-gray-500",
  cancelButton:
    "rounded-lg bg-gray-700 text-white px-4 py-2 w-32 sm:mr-3 border border-gray-700 lg:hover:bg-gray-800",
};

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  setIsOpen,
  handleConfirm,
  label,
  text,
}) => {
  useEffect(() => {
    const bodyElement = document.body;
    if (isOpen) {
      bodyElement.style.overflow = "hidden";
    } else {
      bodyElement.style.overflow = "auto";
    }
    return () => {
      bodyElement.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel={label}
      overlayClassName={styles.overlay}
      className={styles.content}
    >
      <p className={styles.label} data-testid="modal-label">
        {label}
      </p>
      <p className={styles.text} data-testid="modal-text">
        {text}
      </p>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleConfirm}
          className={styles.confirmButton}
          data-testid="confirm-button"
        >
          Yes
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className={styles.cancelButton}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
