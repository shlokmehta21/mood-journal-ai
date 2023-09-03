"use client";

import { deleteEntry, updateEntry } from "@/utils/api";
import { FC, useState, useTransition } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";
import { JournalEntry } from "@prisma/client";
import { useRouter } from "next/navigation";

interface EditorProps {
  entry: any;
}

const Editor: FC<EditorProps> = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const [isPending, startTransition] = useTransition();

  const analysisData = [
    { name: "Summary", value: analysis.summary },
    { name: "Subject", value: analysis.subject },
    { name: "Mood", value: analysis.mood },
    { name: "Negative", value: analysis.negative ? "Yes" : "No" },
  ];
  const router = useRouter();

  const handleDelete = async () => {
    await deleteEntry(entry.id);
    startTransition(() => router.push("/journal"));
    startTransition(() => router.refresh());
  };

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return;

      setIsLoading(true);

      const data = await updateEntry(entry.id, _value);
      if (data.analysis !== undefined) {
        setAnalysis(data.analysis);
      }
      setIsLoading(false);
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Left portion */}
      <div className="absolute left-0 top-0 p-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="flex-grow md:w-[1400px]">
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {/* Right portion */}
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
                className="px-4 py-5 flex items-center justify-between border-t border-b border-black/10"
              >
                <span className="text-lg font-semibold">{data.name}</span>
                <span>{data.value}</span>
              </li>
            ))}
            <li className="py-4 px-8 flex items-center justify-between">
              <button
                onClick={handleDelete}
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus-visible:ring focus-visible:ring-red-600 focus-visible:ring-opacity-50"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
