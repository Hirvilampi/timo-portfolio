import Link from "next/link";

import BackButton from "@/components/BackButton";

export default async function Technologies() {
  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
          <BackButton />

          <section>
            <h2 className="mt-6 text-xl sm:text-3xl">
              Technologies &amp; Tools I have experience on
            </h2>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              Programming Languages
            </h3>
            <ul className="text-sm sm:text-base">
              <li>Java 17</li>
              <li>TypeScript</li>
              <li>JavaScript</li>
              <li>Python</li>
              <li>C++</li>
              <li>Turbo Pascal</li>
            </ul>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              Frontend &amp; Web
            </h3>
            <ul className="text-sm sm:text-base">
              <li>React</li>
              <li>Next.js</li>
              <li>Vite</li>
              <li>HTML5, CSS3</li>
              <li>Tailwind CSS</li>
              <li>Bootstrap</li>
              <li>Figma</li>
            </ul>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              Mobile Development
            </h3>
            <ul className="text-sm sm:text-base">
              <li>React Native</li>
              <li>React Native Web</li>
              <li>Expo (expo-router, status-bar, constants)</li>
              <li>React Navigation</li>
              <li>UI libraries: react-native-paper, dropdown-picker</li>
            </ul>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              Backend &amp; APIs
            </h3>
            <ul className="text-sm sm:text-base">
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

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              Databases &amp; Storage
            </h3>
            <ul className="text-sm sm:text-base">
              <li>PostgreSQL</li>
              <li>
                Firebase (Authentication, Realtime Database, Firestore, Storage)
              </li>
              <li>Supabase</li>
              <li>H2 Database</li>
              <li>SQLite (local / offline storage)</li>
              <li>Hibernate (JPA implementation)</li>
            </ul>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              Testing &amp; Quality
            </h3>
            <ul className="text-sm sm:text-base">
              <li>Spring Boot Starter Test</li>
              <li>JUnit</li>
              <li>Mockito</li>
            </ul>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              DevOps &amp; Tooling
            </h3>
            <ul className="text-sm sm:text-base">
              <li>Maven (Spring Boot Maven)</li>
              <li>GitHub, GitLab</li>
              <li>Vercel (deployment & hosting)</li>
              <li>DevTools</li>
              <li>Linux, macOS, Windows</li>
            </ul>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              Mobile Device Features &amp; Media
            </h3>
            <ul className="text-sm sm:text-base">
              <li>AsyncStorage</li>
              <li>Expo Image Picker</li>
              <li>Expo Image Manipulator</li>
              <li>MediaLibrary</li>
              <li>Vector icons</li>
              <li>Gesture handler, Reanimated, Safe Area Context</li>
            </ul>

            <h3 className="mt-4 text-lg sm:text-xl text-amber-500">
              AI &amp; Productivity
            </h3>
            <ul className="text-sm sm:text-base">
              <li>AI tools for coding</li>
              <li>ChatGPT</li>
              <li>OpenAI Codex</li>
              <li>Linear</li>
              <li>Slack</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
