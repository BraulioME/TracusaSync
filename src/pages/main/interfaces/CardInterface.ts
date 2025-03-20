export interface CardInterface {
  id: number;
  content: ContentCard;
  container: "A" | "B" | "C";
}


type ContentCard = {
  title: string;
  due_date: string;
  id: string
  assignee: string;
}