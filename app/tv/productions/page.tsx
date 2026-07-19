import TVsGrid from "@/components/tvs/tvs-grid";
import { getTVProductions } from "@/lib/tvproductions";
import BackButton from "@/components/BackButton";
import OnMouseOver from "@/components/MouseOver";

export const dynamic = "force-dynamic";

export default async function Productions() {
  const tvproductions = await getTVProductions();

  return (
      <div className="page-shell">
        <main className="page-frame page-stack max-w-4xl">
          <OnMouseOver>
            <BackButton />
            <h1>TV and Film productions</h1>
            <p className="mt-4">
              I graduated Bachelor of Media (UAS) in 2003 and I have worked in
              tv, films and media since then. I started as an editor, but also
              pursued my goal to be a director quite early making my first
              documentary in 2006. My work experience includes directing,
              writing, editing, filming, location scout, producing, marketing
              feature film and then some. I have been co-owner in several media
              companies. Some succeeded some did not.
            </p>
            <div className="mt-6">
              <TVsGrid tvproductions={tvproductions} />
            </div>
          </OnMouseOver>
        </main>
      </div>
  );
}
