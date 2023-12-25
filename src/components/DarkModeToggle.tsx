import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { RootState } from "../store";
import { toggleTheme } from "../slices/notesSlice";

const DarkModeToggle: FC = () => {
  const { theme } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  const isDarkMode = theme === "dark";
  return (
    <div
      className={`relative flex items-center cursor-pointer w-12 h-6 ${
        isDarkMode ? "bg-gray-600" : "bg-gray-100"
      } rounded-full p-1 transition-colors hover:shadow-md dark:hover:shadow-gray-800`}
      onClick={() => dispatch(toggleTheme())}
    >
      <div
        className={`w-5 h-5 rounded-full shadow-md transform ${
          isDarkMode ? "translate-x-full" : "translate-x-0"
        } transition-transform`}
      >
        {isDarkMode ? <RiMoonLine size={20} /> : <RiSunLine size={20} />}
      </div>
    </div>
  );
};

export default DarkModeToggle;
