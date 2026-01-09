import type { ComponentPropsWithoutRef } from "react";
import classes from "./page.module.css";
import ImageSlideshow from "@/components/images/image-slideshow";

type CardProps = ComponentPropsWithoutRef<"a">;

export default function ShowItLink({ className, ...props }: CardProps) {
  return (
    <>
      {/* toimiva */}
      <a href="/it" className={classes.cardWrapper}>
        <div className={classes.cardShape}>
          <div className={classes.row}>
            <div className={classes.slideshowPlaceholder}>
              <ImageSlideshow portfolio={"it"} />
            </div>
          <div>
            <h2 className="text-m sm:text-2xl  font-bold uppercase">Software Developer</h2>
            <p className="text-sm sm:text-xl">Coding, Frontend, Service Design, Backend</p>
            <p className="text-sm sm:text-l mt-4 font-black underline decoration-2 underline-offset-4">
              CLICK FOR PROJECTS
            </p>
          </div>
        </div>

        {/* Reunus: piirtyy varmasti myös vinossa reunassa */}
        <svg
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
        </svg>
        </div>
      </a>
    </>
  );
}
