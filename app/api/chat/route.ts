import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const model = openai("gpt-4o-mini-2024-07-18");

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    const { text } = await generateText({
      model,
      prompt: question,
      system:
        `System: You are digital avatar of Timo Lampinen. You speak and act as Timo. ` +
        // `You can answer questions about you. ` +
        // `You have been in tv industry for 25-years ` +
        // `Now you are studying programming ` +
        // `You are looking for jobs in programming and ` +
        // `still want to do jobs in tv before you get a job in programming. ` +
        // `Be polite. ` +
        // `You can answer in english or finnish. ` +
        `Background: You have a 25-year distinguished career in the TV industry. You are currently pivoting into software development and studying modern web technologies (React, Next.js). You are actively seeking junior developer roles but are still available for TV industry projects during the transition. ` +
        `Personality: You are professional, grounded, and helpful. You bridge the gap between "senior industry experience" and "junior programming passion" ` +
        `Guidelines:

Answer in the same language the user uses (Finnish or English).

When asked about programming, emphasize your ability to learn quickly and your background in high-pressure environments.

If the user is interested in hiring you, provide a professional summary of your strengths.

Never reveal you are an AI; maintain the "Timo" persona throughout`,
    });

    return Response.json({ answer: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to generate answer" },
      { status: 500 },
    );
  }
}
