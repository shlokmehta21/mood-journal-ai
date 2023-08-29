import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { JournalEntry } from "@prisma/client";
import { FC } from "react";
import { boolean } from "zod";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

interface EntryPageProps {
  params: JournalEntry;
}

const EntryPage: FC<EntryPageProps> = async ({ params }) => {
  const entry = await getEntry(params.id);

  return (
    <div className="h-full w-full">
      <Editor entry={entry as JournalEntry} />
    </div>
  );
};

export default EntryPage;
