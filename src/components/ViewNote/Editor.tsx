import { FC, useEffect, useRef, useState } from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface EditorProps {
  selectedText: string;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: FC<EditorProps> = ({ selectedText, setSelectedText }) => {
  const { theme } = useSelector((state: RootState) => state.notes);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleChange = (content: string) => {
    setSelectedText(content);
  };

  const handleEditorInit = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setKey((prevKey) => prevKey + 1); // Remount the TinyEditor component
  }, [theme]);

  return (
    <div
      key={key}
      className={`bg-${theme === "dark" ? "gray-800" : "white"} p-4`}
    >
      {isLoading && <p>Loading editor...</p>}
      <TinyEditor
        key={key}
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        onInit={handleEditorInit}
        value={selectedText}
        init={{
          height: 500,
          menubar: false,
          skin: theme === "dark" ? "oxide-dark" : "oxide",
          content_css: theme === "dark" ? "dark" : "",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleChange}
      />
    </div>
  );
};

export default Editor;
