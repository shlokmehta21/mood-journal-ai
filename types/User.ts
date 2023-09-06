import { Analysis } from "./Analysis";
import { JournalEntry } from "./JournalEntry";

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  email: string;
  entries?: JournalEntry[];
  analysis?: Analysis[];
};
