import Image from "next/image";

import classes from "./page.module.css";
import { getTVProduction } from "@/lib/tvpproduction";

function toAbsoluteUrl(url?: string | null) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return `https://${u}`;
}

export default async function AllProductionsPage({
  params,}: {  params: Promise<{ tvSlug: string }>;}) {
  const { tvSlug } = await params;
  const prod = await getTVProduction(tvSlug);
  const href = toAbsoluteUrl(prod.link);

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center py-12 px-16 bg-white dark:bg-black sm:items-start ">
        <h1 className="mb-2">Production from my work history</h1>
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
            {prod.seasons && prod.seasons} ({prod.year && prod.year})
          </p>
        </div>
   
        <div className="flex flex-row items-center mt-4">
           <h2 className="text-2xl">My Job:&nbsp; {prod.job}</h2>
        </div>

        <p className="mt-4"> {prod.summary}</p>

        <p className="mt-4">{prod.more}</p>

                {href && (
          <a href={href} target="_blank" rel="noopener noreferrer"
          className={`${classes.link} mt-4`}
          >
            Link to video or production page
          </a>
        )}

        <p className="mt-4">Production Company:&nbsp;{prod.company}</p>
      </main>
    </div>
  );
}
