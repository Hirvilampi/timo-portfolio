"use client";

import BackButton from "@/components/BackButton";
import classes from "./page.module.css";
import React, { useState, useEffect } from "react";
import Ask from "@/components/chatbot/ask";
// import { answer } from "@/components/chatbot/answer";

export default function Chatbot() {
  const [rows, setRows] = useState<string[]>([]);

  const addRow = (newText: string) => {
    setRows((prev) => [...prev, newText]);
  };

  const handleAsk = async (question: string) => {
    addRow("You: " + question);

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
      addRow(" ");
    } catch (error) {
      console.error("Error loading", error);
      addRow("Timo-bot: Error");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
          <BackButton />
          <h1 className="text-3xl  text-black dark:text-zinc-50">
            Chat with AI-Timo
          </h1>
          <section>
            <Ask onAsk={handleAsk} />
            <div className={`items-center mt-4 text-sm sm:text-base`}>
              {rows.map((row, index) => (
                <div key={index}>{row}</div>
              ))}
              <section className=" text-black hover:text-orange-500 dark:text-zinc-50  hover:translate-x-2"></section>
            </div>
          </section>
          <div className="mt-6 text-black dark:text-zinc-50"></div>
        </main>
      </div>
    </>
  );
}
