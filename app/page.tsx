import Image from "next/image";
import Link from "next/link";
import ShowTvLink from "./tv/page";
import ShowItLink from "./it/page";
import OnMouseOver from "@/components/MouseOver";
import ChatbotPanel from "@/components/chatbot/ChatbotPanel";

export default function Home() {
  const pageHeader: string = "Chat with AI-Timo";
  const chatDisclaimer: string =
    "This bot can tell you what Timo can do as software developer or tv-professional. You can also ask about him. (This is a chatbot and may produce incomplete or inaccurate responses.)";
  return (
    <>
      <div className="page-shell">
        <main className="page-frame">
<hr className="my-6 w-7/8 border-t border-[var(--text-secondary)]" />
 
            <div className="grid w-full gap-6 ">
              <section className="flex items-center justify-between gap-6">
                <div className="flex flex-col justify-center">
                  <h1 className="text-[4.5rem] sm:text-[6.5rem] leading-none">TIMO LAMPINEN</h1>
                  <h2 className="mt-2 text-lg sm:text-2xl"> - Software Developer and TV Professional</h2>
<div className="flex flex-col gap-6 mt-2 text-left sm:items-start sm:text-left">
                <p className="text-secondary max-w-xs hover:animate-flash-once">
                  My portfolio in software development and directing/writing tv
                  productions. Currently looking for new opportunities in
                  software development, but I'm still interested in directing
                  and writing TV productions.
                </p>
              </div>
                </div>
                <Image
                  src="/timo_logo.png"
                  alt="Timo Lampinen - kuva Riitta Sourander"
                  width={200}
                  height={50}
                  priority
                  className="rounded-xl"
                />
              </section>
              
<hr className="my-6 w-7/8 border-t border-[var(--text-secondary)]" />
 
              <section>
                <div className="mt-6 mb-3 flex w-full items-start justify-center sm:mt-0 sm:justify-start">
                  <ChatbotPanel
                    chatHeader={pageHeader}
                    chatDisclaimer={chatDisclaimer}
                  />
                </div>

                <div className="mt-6 flex w-full items-start justify-center sm:mt-0 sm:justify-start">
                  <ShowItLink />
                </div>

                <div className="mt-6 flex w-full justify-start">
                  <ShowTvLink />
                </div>

<hr className="my-6 w-7/8 border-t border-[var(--text-secondary)]" />
                <div className="section-gap items-center">
                  <span className="text-secondary">Contact:</span>


                  <p className="items-center text-secondary">
                    +358405363191 lampinen.timo@gmail.com
                    <Link
                      // className={`${classes.thispage2} text-black dark:text-white`}
                      className="hover:text-orange-500"
                      href="https://www.linkedin.com/in/timo-lampinen-4657b"
                      target="_blank"
                    >
                      {" "}
                      <span className="hover:translate-x-2">linkedin</span>
                    </Link>
                    <Link
                      // className={`${classes.thispage2}  text-black dark:text-white`}
                      className="hover:text-orange-500"
                      href="https://www.instagram.com/timolampinen"
                      target="_blank"
                    >
                      {" "}
                      <span className="hover:translate-x-2">instagram</span>
                    </Link>
                  </p>
                </div>

                <div className="mt-6">
                  <p>
                    <span
                      className="
                      text-primary
                        text-sm sm:text-lg 
                        hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400
                        hover:bg-clip-text hover:text-transparent
                        transition-colors duration-150
                      "
                    >
                      <a
                        href="https://github.com/Hirvilampi/timo-portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        This page is coded in Visual Studio Code by yours truly.
                        Built with Next.js, Typescript and Tailwind CSS,
                        deployed with Vercel. It uses Supabase as database for
                        productions info and images. Click to see the code in
                        GitHub.
                      </a>
                    </span>
                  </p>
                </div>
              </section>
            </div>

        </main>
      </div>
    </>
  );
}
