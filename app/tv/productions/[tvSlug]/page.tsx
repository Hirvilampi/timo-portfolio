import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import { getTVProduction } from "@/lib/tvpproduction";
import BackButton from "@/components/BackButton";
import OnMouseOver from "@/components/MouseOver";

function toAbsoluteUrl(url?: string | null) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return `https://${u}`;
}

async function ShowProductionPage({ slug }: { slug: string }) {
  const prod = await getTVProduction(slug);
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
            {prod.seasons && prod.seasons} ({prod.year && prod.year})
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
              Link to video or production page
            </a>
          </div>
        )}
        <p className="mt-4">Production Company:&nbsp;{prod.company}</p>
      </section>
    </>
  );
}

export default async function AllProductionsPage({
  params,
}: {
  params: Promise<{ tvSlug: string }>;
}) {
  const { tvSlug } = await params;

  return (
    <div className="page-shell">
      <main className="page-frame page-stack max-w-4xl">
        <OnMouseOver>
          <BackButton />
          <h1 className="mb-2">Production from my work history</h1>
          <Suspense fallback={<p className={classes.loading}>Loading..</p>}>
            <ShowProductionPage slug={tvSlug} />
          </Suspense>
        </OnMouseOver>
      </main>
    </div>
  );
}
