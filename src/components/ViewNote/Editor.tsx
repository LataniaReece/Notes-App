import { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useAppSelector } from "../../hooks";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  selectedText: string;
  setSelectedText: (text: string) => void;
}

const Editor: FC<EditorProps> = ({ selectedText, setSelectedText }) => {
  const { theme } = useAppSelector((state) => state.notes);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (content: string) => {
    setSelectedText(content);
  };

  useEffect(() => {
    setIsLoading(true);
    setKey((prevKey) => prevKey + 1);
    setTimeout(() => setIsLoading(false), 300);
  }, [theme]);

  return (
    <div
      key={key}
      className={`editor-container ${
        theme === "dark" ? "editor-dark" : "editor-light"
      }`}
      data-testid="note-text-input"
    >
      {isLoading && <p>Loading editor...</p>}
      {!isLoading && (
        <ReactQuill theme="snow" value={selectedText} onChange={handleChange} />
      )}
    </div>
  );
};

export default Editor;
