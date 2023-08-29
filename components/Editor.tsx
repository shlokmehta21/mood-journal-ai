"use client";

import { updateEntry } from "@/utils/api";
import { FC, useState } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";
import { JournalEntry } from "@prisma/client";

interface EditorProps {
  entry: any;
}

const Editor: FC<EditorProps> = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const analysisData = [
    { name: "Summary", value: analysis.summary },
    { name: "Subject", value: analysis.subject },
    { name: "Mood", value: analysis.mood },
    { name: "Negative", value: analysis.negative ? "Yes" : "No" },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full overflow-y-hidden grid grid-cols-3 relative">
      <div className="absolute left-0 top-0 p-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10">
        <div
          className="px-6 py-10"
          style={{ backgroundColor: analysis?.color }}
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
    </div>
  );
};

export default Editor;
