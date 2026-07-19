import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import classes from "./page.module.css";
import { getITProject } from "@/lib/itproject";
import BackButton from "@/components/BackButton";
import OnMouseOver from "@/components/MouseOver";



function toAbsoluteUrl(url?: string | null) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return `https://${u}`;
}

async function ShowProjectInfo({ itSlug }: { itSlug: string }) {
  const prod = await getITProject(itSlug);
  const href = toAbsoluteUrl(prod.link);

  if (!prod) {
    notFound();
  }

  return (
    <>
      <section>
        {prod.image && (
          <Image
            src={prod.image}
            alt={prod.slug}
            width={1280}
            height={800}
            className="rounded-md object cover"
          />
        )}
        <div className="flex flex-row content-center justify-items-strech">
          <h1 className="gap-6">{prod.title}</h1>
          <p className="px-8 py-2 text-base opacity-70">
            ({prod.year && prod.year})
          </p>
        </div>

        <div className="mt-4 flex flex-row items-center">
          <h2>My Job:&nbsp; {prod.job}</h2>
        </div>

        <p className="mt-4"> {prod.summary}</p>
        <p className="mt-4">{prod.more}</p>
        {href && (
          <div className="hover:translate-x-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${classes.link} mt-4`}
            >
              Link to project/company
            </a>
          </div>
        )}

        {prod.gitlink && (
          <div className="hover:translate-x-2">
            <a
              href={prod.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              Link to github
            </a>
          </div>
        )}
        <p className="mt-4">Company:&nbsp;{prod.company}</p>
      </section>
    </>
  );
}

export default async function AllProjectsPage({
  params,
}: {
  params: Promise<{ itSlug: string }>;
}) {
  const { itSlug } = await params;
  const prod = await getITProject(itSlug);
  const href = toAbsoluteUrl(prod.link);

  return (
    <div className="page-shell">
      <main className="page-frame page-stack max-w-4xl">
        <OnMouseOver>
          <BackButton />
          <h1 className="mb-2">IT Project from my work history</h1>
          <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
            <ShowProjectInfo itSlug={itSlug} />
          </Suspense>
        </OnMouseOver>
      </main>
    </div>
  );
}
