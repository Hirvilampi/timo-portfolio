'use client'

import { useRouter } from "next/navigation"

import classes from "@/components/BackButton.module.css";

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else { router.push('/');}
    };

    return <button className={classes.link} onClick={handleBack}>← Back</button>
}