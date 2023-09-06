import { Analysis } from "./Analysis";
import { User } from "./User";

export type JournalEntry = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
  content: string;
  analysis?: Analysis | null;
};
