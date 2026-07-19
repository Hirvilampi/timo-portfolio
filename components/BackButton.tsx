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

    return <button className="mr-auto font-bold text-[var(--text-secondary)] transition-colors hover:text-[var(--color-gold)]" 
    onClick={handleBack}>← Back</button>
}