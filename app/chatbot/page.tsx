"use client";

import BackButton from "@/components/BackButton";
import React, { useState } from "react";
import Ask from "@/components/chatbot/ask";
import { setMaxListeners } from "events";
// import { answer } from "@/components/chatbot/answer";

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

export default function Chatbot() {
  const [messages, setMessages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const addRow = (newText: string) => {
    //   setRows((prev) => [...prev, newText]);

    setMessages((prev) => [...prev, newText]);
  };

  const activeCount =
    messages.length === 0 ? 0 : messages.length % 2 === 0 ? 2 : 1;

  const rows =
    messages.length < 3 ? [] : messages.slice(0, messages.length - activeCount);

  const newRows =
    messages.length === 0
      ? []
      : messages.length < 3
        ? messages
        : messages.slice(messages.length - activeCount);
  const handleAsk = async (question: string) => {
    addRow("You: " + question);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        addRow("Timo-bot: Error");
        return;
      }

      addRow("Timo-bot: " + data.answer);
      //   addRow(" ");
    } catch (error) {
      console.error("Error loading", error);
      addRow("Timo-bot: Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black dark:text-zinc-50">
        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start dark:text-zinc-50">
          <BackButton />
          <h1 className="text-3xl  text-black dark:text-zinc-50">
            Chat with AI-Timo
          </h1>
          <section>
            <Ask onAsk={handleAsk} isLoading={isLoading} />

            <div
              className={`items-center mt-4 text-sm  text-blue sm:text-base dark:text-zinc-50`}
            >
              {rows.map((row, index) => (
                <div key={index}>{row}</div>
              ))}
            </div>
            <div
              className={`items-center mt-4 text-sm sm:text-base font-bold dark:text-zinc-50`}
            >
              {newRows.map((row, index) => (
                <div key={index}>{row}</div>
              ))}
            </div>

            <section className=" text-black hover:text-orange-500 dark:text-zinc-50  hover:translate-x-2"></section>
          </section>
          <div className="mt-6 text-black dark:text-zinc-50"></div>
        </main>
      </div>
    </>
  );
}
