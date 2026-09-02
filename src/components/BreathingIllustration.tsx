"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/page.module.scss";

const STEP_DURATION_MS = 4000;

const breathingSteps = [
  { src: "/images/photos/Inhale2x.png", alt: "Вдих — вправа дихання за квадратом" },
  { src: "/images/photos/HoldingBreath2x.png", alt: "Затримка дихання — вправа дихання за квадратом" },
  { src: "/images/photos/Exhale2x.png", alt: "Видих — вправа дихання за квадратом" },
];

export default function BreathingIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((current) => (current + 1) % breathingSteps.length);
    }, STEP_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const current = breathingSteps[step];

  return (
    <div className={styles.breathingFrame}>
      <Image
        key={current.src}
        className={styles.breathing}
        src={current.src}
        alt={current.alt}
        fill
        sizes="155px"
      />
    </div>
  );
}
