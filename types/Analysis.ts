import { JournalEntry } from "./JournalEntry";
import { User } from "./User";

export type Analysis = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  entry?: JournalEntry;
  userId: string;
  user?: User;
  mood: string;
  summary: string;
  color: string;
  negative: boolean;
  subject: string;
  sentimentScore: number;
};
