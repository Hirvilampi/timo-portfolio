import classes from "./page.module.css";

export default function ShowTvLink() {
  return (
    <>
      {/* toimiva */}
      <a href="/tv" className={classes.cardWrapper}>
        <div className={classes.cardShape}>
          <div className={classes.slideshowPlaceholder} />
          {/* sisältö */}
          <div>
            <h2 className="text-2xl font-bold uppercase">Television & Film</h2>
            <p className="text-xl">Director, writer, editor</p>
            <p className="mt-4 font-black underline decoration-2 underline-offset-4">
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
      </a>
    </>
  );
}
