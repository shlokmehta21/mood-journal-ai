import { FC } from "react";

interface AnalysisProps {}

const Analysis: FC<AnalysisProps> = ({}) => {
  return (
    <div className="border-l border-black/10">
      <div
        className="px-6 py-10"
        style={{ backgroundColor: entry?.analysis?.color }}
      >
        <h2 className="text-center text-2xl">Analysis</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((data) => (
            <li
              key={data.name}
              className=" px-4 py-5 flex items-center justify-between border-t border-b border-black/10"
            >
              <span className="text-lg font-semibold">{data.name}</span>

              <span>{data.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analysis;
