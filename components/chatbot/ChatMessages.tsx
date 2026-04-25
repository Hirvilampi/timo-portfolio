"use client";

import { useEffect, useRef } from "react";
import type {
  ChatMessage,
} from "@/types/embedding-types.ts";
import ParseTextToReact from "./ReactTextParser";

type ChatMessagesProps = {
  messages: ChatMessage[];
};

const askername = "You: ";
const botname = "AI-Timo: ";

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // These are used to to put old messages in rows and new question and answer in newRows
  // riippuen onko message-määrä parillinen vai parint saa activeCount parillisella arvon 2 ja parittomalla 1
  const activeCount =
    messages.length === 0 ? 0 : messages.length % 2 === 0 ? 2 : 1;

  // old rows - shown normall when rendered
  const rows =
    messages.length < 3 ? [] : messages.slice(0, messages.length - activeCount);

  // new rows - shown bold when rendered
  const newRows =
    messages.length === 0
      ? []
      : messages.length < 3
        ? messages
        : messages.slice(messages.length - activeCount);

  // scrolls chat-list down every time messages changes
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        ref={containerRef}
        className="max-h-80 overflow-y-auto border p-4 w-full"
      >
        <div
          className={`items-center mt-4 text-sm  text-blue sm:text-base dark:text-zinc-50`}
        >
          {rows.map((row, index) => (
            <div key={index}>
              {row.role === "user" ? askername : botname}{" "}
              <ParseTextToReact text={row.content} />
            </div>
          ))}
        </div>
        <div
          className={`items-center mt-4 text-sm sm:text-base font-bold dark:text-zinc-50`}
        >
          {newRows.map((row, index) => (
            <div key={index} className="inline-block">
              {row.role === "user" ? askername : botname}{" "}
              <ParseTextToReact text={row.content} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
