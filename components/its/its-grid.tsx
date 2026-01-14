import Link from "next/link";
import Image from "next/image";

import { ITProject } from "../ITProject";
import classes from "./its-grid.module.css"

type ITsGridProps = {
  itprojects: ITProject[];
};

export default function ITsGrid({ itprojects }: ITsGridProps) {
  return (
    <ul className="classes.ul">
      {itprojects.map((p) => (
        <li className={classes.link}  key={p.id}>
          <Link href={`/it/projects/${p.slug}`}>
            <article key={p.slug} className="rounded-xl border p-4 mt-2  text-black dark:text-zinc-50">
              <div className="flex flex-col sm:flex-row gap-4  text-black dark:text-zinc-50">
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
                  {p.technologies && (
                    <p className="text-sm opacity-70">{p.technologies}</p>
                  )}
                  {p.year && <p className="text-sm opacity-70">{p.year}</p>}
                  {p.summary && <p className="mt-2 text-sm">{p.summary}</p>}
                </div>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}
