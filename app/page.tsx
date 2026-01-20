import Image from "next/image";
import Link from "next/link";
import classes from "./page.module.css";
import ShowTvLink from "./tv/page";
import ShowItLink from "./it/page";
import OnMouseOver from "@/components/MouseOver";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center py-24 px-16 bg-[rgb(252,252,252)] dark:bg-black sm:items-start ">
        <OnMouseOver>
          <Image
            src="/timo_logo.png"
            alt="Timo Lampinen - kuva Riitta Sourander"
            width={200}
            height={50}
            priority
          />

          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-xl sm:text-2xl md:text-3xl font-semibold mt-2 leading-10 tracking-tight text-black dark:text-zinc-50">
              Timo Lampinen - Junior Software Developer and TV Professional
            </h1>
            <p className="max-w-md text-base sm:text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              My portfolio in software development and directing/writing tv
              productions. Currently looking for new opportunities in software
              development, but I'm still interested in directing and writing TV
              productions.
            </p>
          </div>

          <div className="w-full flex items-start justify-center mt-6 sm:justify-start ">
            <ShowTvLink />
          </div>

          <div className="w-full flex justify-start mt-6">
            <ShowItLink />
          </div>
          <section>
            <div className="mt-6 items-center">
              <span className="text-black dark:text-zinc-50">Contact:</span>

              <p className="items-center text-black dark:text-zinc-50">
                +358405363191 lampinen.timo@gmail.com
                <Link
                  // className={`${classes.thispage2} text-black dark:text-white`}
                  className="text-black hover:text-orange-500 dark:text-zinc-50"
                  href="https://www.linkedin.com/in/timo-lampinen-4657b"
                  target="_blank"
                >
                  {" "}
                  <span className="hover:translate-x-2">linkedin</span>
                </Link>
                <Link
                  // className={`${classes.thispage2}  text-black dark:text-white`}
                  className="text-black hover:text-orange-500 dark:text-zinc-50"
                  href="https://www.instagram.com/timolampinen"
                  target="_blank"
                >
                  {" "}
                  <span className="hover:translate-x-2">instagram</span>
                </Link>
              </p>
            </div>
          </section>

          <div className="mt-6 ">
            {/* <p className={`${classes.thispage} "text-sm sm:text-lg"`}> */}
            {/* <p className="text-sm sm:text-lg font-bold text-gray-300 hover:text-gradient-to-r from-orange-500 to-orange-400 transition-all duration-400"> */}
            <p className="">
              <span
                className="
                  text-sm sm:text-lg font-bold
                  text-gray-300
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
                  This page is coded in Visual Studio Code by yours truly. Built
                  with Next.js, Typescript and Tailwind CSS, deployed with
                  Vercel. It uses Supabase as database for productions info and
                  images. Click to see the code in GitHub.
                </a>
              </span>
            </p>
          </div>
        </OnMouseOver>
      </main>
    </div>
  );
}
