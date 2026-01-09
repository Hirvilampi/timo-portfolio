"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./image-slideshow.module.css";

import venlaImg from "@/public/assets/tv_images/square/Venla_NikiSoukkio_640.png";
import kakutImg from "@/public/assets/tv_images/square/Kakut_7634_640.png";
import mole1Img from "@/public/assets/tv_images/square/Mole_eps10_041_640.png";
import mole2Img from "@/public/assets/tv_images/square/Mole_eps9_027_640.png";
import mole3Img from "@/public/assets/tv_images/square/Mole_eps9_030_640.png";
import susaImg from "@/public/assets/tv_images/square/Susa2_1008_640.png";
import uae1Img from "@/public/assets/tv_images/square/UAE_640.png";
import uae2Img from "@/public/assets/tv_images/square/UAE_8094_640.png";

import bonakotaImg from "@/public/assets/it_images/square/Bonakota.png";
import ideaImg from "@/public/assets/it_images/square/Figma_idea.png";
import firebaseImg from "@/public/assets/it_images/square/Firebase.png";
import personaltrainer1Img from "@/public/assets/it_images/square/personaltrainer1.png";
import personaltrainer2Img from "@/public/assets/it_images/square/personaltrainer2.png";
import stufflogImg from "@/public/assets/it_images/square/Stufflog.png";

// const images = [
//   { image: venlaImg, alt: "I won Venla-award" },
//   { image: kakutImg, alt: "The Great Finnish Bake-Off" },
//   { image: mole1Img, alt: "The Mole" },
//   { image: susaImg, alt: "Who Do You Think You Are" },
//   { image: mole2Img, alt: "The Mole" },
//   { image: uae1Img, alt: "Dream Holiday House" },
//   { image: uae2Img, alt: "Dream Holiday House" },
//   { image: mole3Img, alt: "The Mole" },
// ];

const imagestv = [
  { image: venlaImg, alt: "I won Venla-award" },
  { image: kakutImg, alt: "The Great Finnish Bake-Off" },
  { image: mole1Img, alt: "The Mole" },
  { image: susaImg, alt: "Who Do You Think You Are" },
  { image: mole2Img, alt: "The Mole" },
  { image: uae1Img, alt: "Dream Holiday House" },
  { image: uae2Img, alt: "Dream Holiday House" },
  { image: mole3Img, alt: "The Mole" },
];

const imagesit = [
  { image: bonakotaImg, alt: "Bonakota" },
  { image: ideaImg, alt: "Idea created in Figma" },
  { image: firebaseImg, alt: "I have used Firebase" },
  { image: personaltrainer1Img, alt: "Personal trainer" },
  { image: personaltrainer2Img, alt: "Personal trainer" },
  { image: stufflogImg, alt: "Stufflog" },
];

export default function ImageSlideshow({ portfolio }: { portfolio: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = portfolio === "it" ? imagesit : imagestv;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          fill
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
