"use client";
import { askQuestion } from "@/utils/api";
import { FC, useState } from "react";

interface QuestionProps {}

const Question: FC<QuestionProps> = ({}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          className="border border-black/10  px-4 py-2 text-lg rounded-lg"
          type="text"
          name="question"
          id="question"
          placeholder="Ask a question"
          onChange={onChange}
        />
        <button
          disabled={loading}
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg ml-3"
          type="submit"
        >
          Ask
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  );
};

export default Question;
