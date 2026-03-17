import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const model = openai("gpt-4o-mini-2024-07-18");

export const ssanswer = async (
    prompt: string,
) => {
    const {text} = await generateText({
        model,
        prompt,
    });

    return text;
}
