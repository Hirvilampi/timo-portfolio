import TVsGrid from "@/components/tvs/tvs-grid";
import { getTVProductions } from "@/lib/tvproductions";
import BackButton from "@/components/BackButton";

export default async function Productions() {
  const tvproductions = await getTVProductions();

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">

        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
          <BackButton />
          <h1 className="text-3xl  text-black dark:text-zinc-50">TV and Film productions</h1>
          <p className="mt-4 text-sm sm:text-base  text-black dark:text-zinc-50"> 
            I graduated Bachelor of Media (UAS) in 2003 and I have worked in tv, films and media since then. 
            I started as an editor, but also pursued my goal to be a director quite early making my first documentary in 2006.
            My work experience includes directing, writing, editing, filming, location scout, producing, marketing feature film and then some. 
            I have been co-owner in several media companies. Some succeeded some did not.
          </p>
          <div className="mt-6">
            <TVsGrid tvproductions={tvproductions} />
          </div>
        </main>
      </div>
    </>
  );
}
