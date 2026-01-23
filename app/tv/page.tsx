import Link from "next/link";

import classes from "./page.module.css";

import ImageSlideshow from "@/components/images/image-slideshow";

export default function ShowTvLink() {

  return (
    <>
      {/* toimiva */}
      <Link href="/tv/productions" className={classes.cardWrapper}>
        <div className={classes.cardShape}>
          <div className={classes.row}>
            <div className={classes.slideshowPlaceholder}>
              <ImageSlideshow portfolio={"tv"} />
            </div>
            {/* sisältö */}
            <div className="py-4 sm:py-0">
              <h2 className="text-sm sm:text-2xl font-bold uppercase">
                Television & Film
              </h2>
              <p className="text-xs sm:text-xl">Director, writer, editor</p>
              <p className="text-xs sm:text-l mt-4 font-black underline decoration-2 underline-offset-4">
                CLICK FOR PROJECTS
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
