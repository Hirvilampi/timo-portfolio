import Link from "next/link";

import classes from "./page.module.css";

import ImageSlideshow from "@/components/images/image-slideshow";

export default function TvPage() {

  return (
    <>
      {/* toimiva */}
      <Link href="/tv/productions" className={classes.cardWrapper}>
        <div className={classes.yourBox}>
          <div className={classes.column}>
            <div className={classes.slideshowPlaceholder}>
              <ImageSlideshow portfolio={"tv"} />
            </div>
            {/* sisältö */}
            <div className="py-4 sm:py-0">
              <h2 className="text-sm sm:text-2xl font-bold uppercase">
                TELEVISION
              </h2>
              <p className="text-xs sm:text-xl">Over two decades of experience in TV and film production.
                Directing and writing popular TV shows in high-pressure environments.
              </p>
              <p className="mt-4 text-xs font-black underline decoration-2 underline-offset-4 sm:text-lg">
                VIEW PRODUCTIONS
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
