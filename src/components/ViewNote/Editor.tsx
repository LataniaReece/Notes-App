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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "script",
    "indent",
    "color",
    "link",
    "image",
  ];

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
        <ReactQuill
          theme="snow"
          value={selectedText}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      )}
    </div>
  );
};

export default Editor;
