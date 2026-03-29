"use client";

import React, { useState } from "react";

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

type AskProps = {
  onAsk: (question: string) => void;
  isLoading: boolean;
};

export default function Ask({ onAsk, isLoading }: AskProps) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAsk(question);
    setQuestion("");
  }

  return (
    <>
      Ask me (Kysy minulta):{" "}
      <form
        onSubmit={handleSubmit}
        // className="mt-4 outline-1 text-sm sm:text-base text-black caret-black dark:text-zinc-50 dark:caret-white"
      >
        <input
          type="text"
          // className="border border-zinc-700 bg-white text-black px-3 py-2 rounded-md dark:text-white  caret-blackfocus:outline-none focus:ring-2 focus:ring-zinc-400"
          className="
              border border-zinc-700
              bg-white text-black
              dark:bg-zinc-900 dark:text-white
              px-3 py-2 rounded-md  
              caret-black dark:caret-white
              focus:outline-none focus:ring-2 focus:ring-zinc-400
            "
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </form>

      {isLoading && (
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Hmm...
        </p>
      )}
    </>
  );
}
