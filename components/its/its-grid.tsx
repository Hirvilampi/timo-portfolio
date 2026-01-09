import Link from "next/link";
import Image from "next/image";

import { ITProject } from "../ITProject";

type ITsGridProps = {
  itprojects: ITProject[];
};

export default function ITsGrid({ itprojects }: ITsGridProps) {
  return (
    <ul>
      {itprojects.map((p) => (
        <li key={p.id}>
          <Link href={`/projects/${p.slug}`}>
            <article key={p.slug} className="rounded-xl border p-4 mt-2">
              <div className="flex flex-column sm:flex-row gap-4 ">
                {p.image && (
                  <Image
                    src={p.image}
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
