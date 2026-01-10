import Link from "next/link";
import Image from "next/image";

import { TVProduction } from "@/components/TVProduction";

// export type TVProduction = {
//   id: number;
//   slug: string;
//   title: string;
//   seasons?: string | null;
//   year?: string | null;
//   image?: string | null;
//   job?: string | null;
//   summary?: string | null;
//   more?: string | null;
//   company?: string | null;
// };

type TVsGridProps = {
  tvproductions: TVProduction[];
};

export default function TVsGrid({ tvproductions }: TVsGridProps) {
  return (
    <ul>
      {tvproductions.map((p) => (
        <li key={p.id}>
          <Link
            href={{
              pathname: `/tv/productions/${p.slug}`
            }}
          >
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
                  <div className="flex flex-row">
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
  );
}
