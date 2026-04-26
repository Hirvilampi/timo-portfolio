"use client";

import { useState, useRef } from "react";
import Ask from "@/components/chatbot/ask";
import classes from "./page.module.css";
import type {
  ChatbotPanelProps,
} from "@/types/embedding-types.ts";
import ChatMessages from "./ChatMessages";
import { useChatbotConversation } from "./useChatbotConversation";

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

export default function ChatbotPanel({
  chatHeader,
  chatDisclaimer,
  maxHeight = "80",
}: ChatbotPanelProps) {
  // id creator for each new conversation
  // const [conversationId, setConversationId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    hasSentFirstQuestion,
    startNewConversation,
    handleAsk,
  } = useChatbotConversation();

  return (
    <section>
      <div className="items-center">
        <h1 className="text-3xl  text-black dark:text-zinc-50">{chatHeader}</h1>
        {chatDisclaimer ? (
          <div className="text-xs ml-1 mb-2  sm:ml-3">{chatDisclaimer}</div>
        ) : (
          <div></div>
        )}
      </div>

      <section>
        <div className="flex flex-row gap-4">
          <Ask onAsk={handleAsk} isLoading={isLoading} />
          {hasSentFirstQuestion ? (
            <button className={classes.link} onClick={startNewConversation}>
              Reset chat
            </button>
          ) : (
            <div></div>
          )}
        </div>

        {hasSentFirstQuestion ? (
          <ChatMessages messages={messages} maxHeight={maxHeight}/>
        ) : (
          <div></div>
        )}
      </section>
    </section>
  );
}
