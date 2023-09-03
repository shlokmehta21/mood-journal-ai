"use client";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";

interface NewEntryCardProps {}

const NewEntryCard: FC<NewEntryCardProps> = ({}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    startTransition(() => router.push(`/journal/${data.id}`));
    startTransition(() => router.refresh());
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-3 py-3 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
