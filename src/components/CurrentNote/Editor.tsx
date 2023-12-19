import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { setCurrentNote } from "../../slices/notesSlice";

const Editor = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorChange = (value: any) => {
    setContent(value);
  };

  const handleCancel = () => {
    dispatch(setCurrentNote(null));
  };

  return (
    <>
      <div className="mt-4 h-[500px]">
        <ReactQuill
          value={content}
          onChange={handleEditorChange}
          className="h-full"
        />
      </div>
      <div className="mt-20 flex gap-2">
        <button
          className="rounded-full bg-slate-800 text-white px-2 p-2 "
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="rounded-full border border-slate-800 px-2 p-2">
          Submit
        </button>
      </div>
    </>
  );
};

export default Editor;
