type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type Note = {
  id: string | null;
  title: string;
  text: string;
  tags: ("Personal" | "Work" | "Study" | "Important" | "To-do" | "Journal")[];
  created_at: number;
  updated_at: number;
};
