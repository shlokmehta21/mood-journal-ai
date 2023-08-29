"use client";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface NewEntryCardProps {}

const NewEntryCard: FC<NewEntryCardProps> = ({}) => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    console.log(data);

    router.push(`/journal/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
