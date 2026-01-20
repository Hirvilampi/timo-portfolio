import Link from "next/link";
import Image from "next/image";

import { TVProduction } from "@/components/TVProduction";
import classes from "./tvs-grid.module.css";
import OnMouseOver from "../MouseOver";

type TVsGridProps = {
  tvproductions: TVProduction[];
};

export default function TVsGrid({ tvproductions }: TVsGridProps) {
  return (
    <OnMouseOver>
    <ul className="classes.ul" >
      {tvproductions.map((p) => (
        <li  className={classes.link}  key={p.id}>
          <Link 
            href={{
              pathname: `/tv/productions/${p.slug}`
            }}
          >
            <article key={p.slug} className="rounded-xl border p-4 mt-2 flex flex-col text-black dark:text-zinc-50 hover:bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-4 s">
                {p.image_small && (
                  <Image
                    src={p.image_small}
                    alt={p.slug}
                    width={240}
                    height={180}
                    className="rounded-md object cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <div className="flex flex-col sm:flex-row">
                    <p className="text-sm opacity-70 gap-2 flex flex-row">
                      {p.seasons && p.seasons} ({p.year && p.year})
                    </p>
                  </div>

                  <p>{p.job}</p>
                  {p.summary && <p className="mt-2 text-sm">{p.summary}</p>}
                </div>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
    </OnMouseOver>
  );
}
