"use client";

import React, {useState} from "react";

type AskProps = {
  onAsk: (question: string) => void;
};

export default function Ask({ onAsk }: AskProps) {
const [question, setQuestion] = useState("");

 function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAsk(question);
    setQuestion("");
  }
  return (
    <>
      Ask me:{" "}
      <form
        onSubmit={handleSubmit}
        className="mt-4 outline-1 text-sm sm:text-base text-black dark:text-zinc-50"
      >
        <input 
        type="text"          
        value={question}
          onChange={(e) => setQuestion(e.target.value)} 
          />
      </form>
    </>
  );
}
