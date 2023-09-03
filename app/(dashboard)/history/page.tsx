import HistoryChart from "@/components/HistoryChart";
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
  console.log(analysis, avg);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className="w-full h-full flex flex-col items-center justify-center z-20">
        <HistoryChart data={analysis} />
      </div>
    </div>
  );
};

export default History;
