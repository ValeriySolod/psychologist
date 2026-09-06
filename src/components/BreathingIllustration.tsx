"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { breathingSteps, getBreathingStep, STEP_DURATION_MS } from "@/lib/practices";
import styles from "@/styles/page.module.scss";

export default function BreathingIllustration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const id = setInterval(() => setStep(getBreathingStep(performance.now() - startedAt)), STEP_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.breathingFrame}>
      {breathingSteps.map((item, index) => (
        <Image
          key={item.alt}
          className={styles.breathing}
          src={item.src}
          alt={index === step ? item.alt : ""}
          aria-hidden={index !== step}
          style={{ opacity: index === step ? 1 : 0 }}
          fill
          sizes="155px"
          loading="eager"
        />
      ))}
    </div>
  );
}
