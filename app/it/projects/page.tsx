import ITsGrid from "@/components/its/its-grid";
import { getITProjects } from "@/lib/itprojects";
import { ITProject } from "@/components/ITProject";

export default async function Productions() {
  const itprojects = await getITProjects();

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
          <h1 className="text-3xl">IT projects and school work</h1>
          <div className="mt-6">
            <ITsGrid itprojects={itprojects} />
          </div>
        </main>
      </div>
    </>
  );
}
