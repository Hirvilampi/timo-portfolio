import Image from "next/image";
import Link from "next/link";
import TvPage from "./tv/page";
import ItPage from "./it/page";
import OnMouseOver from "@/components/MouseOver";
import ChatbotPanel from "@/components/chatbot/ChatbotPanel";

export default function Home() {
  const pageHeader: string = "Ask Timo's AI";
  const chatDisclaimer: string =
    "This bot can tell you what Timo can do as software developer or tv-professional. You can also ask about him. (This is a chatbot and may produce incomplete or inaccurate responses.)";
  return (
    <>
      <div className="page-shell">
        <main className="page-frame">
          <div className="flex items-center mb-9 justify-between gap-4 color-gold">
            <div className="flex flex-1 items-center gap-4">
              <hr className="w-[6.5%] border-t border-[var(--color-gold)]" />
              <span className="font-bold italic">TL PORTFOLIO</span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <Link href="/it/projects" className="font-bold">
                <span className="menu-font text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]">
                  SOFTWARE
                </span>
              </Link>
              <Link href="/tv/productions" className="font-bold">
                <span className="menu-font text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]">
                  TELEVISION
                </span>
              </Link>
              <Link href="/chatbot" className="font-bold">
                <span className="menu-font text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]">
                  ASK AI
                </span>
              </Link>
              <Link href="" className="font-bold">
                <span className="menu-font text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]">
                  CONTACT
                </span>
              </Link>
            </div>
          </div>

          <div className="grid w-full gap-6 ">
            <section className="flex items-center justify-between gap-6">
              <div className="flex flex-col justify-center">
                <h1 className="text-[4.5rem] sm:text-[6.5rem] leading-none color-gold">
                  TIMO <br />
                  LAMPINEN
                </h1>
                <div className="flex flex-1 items-center gap-4 mt-1">
                  <hr className="w-[6.5%] border-t border-[var(--color-gold)]" />
                  <h3 className="font-bold italic text-secondary">
                    Software Developer / Television Professional
                  </h3>
                </div>
                <div className="flex flex-col gap-6 mt-6 text-left sm:items-start sm:text-left">
                  <p className="text-secondary max-w-xs hover:animate-flash-once">
                    Portfolio in software development and directing/writing tv
                    productions.
                    <br /> <br />
                    Currently looking for new opportunities in software
                    development, but I'm still interested in directing and
                    writing TV productions.
                  </p>
                </div>
              </div>
              <Image
                src="/timo_logo.png"
                alt="Timo Lampinen - kuva Riitta Sourander"
                width={200}
                height={50}
                priority
                className="border-1 rounded-xl border-[var(--text-secondary)]"
              />
            </section>

            <hr className="my-6  w-7/8 border-t border-[var(--text-secondary)]" />

            <section className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex w-full  flex-1 justify-start sm:flex-1 sm:justify-start">
                <ChatbotPanel chatHeader={pageHeader} />
              </div>

              <div className="flex  w-full flex-1 justify-center sm:flex-1 sm:justify-start">
                <ItPage />
              </div>

              <div className="flex w-full  flex-1 justify-end sm:flex-1 sm:justify-start">
                <TvPage />
              </div>
            </section>

            <hr className="my-6  w-7/8 border-t border-[var(--text-secondary)]" />

            <div className="section-gap items-center">
              <p className="items-start menu-font text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold)]">
                CONNECT
              </p>

              <p className="items-start text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]">
                +358405363191
              </p>

              <p >
                <a
                  href="mailto:lampinen.timo@gmail.com"
                  className="text-secondary transition-colors hover:text-[var(--color-gold)]"
                >
                  Email
                </a>
              </p>

              <p>
                <Link
                  // className={`${classes.thispage2} text-black dark:text-white`}
                  className="items-start text-secondary transition-colors hover:text-[var(--color-gold)]"
                  href="https://www.linkedin.com/in/timo-lampinen-4657b"
                  target="_blank"
                >
                  {" "}
                  <span className="hover:text-[var(--color-gold)]">
                    LinkedIn
                  </span>
                </Link>
              </p>

              <Link
                // className={`${classes.thispage2}  text-black dark:text-white`}
                className="items-start text-secondary transition-colors hover:text-[var(--color-gold)]"
                href="https://www.instagram.com/timolampinen"
                target="_blank"
              >
                {" "}
                <span className="hover:text-[var(--color-gold)]">Instagram</span>
              </Link>
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
                    Built with Next.js, Typescript and Tailwind CSS, deployed
                    with Vercel. It uses Supabase as database for productions
                    info and images. Click to see the code in GitHub.
                  </a>
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center mt-9 justify-between gap-4 text-secondary">
            <div className="flex flex-1 items-center gap-4">
              <hr className="w-[6.5%] border-t border-[var(--color-gold)]" />
              <span className="font-bold italic">© TIMO LAMPINEN</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
