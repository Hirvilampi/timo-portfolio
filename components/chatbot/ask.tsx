"use client";

import React, { useState } from "react";

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
        // className="mt-4 outline-1 text-sm sm:text-base text-black caret-black dark:text-zinc-50 dark:caret-white"
      >
        <input
          type="text"
          className="border border-zinc-700 bg-white text-black px-3 py-2 rounded-md
             caret-black
             focus:outline-none focus:ring-2 focus:ring-zinc-400"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </form>
    </>
  );
}
