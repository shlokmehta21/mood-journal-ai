import { FC } from "react";
import { JournalEntry } from "@prisma/client";

interface EntryCardProps {
  entry: JournalEntry;
}

const EntryCard: FC<EntryCardProps> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">Summary</div>
      <div className="px-4 py-4 sm:px-6">Mood</div>
    </div>
  );
};

export default EntryCard;
