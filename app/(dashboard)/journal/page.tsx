import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";
import { FC } from "react";

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

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className=" flex justify-center items-center content-center my-4">
        <Question />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* <NewEntryCard /> */}
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
