import Link from "next/link";

import ITsGrid from "@/components/its/its-grid";
import { getITProjects } from "@/lib/itprojects";
import BackButton from "@/components/BackButton";
import classes from "./page.module.css";

export default async function Productions() {
  const itprojects = await getITProjects();

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
          <BackButton />
          <h1 className="text-3xl">IT projects and school work</h1>
          <p className="mt-4 text-sm sm:text-base ">
            I started studying software development in Haaga-Helia University of Applied Sciences in  
            the fall of 2024 and it looks like I'm graduating by the end of
            2026. 2,5 years for 3,5 year studies besides work, with grade
            average over 4.5 seems like very good performance.
          </p>
          <div className={`${classes.cardWrapper} items-center mt-4 text-sm sm:text-base`}>
            <Link href="./tech//">
              <p className="items-start">
                Core Tehcnologies - click for more info
              </p>
              <ul>
                <li>Languages: Java, TypeScript, JavaScript, Python</li>
                <li>Frontend: React, Next.js, Tailwind CSS, HTML, CSS</li>
                <li>Mobile: React Native, Expo, React Navigation</li>
                <li>Backend: Spring Boot, Node.js, REST APIs, GraphQL</li>
                <li>Databases: PostgreSQL, Firebase, Supabase, SQLite</li>
                <li>Security & Validation: Spring Security, Bean Validation</li>
                <li>Testing: JUnit, Mockito</li>
                <li>Tooling: GitHub, GitLab, Maven, Linux/macOS/Windows</li>
                <li>AI-assisted development: ChatGPT, Codex</li>
              </ul>
            </Link>
          </div>

          <div className="mt-6">
            <ITsGrid itprojects={itprojects} />
          </div>
        </main>
      </div>
    </>
  );
}
