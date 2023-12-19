import { format } from "date-fns";

const mockData = {
  id: 1,
  date: new Date("2023-01-01T00:00:00"),
  title: "Exploration Ideas",
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  tags: ["Design", "Productivity", "Training"],
};

const styles = {
  wrapper: "mt-3",
  title: "text-3xl mb-4",
  detailItem: "flex justify-between w-80 mb-3",
  detailItemLabel: "font-extralight",
  detailItemValue: "font-light",
  tagsContainer: "flex gap-2",
  tagItem: "bg-gray-100 p-1 font-extralight text-xs",
};

const Details = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{mockData.title}</h2>
      <div className={styles.detailItem}>
        <p className={styles.detailItemLabel}>Last Modified</p>
        <p className={styles.detailItemValue}>
          {format(mockData.date, "dd MMMM, yyyy")}
        </p>
      </div>
      <div className={styles.detailItem}>
        <p className={styles.detailItemLabel}>Tags</p>
        <div className={styles.tagsContainer}>
          {mockData.tags.map((tag) => (
            <p key={tag} className={styles.tagItem}>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
