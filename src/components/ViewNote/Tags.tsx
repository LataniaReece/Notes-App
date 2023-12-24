import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import classnames from "classnames";

interface TagsProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const styles = {
  tagsWrapper: "mt-2 mb-4",
  heading: "font-extralight underline hover:no-underline",
  tagsContainer: "flex gap-2",
  tagItem:
    "rounded-lg p-1 font-light text-sm select-none cursor-pointer py-0.5 border border-transparent hover:border-gray-400 hover:text-black",
  selectedTag:
    "border border-gray-400 text-black bg-gray-100 hover:bg-transparent",
  unselectedTag: "bg-transparent text-gray-500 border-gray-500",
  selectTagsContainer: "flex gap-2 ml-30 font-extralight items-center mb-2",
  helper: "text-xs text-gray-400 italic font-extralight",
  buttonsContainer: "flex gap-2",
};

const Tags: FC<TagsProps> = ({ selectedTags, setSelectedTags }) => {
  const { noteInView } = useSelector((state: RootState) => state.notes);

  if (!noteInView) {
    return null;
  }

  const availableTags = [
    "Personal",
    "Work",
    "Study",
    "Important",
    "To-do",
    "Journal",
  ];

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  return (
    <div className={styles.tagsWrapper}>
      <div className={styles.selectTagsContainer}>
        <p>Tags: </p>
        {availableTags.map((tag) => (
          <p
            key={tag}
            className={classnames(styles.tagItem, {
              [styles.selectedTag]: selectedTags.includes(tag),
              [styles.unselectedTag]: !selectedTags.includes(tag),
            })}
            onClick={() => handleTagSelection(tag)}
          >
            {tag}
          </p>
        ))}
      </div>
      <p className={styles.helper}>Select/Unselect tags for your note</p>
    </div>
  );
};

export default Tags;
