import TVsGrid from "@/components/tvs/tvs-grid";
import { getTVProductions } from "@/lib/tvproductions";
import BackButton from "@/components/BackButton";
import classes from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Productions() {
  const tvproductions = await getTVProductions();

  return (
      <div className="page-shell">
        <main className="page-frame page-stack max-w-4xl">

            <BackButton />
            <h1  className="color-gold">TV and Film productions</h1>
            <p className="mt-4">
              I graduated Bachelor of Media (UAS) in 2003 and I have worked in
              tv, films and media since then. I started as an editor, but also
              pursued my goal to be a director quite early making my first
              documentary in 2006. My work experience includes directing,
              writing, editing, filming, location scout, producing, marketing
              feature film and then some. I have been co-owner in several media
              companies, gaining valuable experience from both their successes
              and their challenges.
            </p>
            <div className="mt-6">
              <TVsGrid tvproductions={tvproductions} />
            </div>
              <div
                className={`${classes.cardWrapper} mt-8 items-center`}
              >
                <section className="surface-text hover:translate-x-2">
                    <p className="text-secondary items-start">
                      There are more projects I have been part of, but these are the ones that are currently most relevant.
                    </p>
                </section>
              </div>
        </main>
      </div>
  );
}
