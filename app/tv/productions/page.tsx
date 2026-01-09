import TVsGrid from "@/components/tvs/tvs-grid";
import { getTVProductions } from "@/lib/tvproductions";
import { TVProduction } from "@/components/TVProduction";

export default async function Productions() {
  const tvproductions = await getTVProductions();

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
          <h1 className="text-3xl">TV and Film productions</h1>
          <div className="mt-6">
            <TVsGrid tvproductions={tvproductions} />
          </div>
        </main>
      </div>
    </>
  );
}
