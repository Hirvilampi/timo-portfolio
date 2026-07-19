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
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full">
          <label
            htmlFor="chatbot-question"
            className="mb-2 block text-[15px] font-medium tracking-[0.02em] text-[var(--text-secondary)]"
          >
            Ask me (voit kysyä myos suomeksi):
          </label>
          <form
            onSubmit={handleSubmit}
          >
            <input
              id="chatbot-question"
              type="text"
              placeholder="Type your question"
              className="
              w-full
              rounded-2xl
              border border-[var(--border-soft)]
              bg-[var(--surface)]
              px-4 py-4
              text-[17px] text-[#4f2f20]
              placeholder:text-[#9c7258]
              focus:border-[var(--accent)]
              focus:outline-none focus:ring-2 focus:ring-[rgba(255,243,234,0.2)]
            "
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </form>
        </div>
        <div className="flex min-h-12 items-center justify-center sm:w-16">
          {isLoading && (
            <div className="h-8 w-10 animate-pulse">
              <p className="text-[15px] text-[var(--text-secondary)]">
                Hmm..
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
