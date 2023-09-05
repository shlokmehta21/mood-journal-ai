"use client";

import { useColorMode } from "@chakra-ui/react";
import { data } from "autoprefixer";
import { FC } from "react";
import {
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
} from "recharts";

interface HistoryChartProps {
  data: any;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  const dateLabel = new Date(label).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "time",
        distribution: "linear",
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#323546",
        },
      },
    },
  };

  if (active) {
    const analysis = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30 dark:text-slate-50">
          {dateLabel}
        </p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart: FC<HistoryChartProps> = ({ data }) => {
  const { colorMode } = useColorMode();
  return (
    <ResponsiveContainer width="90%" height={"90%"}>
      <LineChart width={300} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <CartesianGrid
          stroke={`${colorMode === "dark" ? "#838383" : "lightgray"}`}
          strokeDasharray="5 5"
        />

        <XAxis
          dataKey="createdAt"
          stroke={`${colorMode === "dark" ? "lightgray" : "lightgray"} `}
        />
        <Tooltip content={CustomTooltip} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
