import { useEffect, useState } from "react";
import { ChatMessage } from "@/types/embedding-types";

export function useChatbotConversation() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSentFirstQuestion, setHasSentFirstQuestion] = useState(false);
  // id creator for each new conversation
  const [conversationId, setConversationId] = useState<string | null>(null);

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

  // add row to messages
  const addRow = (newText: ChatMessage) => {
    //   setRows((prev) => [...prev, newText]);
    setMessages((prev) => [...prev, newText]);
  };

  // when conversionID is set, load old messages for that conversationId - this is our "long" memory
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

  // sends question to ask.tsx for creating answer. The returned data is then processed forward into messages.
  const handleAsk = async (question: string) => {
    // addRow({ role: "user", content: question });
    const nextMessages = [...messages, { role: "user", content: question } as ChatMessage, ];
    setMessages(nextMessages);
    setIsLoading(true);
    try {
      // fetch request POST to app/api/chat/route.ts
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

      addRow({ role: "assistant", content: data.answer });
    } catch (error) {
      console.error("Error loading", error);
      addRow({ role: "assistant", content: "Error" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleAsk,
    hasSentFirstQuestion,
    startNewConversation,
  };
}
