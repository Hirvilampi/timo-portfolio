import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import classes from "./page.module.css";
import ImageSlideshow from "@/components/images/image-slideshow";

type CardProps = ComponentPropsWithoutRef<"a">;

export default function ShowItLink({ className, ...props }: CardProps) {
  return (
    <>
      {/* toimiva */}
      <Link href="/it/projects" className={classes.cardWrapper}>
        <div className={classes.cardShape}>
          <div className={classes.row}>
            <div className={classes.slideshowPlaceholder}>
              <ImageSlideshow portfolio={"it"} />
            </div>
            <div className="py-4 sm:py-0">
              <h2 className={`${classes.title} text-[1.35rem] font-bold sm:text-[2rem]`}>
                Software Developer
              </h2>
              <p className={`${classes.subtitle} text-[1rem] sm:text-[1.125rem]`}>
                Frontend, Backend, Service Design
              </p>
              <p className={`${classes.cta} text-[0.95rem] font-semibold tracking-[0.04em] underline decoration-1 underline-offset-4`}>
                Click for projects
              </p>
            </div>
          </div>
        </div>

        {/* Reunus: piirtyy varmasti myös vinossa reunassa */}
        {/* <svg
          className={classes.cardBorder}
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            points="0,0 200,0 176,100 0,100"
            fill="none"
            stroke="black"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg> */}
      </Link>
    </>
  );
}
