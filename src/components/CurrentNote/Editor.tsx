import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [content, setContent] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (value: any) => {
    setContent(value);
  };

  return (
    <div className="h-full mt-4">
      <ReactQuill
        value={content}
        onChange={handleEditorChange}
        className="h-[400px]"
      />
    </div>
  );
};

export default Editor;
