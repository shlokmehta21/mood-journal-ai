import HistoryChart from "@/components/HistoryChart";
import EmptyState from "@/components/layout/EmptyState";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { FC } from "react";

const getData = async () => {
  const user = await getUserByClerkId();
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analysis.reduce((acc, curr) => acc + curr.sentimentScore, 0);
  const avg = Math.round(sum / analysis.length);
  return { analysis, avg };
};

interface HistoryProps {}

const History: FC<HistoryProps> = async ({}) => {
  const { analysis, avg } = await getData();

  if (analysis.length === 0)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center content-center">
        <EmptyState />
        <h2 className="text-xl mt-4">You don&apos;t have any entries yet.</h2>
        <h2 className="text-lg mt-4">Click + to get started</h2>
      </div>
    );

  return (
    <div className="w-full h-full overflow-auto p-6">
      <>
        <div className="text-xl">{`Average Sentiment - ${avg}`}</div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <HistoryChart data={analysis} />
        </div>
      </>
    </div>
  );
};

export default History;
