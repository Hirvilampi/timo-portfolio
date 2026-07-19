import Link from "next/link";
import ITsGrid from "@/components/its/its-grid";
import { getITProjects } from "@/lib/itprojects";
import BackButton from "@/components/BackButton";
import classes from "./page.module.css";
import OnMouseOver from "@/components/MouseOver";

export const dynamic = "force-dynamic";

export default async function Productions() {
  const itprojects = await getITProjects();

  return (
      <div className="page-shell">
        <main className="page-frame page-stack max-w-4xl">
          <OnMouseOver>
            <BackButton />
            <h1>IT projects and school work</h1>
            <section>
              <p className="mt-4">
                I started studying software development in Haaga-Helia
                University of Applied Sciences in the fall of 2024 and it looks
                like I'm graduating by the end of 2026. 2,5 years for 3,5 year
                studies besides work, with grade average over 4.5 seems like
                very good performance.
              </p>
              <div
                className={`${classes.cardWrapper} mt-4 items-center`}
              >
                <section className="surface-text hover:translate-x-2">
                  <Link href="./tech//">
                    <p className="items-start">
                      Core Tehcnologies - click for more info
                    </p>
                    <ul>
                      <li>Languages: Java, TypeScript, JavaScript, Python</li>
                      <li>Frontend: React, Next.js, Tailwind CSS, HTML, CSS</li>
                      <li>Mobile: React Native, Expo, React Navigation</li>
                      <li>Backend:  Node.js, Spring Boot, REST APIs, GraphQL, Vector Search / RAG</li>
                      <li>AI/Backend: Vercel AI SDK, OpenAI API,  RAG Architecture, Vector search, Embeddings</li>
                      <li>Databases: PostgreSQL, Firebase, Supabase, SQLite, Supabase Vector Database</li>
                      <li>Infrastructure & Systems: Linux, Bash, SSH, Apache HTTP Server, APT package management, Virtual machines, System troubleshooting, Log analysis
</li>
                      <li>
                        Security & Validation: Spring Security, Bean Validation
                      </li>
                      <li>Testing: JUnit, Mockito</li>
                      <li>
                        Tooling: GitHub, GitLab, Maven, Linux/macOS/Windows
                      </li>
                      <li>AI-assisted development: ChatGPT, Codex</li>
                    </ul>
                  </Link>
                </section>
              </div>
            </section>
            <div className="mt-6">
              <ITsGrid itprojects={itprojects} />
            </div>
          </OnMouseOver>
        </main>
      </div>
  );
}
