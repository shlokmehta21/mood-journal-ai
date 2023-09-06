import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";
import { FC } from "react";
import type { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs";

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
  });

  return entries;
};

interface JournalPageProps {}

const JournalPage: FC<JournalPageProps> = async ({}) => {
  const entries = await getEntries();
  const user: User | null = await currentUser();

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-8 mt-[-15px] text-center mr-4 md:text-left md:text-3xl">
        Hey,{" "}
        {`${user?.firstName?.charAt(0)?.toUpperCase()}${user?.firstName?.slice(
          1
        )}`}{" "}
        {`${user?.lastName?.charAt(0)?.toUpperCase()}${user?.lastName?.slice(
          1
        )}`}{" "}
        👋
      </h2>
      <div className=" flex justify-center items-center content-center my-4">
        <Question />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {entries.map((entry: any) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
