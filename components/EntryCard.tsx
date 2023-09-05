import { FC } from "react";

interface EntryCardProps {
  entry: any;
}

const EntryCard: FC<EntryCardProps> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-600 overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow">
      <div className="px-4 py-5 sm:px-6 capitalize">{date}</div>
      <div className="px-4 py-5 sm:p-6 capitalize">
        {entry?.analysis?.summary}
      </div>
      <div className="px-4 py-4 sm:px-6 capitalize">
        {entry?.analysis?.mood}
      </div>
    </div>
  );
};

export default EntryCard;
