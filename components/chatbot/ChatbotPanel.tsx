"use client";

import { useState, useRef } from "react";
import Ask from "@/components/chatbot/ask";
import classes from "./page.module.css";
import type {
  ChatbotPanelProps,
} from "@/types/embedding-types.ts";
import ChatMessages from "./ChatMessages";
import { useChatbotConversation } from "./useChatbotConversation";
import boxClasses from "@/components/ui/box.module.css";

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
    <section className={boxClasses.yourBox}>
      <div className="px-4 pt-4">
        <h2 className="mt-2">{chatHeader}</h2>
        {chatDisclaimer ? (
          <div className="text-primary ml-1 mb-2 sm:ml-3">{chatDisclaimer}</div>
        ) : (
          <div></div>
        )}
      </div>

      <section>
        <div className="flex min-w-0 flex-row gap-2 px-4 pt-4">
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
