/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef, useState } from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";

interface EditorProps {
  selectedText: string;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: FC<EditorProps> = ({ selectedText, setSelectedText }) => {
  const editorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleChange = (content: string) => {
    setSelectedText(content);
  };

  const handleEditorInit = (editor: any) => {
    editorRef.current = editor;
    setIsLoading(false);
  };

  return (
    <>
      <div>
        {isLoading && <p>Loading editor...</p>}
        <TinyEditor
          apiKey={import.meta.env.VITE_TINY_API_KEY}
          onInit={handleEditorInit}
          value={selectedText}
          init={{
            height: 500,
            menubar: false,
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
    </>
  );
};

export default Editor;
