"use client";

import { useCallback, useEffect, useId, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { createPracticeState, practiceReducer } from "@/lib/practices";
import pageStyles from "@/styles/page.module.scss";
import modalStyles from "@/styles/ContactMethodsModal.module.scss";
import styles from "@/styles/PracticeChecklist.module.scss";

function CompletionDialog({ title, rating, onRate, onClose }: {
  title: string;
  rating: number;
  onRate: (value: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const descriptionId = useId();
  const ratingName = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={modalStyles.dialog + " " + styles.dialog}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const first = event.currentTarget.querySelector<HTMLButtonElement>("button");
        const last = event.currentTarget.querySelector<HTMLInputElement>("input:checked") ?? event.currentTarget.querySelector<HTMLInputElement>("input");
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <button type="button" className={modalStyles.close} aria-label="Закрити" onClick={onClose} autoFocus><span aria-hidden="true">✕</span></button>
      <div className={styles.success} aria-hidden="true"><Image src="/images/icons/practices/success.svg" alt="" width={78} height={78} /></div>
      <div className={styles.description}>
        <h2 id={headingId}>Практику виконано!</h2>
        <p id={descriptionId}>{title}</p>
      </div>
      <fieldset className={styles.rating}>
        <legend>Оцініть свій стан зараз</legend>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label className={styles.star} key={value}>
              <input type="radio" name={ratingName} value={value} checked={rating === value} onChange={() => onRate(value)} aria-label={value + " з 5"} />
              <Image src={value <= rating ? "/images/icons/practices/star-filled.svg" : "/images/icons/practices/star.svg"} alt="" width={36} height={36} />
            </label>
          ))}
        </div>
      </fieldset>
    </dialog>,
    document.body
  );
}

export default function PracticeChecklist({ title, items }: { title: string; items: string[] }) {
  const [state, dispatch] = useReducer(practiceReducer, items.length, createPracticeState);
  const triggerRef = useRef<HTMLInputElement | null>(null);
  const close = useCallback(() => {
    dispatch({ type: "close" });
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);

  return (
    <>
      <ul className={pageStyles.checkList + " " + styles.checkList} aria-label={title}>
        {items.map((item, index) => (
          <li key={item}>
            <label>
              <input type="checkbox" checked={state.checked[index]} onChange={(event) => {
                triggerRef.current = event.currentTarget;
                dispatch({ type: "check", index, checked: event.currentTarget.checked });
              }} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      {state.isOpen && <CompletionDialog title={title} rating={state.rating} onRate={(value) => dispatch({ type: "rate", value })} onClose={close} />}
    </>
  );
}
