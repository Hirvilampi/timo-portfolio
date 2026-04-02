"use client";

import React, { useState, useEffect, useRef } from "react";
import Ask from "@/components/chatbot/ask";
import classes from "./page.module.css";
import type { ChatMessage, ChatbotPanelProps} from "@/types/embedding-types.ts";
import ParseTextToReact from "./ReactTextParser";
// import { answer } from "@/components/chatbot/answer";

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

// these control, what is printed before the question in messages using roles
const askername = "You: ";
const botname = "AI-Timo: ";

// type ChatbotPanelProps = {
//   chatHeader: string;
//   chatVersion?: string;
//   compact?: boolean;
//   showHeader?: boolean;
//   showNewChatButton?: boolean;
//   maxHeight?: string;
// };

export default function ChatbotPanel({chatHeader, chatVersion}: ChatbotPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSentFirstQuestion, setHasSentFirstQuestion] = useState(false);
  // id creator for each new message
  const [conversationId, setConversationId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedConversationid = localStorage.getItem("conversationId");
    if (storedConversationid) {
      setConversationId(storedConversationid);
      return;
    }
    const newConversationId = crypto.randomUUID();
    localStorage.setItem("conversationId", newConversationId);
    setConversationId(newConversationId);
  }, []);

  const addRow = (newText: ChatMessage) => {
    //   setRows((prev) => [...prev, newText]);
    setMessages((prev) => [...prev, newText]);
  };

  useEffect(() => {
    if (!conversationId || isLoading) return;

    const loadMessages = async () => {
      const response = await fetch(
        `/api/chat?conversationId=${conversationId}`,
      );
      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to load messages");
        return;
      }

      setMessages(data.messages ?? []);
    };

    loadMessages();
  }, [conversationId]);

  const startNewConversation = () => {
    const newConversationId = crypto.randomUUID();
    localStorage.setItem("conversationId", newConversationId);
    setConversationId(newConversationId);
    setHasSentFirstQuestion(false);
    setMessages([]);
  };

  // riippuen onko message-määrä parillinen vai parint saa activeCount parillisella arvon 2 ja parittomalla 1
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

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleAsk = async (question: string) => {
    addRow({ role: "user", content: question });
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          messages: [...messages, { role: "user", content: question }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        addRow({ role: "assistant", content: "Error" });
        return;
      }

      setHasSentFirstQuestion(true);

      addRow({ role: "assistant", content: data.answer});
      //   addRow(" ");
    } catch (error) {
      console.error("Error loading", error);
      addRow({ role: "assistant", content: "Error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
        <div className="items-center">
          <h1 className="text-3xl  text-black dark:text-zinc-50">
            {chatHeader}
          </h1>
          {chatVersion ? (<div className="text-xs ml-1 mb-2  sm:ml-3">{chatVersion}</div>) : (<div></div>)}
          </div>

          <section>
            <div className="flex flex-row gap-4">
            <Ask onAsk={handleAsk} isLoading={isLoading} />
          <button className={classes.link} onClick={startNewConversation}>
            Reset chat
          </button>
            </div>

            {hasSentFirstQuestion ? (
              <div
                ref={containerRef}
                className="max-h-80 overflow-y-auto border p-4 w-full"
              >
                <div
                  className={`items-center mt-4 text-sm  text-blue sm:text-base dark:text-zinc-50`}
                >
                  {rows.map((row, index) => (
                    <div key={index}>
                      {row.role === "user" ? askername : botname} {row.content}
                    </div>
                  ))}
                </div>
                <div
                  className={`items-center mt-4 text-sm sm:text-base font-bold dark:text-zinc-50`}
                >
                  {newRows.map((row, index) => (
                    <div key={index} className="inline-block">
                      {row.role === "user" ? askername : botname} <ParseTextToReact text={row.content} /> 
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </section>
    </section>
  );
}
