import Actions from "./Actions";
import Breadcrumb from "./Breadcrumb";
import Details from "./Details";
import Editor from "./Editor";

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
