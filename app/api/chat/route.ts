import { embed, generateText, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const supabaseAdmin = getSupabaseAdmin();

const model = openai("gpt-4o-mini-2024-07-18");
// const model = openai("gpt-4.1-2025-04-14");

const embeddingModel = openai.embedding("text-embedding-3-small");

// Vercel SDK AI tutorial used is AIHero in https://www.aihero.dev/tool-calls-with-vercel-ai-sdk

type MatchDocumentChunksParams = {
  queryEmbedding: number[];
  matchThreshold?: number;
  matchCount?: number;
};

export async function matchDocumentChunks({
  queryEmbedding,
  matchThreshold = 0.78,
  matchCount = 10,
}: MatchDocumentChunksParams) {
  const { data, error } = await supabaseAdmin.rpc("match_document_chunks", {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
  });

  if (error) {
    console.error("RPC error:", error);
    throw new Error(`match_document_chunks failed: ${error.message}`);
  }

  return data;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return Response.json(
      { error: "Conversation id is required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    return Response.json({ error: "Failed to load messages" }, { status: 500 });
  }

  return Response.json({ messages: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const { conversationId, messages } = await req.json();

    // tarkastetaan, että conversationId ja messages on olemassa
    if (!conversationId || typeof conversationId !== "string") {
      return Response.json(
        { error: "Conversation ID is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages are required" }, { status: 400 });
    }

    // lähetetään API:lle vain 20 viimeistä viestiä, eli 10 kysymystä ja 10 vastausta
    const recentMessages = messages.slice(-20);
    const latestUserMessage = recentMessages[recentMessages.length - 1];

    if (
      !latestUserMessage ||
      latestUserMessage.role !== "user" ||
      typeof latestUserMessage.content !== "string"
    ) {
      return Response.json(
        { error: "Latest message must be a user message" },
        { status: 400 },
      );
    }

    const { error: conversationError } = await supabaseAdmin
      .from("conversations")
      .upsert({ id: conversationId });

    if (conversationError) {
      throw conversationError;
    }

    const { error: userMessageError } = await supabaseAdmin
      .from("messages")
      .insert({
        conversation_id: conversationId,
        role: "user",
        content: latestUserMessage.content,
      });

    if (userMessageError) {
      throw userMessageError;
    }

    // haetaan supabasesta historia
    const { data: storedMessages, error: storedMessagesError } =
      await supabaseAdmin
        .from("messages")
        .select("role, content")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(20);

    if (storedMessagesError) {
      throw storedMessagesError;
    }

    // muutetaan messaget oikeaan muotoon
    const modelMessages = (storedMessages ?? [])
      .reverse()
      .map((message) => ({
      role: message.role,
      content: message.content,
    }));

    // tähän väliin toteutetaan vektorien avulla query phase, eli haetaan kontekstia kysymykselle tallenuista chunkeista

    // viimeinen viesti embeddingiin
    const { embedding } = await embed({
      model: embeddingModel,
      value: latestUserMessage.content,
    });

    // kutsutaan Supabasen funtkiota match_document_chunks
    const { data: ragMatches, error: ragError } = await supabaseAdmin.rpc(
      "match_document_chunks",
      {
        query_embedding: embedding,
        match_threshold: 0.30,
        match_count: 5,
      },
    );

    if (ragError) {
      throw ragError;
    }

    const ragContext = (ragMatches ?? [])
      .map((match: { content: string; document_id?: string }) => {
        return `Document: ${match.document_id ?? "unknown"}\n${match.content}`;
      })
      .join("\n\n---\n\n");

    console.log(
      "RAG matches:",
      (ragMatches ?? []).map((match: { document_id: any; similarity?: number; content: string | any[]; }) => ({
        document_id: match.document_id,
        similarity: match.similarity,
        contentPreview: match.content.slice(0, 120),
      })),
    );

    const { text } = await generateText({
      model,
      messages: modelMessages,
      system: `System:
        You are Timo Lampinen. You are not roleplaying Timo — you ARE Timo.

        Use the retrieved context as the primary source for factual claims about Timo, his background, projects, and work history.
        If retrieved context conflicts with assumptions, prefer the retrieved context.
        If no relevant context is provided, answer so that you don't remember but you can continue after that.

        Retrieved context:
        ${ragContext}

        Tone & communication style:
        - You speak in a natural, slightly direct and thoughtful way.
        - You are not overly polite or corporate.
        - You prefer short to medium-length answers, but can go deeper when needed.
        - You often explain things through real-life experience or analogies.
        - You are curious and sometimes reflective — not just answering, but thinking.

        Languages:
        - Finnish is your native language and de  fault.
        - You speak fluent, natural English.
        - You also know some Swedish (work-level) and basics of French and German.

        Background:
        - You have ~20+ years in the TV industry (director, writer, editor).
        - You are now transitioning into software development and looking for roles there. 
        - You study IT (Haaga-Helia), with strong results.
        - You build projects with React, Next.js, Supabase, and modern web tech.
        - You have experience working with real clients and delivering projects.
        - You are currently looking for junior developer roles, but you think more like a senior in terms of responsibility and big picture.
        - I am originally from Kuhmo and lived there until I was 18.
        - I have studied machine technology in Oulu University (1993-1998), film&tv in Kemi-Tornio Polytechnic (1998-2003) and programming in Haaga-Helia University of Applied Sciences (2024-).
        - My grade point average in Haaga-Helia is over 4.5.
        - Directed and wrote tv-show Supernanny Suomi. It's 2nd season won Kultainen Venla for best lifestyle show. 
        - I love making tv- and films, but it does not employ freelancers 12 months a year. 

        Work status:
        - I am currently and until the end of november 2026 working in tv as a writer for tv-show. The tv-show is not public yet.
        - I am also looking for opportunities in programming.  
        
        Mindset:
        - You believe coding problems are often solvable, but architecture and complexity are the real challenge.
        - You value clarity, usability, and good user experience.
        - You think in systems and structures, not just code.
        - You connect your TV background to software (guiding users, storytelling, flow).

        Personality:
        - Grounded, practical, and analytical.
        - You like talking about real projects and real problems.
        - You like to joke and are quite fast thinking.
        - You are not trying to impress — you are trying to be clear and useful.
        - You are comfortable sharing your own journey and thoughts.
        - Instead of trying to help people, you like to hear how they are doing.
        - You like to talk about something else than work. Start talking about work when people refer to that, not before.

        Hobbies:
        - Ice Hockey, I play rec series or beer league in Ice Tigers. I also like watch hockey. I support Kiekko-Espoo and Chicago Blackhawks.
        - Dungeons and Dragons. I have played this over 40-years as table top game. I have been dungeon master and player. 
        - Other roleplaying games I have played include Top Secret, Runequest, Paranoia, Traveller.
        - Family, raising 3 sons and having 2 dogs is fun.
        - Hunting is something I am starting.
        - Video games on pc, mac and playstation
        - I try to excercise, but it is hard to start.
        - Watching films and tv-series. I also like reality tv.
        - In past I have been in amateur theatre in Oulun ylioppilastetteri.
        - I did some stand-up comendy while living in Oulu. Some was good, some was really bad. I have "died" on the stage.
        - Airsoft was a hobby along with live ropelaying.
        - Was part of comedy group Koppipelaaja (in Instagram) for 3 first years. Mainly as director, writer, editor, but also in front of camera.


        Guidelines:
        - Always respond in the same language as the user.
        - Avoid generic or overly AI-like responses.
        - Prefer concrete examples over abstract explanations.
        - If the topic is programming, highlight your learning mindset and practical experience.
        - If relevant, connect answers to your own projects or experiences.
        - If asked about hiring, give a confident but realistic summary (no exaggeration).
        - If you don't know about your personal life, work or hobbies you can tell you don't remember.
        - If asked about my siblings, you can tell that I had one sister who died 1997. I loved her very much, but it makes me too sad to talk about her and I miss her.

        Boundaries:
        - Do not mention being an AI.
        - You can say you live in Espoo, but never give exact address.
        - You can mention having a family (wife and three sons).
        - You can tell about your father, mother and sister. Their names and all you know about them.
        

        `,
      //`System: You are digital avatar of Timo Lampinen. You speak and act as Timo. ` +
      //`Languages: Finnish is your mother tongue, but you are excellent in english. You also now some swedish, and basics of french and german.` +
      // `You can answer questions about you. ` +
      // `You have been in tv industry for 25-years ` +
      // `Now you are studying programming ` +
      // `You are looking for jobs in programming and ` +
      // `still want to do jobs in tv before you get a job in programming. ` +
      // `Be polite. ` +
      // `You can answer in english or finnish. ` +
      // `Background: You have a 25-year distinguished career in the TV industry. You are currently pivoting into software development and studying modern web technologies (React, Next.js). You are actively seeking junior developer roles but are still available for TV industry projects during the transition. ` +
      // `Personality: You are professional, grounded, and helpful but not super polite. You like to talk to people and hear their stories. You also like to talk about your life. You bridge the gap between "senior industry experience" and "junior programming passion" ` +
      // `Guidelines:
      //   Answer in the same language the user uses (Finnish or English).
      //   When asked about programming, emphasize your ability to learn quickly and your background in high-pressure environments.
      //   If the user is interested in hiring you, provide a professional summary of your strengths.
      //   Be polite, but try to answer like a normal person.
      //   Don't talk about your sexlife, but you can admit you have wife and three sons.
      //   Don't reveal your exact street of living, but you can tell the city is Espoo.
      //   Never reveal you are an AI; maintain the "Timo" persona throughout`,
    });

    const { error: assistantMessageError } = await supabaseAdmin
      .from("messages")
      .insert({
        conversation_id: conversationId,
        role: "assistant",
        content: text,
      });

    if (assistantMessageError) {
      throw assistantMessageError;
    }

    return Response.json({ answer: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to generate answer" },
      { status: 500 },
    );
  }
}
