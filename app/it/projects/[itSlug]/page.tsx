import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { Suspense } from "react";

import classes from "./page.module.css";
import { getITProject } from "@/lib/itproject";

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
      {prod.image && (
        <Image
          src={prod.image}
          alt={prod.slug}
          width={1280}
          height={800}
          className="rounded-md object cover"
        />
      )}
      <div className="flex flex-row justify-items-strech content-center">
        <h1 className="text-3xl gap-6">{prod.title}</h1>
        <p className="text-base opacity-70 px-8 py-2">
          ({prod.year && prod.year})
        </p>
      </div>

      <div className="flex flex-row items-center mt-4">
        <h2 className="text-2xl">My Job:&nbsp; {prod.job}</h2>
      </div>

      <p className="mt-4"> {prod.summary}</p>
      <p className="mt-4">{prod.more}</p>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${classes.link} mt-4`}
        >
          Link to project/company
        </a>
      )}

      {prod.gitlink && (
        <a
          href={prod.gitlink}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Link to github
        </a>
      )}
      <p className="mt-4">Company:&nbsp;{prod.company}</p>
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
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
        <h1 className="mb-2">IT Project from my work history</h1>
        <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
          <ShowProjectInfo itSlug={itSlug} />
        </Suspense>
      </main>
    </div>
  );
}
