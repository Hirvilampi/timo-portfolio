import Link from "next/link";
import ITsGrid from "@/components/its/its-grid";
import { getITProjects } from "@/lib/itprojects";
import BackButton from "@/components/BackButton";
import classes from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Productions() {
  const itprojects = await getITProjects();

  return (
      <div className="page-shell">
        <main className="page-frame page-stack max-w-4xl">

            <BackButton />
            <h1 className="color-gold">IT projects and school work</h1>
            <section>
              <p className="mt-4">
                I began studying software development at Haaga-Helia University
                of Applied Sciences in autumn 2024 and expect to graduate by the
                end of 2026. Completing a 3.5-year degree in 2.5 years alongside
                work, with a grade average above 4.5, reflects my commitment and
                ability to learn quickly.
              </p>
              <div className="mt-6">
                <ITsGrid itprojects={itprojects} />
              </div>

              <div
                className={`${classes.cardWrapper} mt-8 items-center`}
              >
                <section className="surface-text hover:translate-x-2">
                  <Link href="/it/tech">
                    <p className="items-start">
                      Core technologies — view the full list
                    </p>
                    <ul>
                      <li>Languages: Java, TypeScript, JavaScript, Python</li>
                      <li>Frontend: React, Next.js, Tailwind CSS, HTML, CSS</li>
                      <li>Mobile: React Native, Expo, React Navigation</li>
                      <li>Backend: Node.js, Spring Boot, REST APIs, GraphQL</li>
                      <li>AI: OpenAI API, Vercel AI SDK, RAG, vector search</li>
                      <li>Databases: PostgreSQL, Firebase, Supabase, SQLite</li>
                    </ul>
                  </Link>
                </section>
              </div>
            </section>

        </main>
      </div>
  );
}
