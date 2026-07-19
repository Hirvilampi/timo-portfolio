"use client";

import { useEffect, useRef } from "react";
import type {
  ChatMessage,
} from "@/types/embedding-types.ts";
import ParseTextToReact from "./ReactTextParser";

type ChatMessagesProps = {
  messages: ChatMessage[];
  maxHeight?: string;
};

const askername = "You: ";
const botname = "AI-Timo: ";

export default function ChatMessages({ messages, maxHeight="80" }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const height = maxHeight ? `${Number(maxHeight) / 4}rem` : "20rem";

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
        style={{ maxHeight: height }}
        className="w-full overflow-y-auto rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface)] p-6"
      >
        <div
          className="space-y-3 text-[17px] leading-[1.65] text-[#4f2f20]"
        >
          {rows.map((row, index) => (
            <div key={index}>
              <span className="font-semibold tracking-[0.01em]">
                {row.role === "user" ? askername : botname}
              </span>{" "}
              <ParseTextToReact text={row.content} />
            </div>
          ))}
        </div>
        <div
          className="mt-4 space-y-3 text-[17px] font-semibold leading-[1.65] text-[#4f2f20]"
        >
          {newRows.map((row, index) => (
            <div key={index}>
              <span className="tracking-[0.01em]">
                {row.role === "user" ? askername : botname}
              </span>{" "}
              <ParseTextToReact text={row.content} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
