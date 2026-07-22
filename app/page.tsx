import Image from "next/image";
import Link from "next/link";
import TvPage from "./tv/page";
import ItPage from "./it/page";
import ChatbotPanel from "@/components/chatbot/ChatbotPanel";

export default function Home() {
  const pageHeader: string = "Ask Timo's AI";
  const chatDisclaimer: string =
    "Ask about my software projects, TV productions or experience.";
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
              <Link href="#contact" className="font-bold">
                <span className="menu-font text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]">
                  CONTACT
                </span>
              </Link>
            </div>
          </div>

          <div className="grid w-full gap-6 ">
            <section className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-6 sm:gap-x-6">
              <h1 className="col-span-2 text-[4.5rem] leading-none color-gold sm:col-span-1 sm:text-[6.5rem]">
                TIMO <br />
                LAMPINEN
              </h1>

              <div className="flex min-w-0 flex-col justify-center sm:col-start-1">
                <div className="flex flex-1 items-center gap-4 mt-1">
                  <hr className="w-[6.5%] border-t border-[var(--color-gold)]" />
                  <h3 className="font-bold italic text-secondary">
                    Software Developer / Television Professional
                  </h3>
                </div>
                <div className="flex flex-col gap-6 mt-6 text-left sm:items-start sm:text-left">
                  <p className="text-secondary max-w-xs hover:animate-flash-once">
                    Award-winning TV director, writer and software developer — 
                    combining storytelling, leadership and technology to build experiences people care about.

                  </p>
                </div>
              </div>
              <Image
                src="/timo_logo.png"
                alt="Timo Lampinen - kuva Riitta Sourander"
                width={200}
                height={50}
                priority
                className="col-start-2 row-start-2 h-auto w-32 rounded-xl border border-[var(--text-secondary)] sm:row-span-2 sm:row-start-1 sm:w-[200px]"
              />
            </section>

            <hr className="my-6  w-7/8 border-t border-[var(--text-secondary)]" />

            <section className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-between">
              <div className="flex w-full flex-1 justify-start">
                <ChatbotPanel chatHeader={pageHeader} chatDisclaimer={chatDisclaimer}/>
              </div>

              <div className="flex w-full flex-1 justify-start">
                <ItPage />
              </div>

              <div className="flex w-full flex-1 justify-start">
                <TvPage />
              </div>
            </section>

            <hr className="my-6  w-7/8 border-t border-[var(--text-secondary)]" />

            <div id="contact" className="items-center scroll-mt-6">
              <p className="items-start menu-font text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold)]">
                CONTACT
              </p>

              <p className="items-start text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]">
                tel: +358405363191
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
                  rel="noopener noreferrer"
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
                rel="noopener noreferrer"
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
                    Built with Next.js, TypeScript and Tailwind CSS, deployed
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
