import Link from "next/link";

import BackButton from "@/components/BackButton";
import OnMouseOver from "@/components/MouseOver";

export default async function Technologies() {
  return (
    <>
      <div className="page-shell">
        <main className="page-frame page-stack max-w-4xl">
          <OnMouseOver>
            <BackButton />

            <section>
              <h1 className="mt-2">
                Technologies &amp; Tools I have experience on
              </h1>

              <h3 className="mt-6 text-[var(--text-primary)]">
                Programming Languages
              </h3>
              <ul>
                <li>Java 17</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>C++</li>
                <li>Turbo Pascal</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                Frontend &amp; Web
              </h3>
              <ul>
                <li>React</li>
                <li>Next.js</li>
                <li>Vite</li>
                <li>HTML5, CSS3</li>
                <li>Tailwind CSS</li>
                <li>Bootstrap</li>
                <li>Figma</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                Mobile Development
              </h3>
              <ul>
                <li>React Native</li>
                <li>React Native Web</li>
                <li>Expo (expo-router, status-bar, constants)</li>
                <li>React Navigation</li>
                <li>UI libraries: react-native-paper, dropdown-picker</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                Backend &amp; APIs
              </h3>
              <ul>
                <li>Node.js (backend JavaScript)</li>
                <li>Spring Boot</li>
                <li>Spring Web / Spring MVC (REST)</li>
                <li>Spring Data JPA + REST</li>
                <li>Spring Boot Validation (Bean Validation)</li>
                <li>Spring Security</li>
                <li>Spring Boot Actuator</li>
                <li>GraphQL</li>
                <li>REST APIs</li>
              </ul>

            <h3 className="mt-6 text-[var(--text-primary)]">
                AI / Backend &amp; APIs
              </h3>
              <ul>
                <li>OpenAI API</li>
                <li>Vercel AI SDK</li>
                <li>Supabase Vector Search</li>
                <li>RAG Architecture</li>
                <li>Embeddings</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                Databases &amp; Storage
              </h3>
              <ul>
                <li>PostgreSQL</li>
                <li>
                  Firebase (Authentication, Realtime Database, Firestore,
                  Storage)
                </li>
                <li>Supabase</li>
                <li>H2 Database</li>
                <li>SQLite (local / offline storage)</li>
                <li>Hibernate (JPA implementation)</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                Testing &amp; Quality
              </h3>
              <ul>
                <li>Spring Boot Starter Test</li>
                <li>JUnit</li>
                <li>Mockito</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                DevOps &amp; Tooling
              </h3>
              <ul>
                <li>Maven (Spring Boot Maven)</li>
                <li>GitHub, GitLab</li>
                <li>Vercel (deployment & hosting)</li>
                <li>DevTools</li>
                <li>Linux, macOS, Windows</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                Mobile Device Features &amp; Media
              </h3>
              <ul>
                <li>AsyncStorage</li>
                <li>Expo Image Picker</li>
                <li>Expo Image Manipulator</li>
                <li>MediaLibrary</li>
                <li>Vector icons</li>
                <li>Gesture handler, Reanimated, Safe Area Context</li>
              </ul>

              <h3 className="mt-6 text-[var(--text-primary)]">
                AI &amp; Productivity
              </h3>
              <ul>
                <li>AI tools for coding</li>
                <li>ChatGPT</li>
                <li>OpenAI Codex</li>
                <li>Linear</li>
                <li>Slack</li>
              </ul>
            </section>
          </OnMouseOver>
        </main>
      </div>
    </>
  );
}
