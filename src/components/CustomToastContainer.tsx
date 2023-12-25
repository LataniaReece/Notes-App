import { FC } from "react";
import { ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";

const contextClass = {
  success: "bg-emerald-600",
  error: "bg-rose-700",
};

// Styling Docs: https://fkhadra.github.io/react-toastify/how-to-style
const CustomToastContainer: FC = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastClassName={({ type }) =>
        contextClass[type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between items-center overflow-hidden cursor-pointer"
      }
      closeButton={({ closeToast }) => (
        <button className="text-white" onClick={closeToast}>
          <IoMdClose />
        </button>
      )}
    />
  );
};

export default CustomToastContainer;
