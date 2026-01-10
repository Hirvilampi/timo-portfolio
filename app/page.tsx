import Image from "next/image";

import classes from "./page.module.css";
import ShowTvLink from "./tv/page";
import ShowItLink from "./it/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center py-24 px-16 bg-white dark:bg-black sm:items-start ">
        <Image
          src="/timo_logo.png"
          alt="Timo Lampinen - kuva Riitta Sourander"
          width={200}
          height={50}
          priority
        />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-xl sm:text-2xl md:text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Timo Lampinen - Junior Software Developer and TV Professional
          </h1>
          <p className="max-w-md text-base sm:text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            My portfolio in software development and
            directing/writing tv productions. Currently looking for new
            opportunities in software development, but I'm still interested in
            directing and writing TV productions.
          </p>
        </div>

        <div className="w-full flex items-start justify-center mt-6 sm:justify-start ">
          <ShowTvLink />
        </div>

        <div className="w-full flex justify-start mt-6">
          <ShowItLink />
        </div>
      </main>
    </div>
  );
}
