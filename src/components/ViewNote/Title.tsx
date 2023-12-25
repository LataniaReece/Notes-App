import { FC, useEffect, useRef } from "react";
interface TitleProps {
  selectedTitle: string;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
  autoFocus: boolean;
}

const styles = {
  wrapper: "mt-3",
  input:
    "text-4xl w-full mb-3 focus:outline-none dark:bg-slate-900 dark:text-slate-200",
};

const Title: FC<TitleProps> = ({
  selectedTitle,
  setSelectedTitle,
  autoFocus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        placeholder="Untitled"
        value={selectedTitle}
        onChange={(e) => setSelectedTitle(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default Title;
