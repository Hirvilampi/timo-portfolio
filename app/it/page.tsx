import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import classes from "./page.module.css";
import ImageSlideshow from "@/components/images/image-slideshow";

type CardProps = ComponentPropsWithoutRef<"a">;

export default function ItPage({ className, ...props }: CardProps) {
  return (
    <>
      {/* toimiva */}
      <Link href="/it/projects" className={classes.cardWrapper}>
        <div className={classes.yourBox}>
          <div className={classes.column}>
            <div className={classes.slideshowPlaceholder}>
              <ImageSlideshow portfolio={"it"} />
            </div>
            <div className="py-4 sm:py-0">
              <h2 className="text-sm sm:text-2xl  font-bold uppercase">
                SOFTWARE
              </h2>
              <p className="text-xs sm:text-xl">
                Architecting digital systems with the same precision required for live broadcast. 
                Full-stack engineering with a focus on modern frameworks, performance, and craft. 

              </p>
              <p className="mt-4 text-xs font-black underline decoration-2 underline-offset-4 sm:text-lg">
                VIEW PROJECTS
              </p>
            </div>
          </div>
        </div>

      </Link>
    </>
  );
}
