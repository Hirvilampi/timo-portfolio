"use client";

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
  const {
    messages,
    isLoading,
    hasSentFirstQuestion,
    startNewConversation,
    handleAsk,
  } = useChatbotConversation();

  return (
    <section className="w-full max-w-[44rem]">
      <div className="items-center">
        <h1>{chatHeader}</h1>
        {chatDisclaimer ? (
          <div className="meta-text mt-3 mb-4 max-w-[44rem]">
            {chatDisclaimer}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <section className="space-y-4">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-4">
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
