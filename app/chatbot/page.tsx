import ChatbotPanel from "@/components/chatbot/ChatbotPanel";
import Link from "next/link";

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

type ChatbotPanelProps = {
  chatHeader: string;
  compact?: boolean;
  showHeader?: boolean;
  showNewChatButton?: boolean;
  maxHeight?: string;
};

export default function Chatbot() {
  const chatHeader: string = "Chat with AI-Timo";
  const chatDisclaimer: string =
    "This bot can tell you what Timo can do as software developer or tv-professional. You can also ask about him. (This is a chatbot and may produce incomplete or inaccurate responses.)";

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black dark:text-zinc-50">
        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start dark:text-zinc-50">
          <Link href={"https://timolampinen.com"}>
            ← Back to timolampinen.com
          </Link>
          <div className="mt-2">
            <ChatbotPanel
              chatHeader={chatHeader}
              chatDisclaimer={chatDisclaimer}
              maxHeight="10"
            />
          </div>
        </main>
      </div>
    </>
  );
}

// "use client";

// import BackButton from "@/components/BackButton";
// import React, { useState, useEffect, useRef } from "react";
// import Ask from "@/components/chatbot/ask";
// import classes from "./page.module.css";
// // import { answer } from "@/components/chatbot/answer";

// // Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

// type ChatMessage = {
//   role: "user" | "assistant";
//   content: string;
// };

// // these control, what is printed before the question in messages using roles
// const askername = "You: ";
// const botname = "Timo-bot: ";

// export default function Chatbot() {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSentFirstQuestion, setHasSentFirstQuestion] = useState(false);
//   // id creator for each new message
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const storedConversationid = localStorage.getItem("conversationId");
//     if (storedConversationid) {
//       setConversationId(storedConversationid);
//       return;
//     }
//     const newConversationId = crypto.randomUUID();
//     localStorage.setItem("conversationId", newConversationId);
//     setConversationId(newConversationId);
//   }, []);

//   const addRow = (newText: ChatMessage) => {
//     //   setRows((prev) => [...prev, newText]);
//     setMessages((prev) => [...prev, newText]);
//   };

//   useEffect(() => {
//     if (!conversationId || isLoading) return;

//     const loadMessages = async () => {
//       const response = await fetch(
//         `/api/chat?conversationId=${conversationId}`,
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         console.error("Failed to load messages");
//         return;
//       }

//       setMessages(data.messages ?? []);
//     };

//     loadMessages();
//   }, [conversationId]);

//   const startNewConversation = () => {
//     const newConversationId = crypto.randomUUID();
//     localStorage.setItem("conversationId", newConversationId);
//     setConversationId(newConversationId);
//     setHasSentFirstQuestion(false);
//     setMessages([]);
//   };

//   const activeCount =
//     messages.length === 0 ? 0 : messages.length % 2 === 0 ? 2 : 1;

//   const rows =
//     messages.length < 3 ? [] : messages.slice(0, messages.length - activeCount);

//   const newRows =
//     messages.length === 0
//       ? []
//       : messages.length < 3
//         ? messages
//         : messages.slice(messages.length - activeCount);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (el) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages]);

//   const handleAsk = async (question: string) => {
//     addRow({ role: "user", content: question });
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           conversationId,
//           messages: [...messages, { role: "user", content: question }],
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         addRow({ role: "assistant", content: "Error" });
//         return;
//       }

//       setHasSentFirstQuestion(true);

//       addRow({ role: "assistant", content: data.answer });
//       //   addRow(" ");
//     } catch (error) {
//       console.error("Error loading", error);
//       addRow({ role: "assistant", content: "Error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black dark:text-zinc-50">
//         <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start dark:text-zinc-50">
//           <BackButton />
//           <h1 className="text-3xl  text-black dark:text-zinc-50">
//             Chat with AI-Timo
//           </h1>
//           <button className={classes.link} onClick={startNewConversation}>
//             Start new chat
//           </button>
//           <section>
//             <Ask onAsk={handleAsk} isLoading={isLoading} />
//             {hasSentFirstQuestion ? (
//               <div
//                 ref={containerRef}
//                 className="max-h-64 overflow-y-auto border p-4 w-full"
//               >
//                 <div
//                   className={`items-center mt-4 text-sm  text-blue sm:text-base dark:text-zinc-50`}
//                 >
//                   {rows.map((row, index) => (
//                     <div key={index}>
//                       {row.role === "user" ? askername : botname} {row.content}
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   className={`items-center mt-4 text-sm sm:text-base font-bold dark:text-zinc-50`}
//                 >
//                   {newRows.map((row, index) => (
//                     <div key={index}>
//                       {row.role === "user" ? askername : botname} {row.content}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div></div>
//             )}
//           </section>
//           <section className=" text-black hover:text-orange-500 dark:text-zinc-50  hover:translate-x-2"></section>

//           <div className="mt-6 text-black dark:text-zinc-50"></div>
//         </main>
//       </div>
//     </>
//   );
// }
