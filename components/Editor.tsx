"use client";

import { updateEntry } from "@/utils/api";
import { FC, useState } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";

interface EditorProps {
  entry: any;
}

const Editor: FC<EditorProps> = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _value);
      setIsLoading(false);
    },
  });
  return (
    <div className="w-full h-full overflow-y-hidden relative">
      <div className="absolute right-1 top-0 p-5">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
