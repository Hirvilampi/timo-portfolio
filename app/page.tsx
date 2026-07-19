import Image from "next/image";
import Link from "next/link";
import ShowTvLink from "./tv/page";
import ShowItLink from "./it/page";
import OnMouseOver from "@/components/MouseOver";
import ChatbotPanel from "@/components/chatbot/ChatbotPanel";

export default function Home() {
  const pageHeader: string = "Chat with AI-Timo";
  const chatDisclaimer: string = "This bot can tell you what Timo can do as software developer or tv-professional. You can also ask about him. (This is a chatbot and may produce incomplete or inaccurate responses.)";
  return (
    <>
      <div className="page-shell">
        <main className="page-frame">
          <OnMouseOver>
            <div className="grid w-full gap-10 sm:grid-cols-[minmax(240px,30%)_1fr]">
              <section className="">
                <Image
                  src="/timo_logo.png"
                  alt="Timo Lampinen - kuva Riitta Sourander"
                  width={200}
                  height={50}
                  priority
                />

                <div className="mt-4 flex flex-col gap-4 text-left sm:items-start sm:text-left">
                  <h1 className="max-w-sm">
                    Timo Lampinen - Junior Software Developer and TV
                    Professional
                  </h1>

                  <p className="max-w-sm text-secondary hover:animate-flash-once">
                    My portfolio in software development and directing/writing
                    tv productions. Currently looking for new opportunities in
                    software development, but I'm still interested in directing
                    and writing TV productions.
                  </p>
                </div>
              </section>

              <section>
                <div className="mb-6 flex w-full items-start justify-center sm:mt-0 sm:justify-start">
                  <ChatbotPanel chatHeader={pageHeader} chatDisclaimer={chatDisclaimer} />
                </div>

                <div className="flex w-full items-start justify-center sm:mt-0 sm:justify-start">
                  <ShowItLink />
                </div>

                <div className="mt-6 flex w-full justify-start">
                  <ShowTvLink />
                </div>

                <div className="section-gap items-center">
                  <span className="text-[16px] font-semibold tracking-[0.02em] text-[var(--text-primary)]">
                    Contact:
                  </span>

                  <p className="mt-2 items-center">
                    +358405363191 lampinen.timo@gmail.com
                    <Link
                      className="ml-3"
                      href="https://www.linkedin.com/in/timo-lampinen-4657b"
                      target="_blank"
                    >
                      linkedin
                    </Link>
                    <Link
                      className="ml-3"
                      href="https://www.instagram.com/timolampinen"
                      target="_blank"
                    >
                      instagram
                    </Link>
                  </p>
                </div>

                <div className="mt-6">
                  <p className="meta-text max-w-[44rem]">
                    <a
                      href="https://github.com/Hirvilampi/timo-portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      This page is coded in Visual Studio Code by yours truly.
                      Built with Next.js, Typescript and Tailwind CSS, deployed
                      with Vercel. It uses Supabase as database for productions
                      info and images. Click to see the code in GitHub.
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </OnMouseOver>
        </main>
      </div>
    </>
  );
}
