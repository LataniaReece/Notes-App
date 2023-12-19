const styles = {
  wrapper: "flex gap-2 font-light pt-2 pb-5 border-b border-gray-100 ",
};

const Breadcrumb = () => {
  return (
    <div className={styles.wrapper}>
      <button>My Notes</button>
      <p>{`>`}</p>
      <p>System Database Week 4</p>
    </div>
  );
};

export default Breadcrumb;
