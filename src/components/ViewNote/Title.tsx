import { FC } from "react";
interface TitleProps {
  selectedTitle: string;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
}

const styles = {
  wrapper: "mt-3",
  input: "text-4xl w-full mb-3 focus:outline-none",
};

const Title: FC<TitleProps> = ({ selectedTitle, setSelectedTitle }) => {
  return (
    <div className={styles.wrapper}>
      <input
        placeholder="Untitled"
        value={selectedTitle}
        onChange={(e) => setSelectedTitle(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default Title;
