import { FC } from "react";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { toggleTheme } from "../slices/notesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const DarkModeToggle: FC = () => {
  const { theme } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const isDarkMode = theme === "dark";
  return (
    <div
      className={`relative flex items-center cursor-pointer w-12 h-6 ${
        isDarkMode ? "bg-gray-600" : "bg-gray-100"
      } rounded-full p-1 transition-colors`}
      onClick={() => dispatch(toggleTheme())}
    >
      <div
        className={`w-5 h-5 rounded-full transform ${
          isDarkMode ? "translate-x-full" : "translate-x-0"
        } transition-transform`}
      >
        {isDarkMode ? <RiMoonLine size={20} /> : <RiSunLine size={20} />}
      </div>
    </div>
  );
};

export default DarkModeToggle;
