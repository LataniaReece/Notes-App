export type Note = {
  id: string | null;
  title: string;
  text: string;
  tags: string[];
  created_at: number;
  updated_at: number;
};
