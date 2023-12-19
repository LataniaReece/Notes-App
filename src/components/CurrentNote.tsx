import Breadcrumb from "./CurrentNote/Breadcrumb";
import Details from "./CurrentNote/Details";
import Editor from "./CurrentNote/Editor";

const styles = {
  wrapper: "p-2 h-full",
};

const CurrentNote = () => {
  return (
    <div className={styles.wrapper}>
      <Breadcrumb />
      <Details />
      <Editor />
    </div>
  );
};

export default CurrentNote;
