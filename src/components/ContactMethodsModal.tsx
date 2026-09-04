"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/ContactMethodsModal.module.scss";

const ARROW_ICON = "/images/icons/contact/arrow.svg";

const CHANNELS: { key: string; label: string; icon: string; href: string | null }[] = [
  { key: "viber", label: "Viber", icon: "/images/icons/contact/viber.svg", href: null },
  { key: "whatsapp", label: "WhatsApp", icon: "/images/icons/contact/whatsapp.svg", href: null },
  { key: "gmail", label: "Gmail", icon: "/images/icons/contact/gmail.svg", href: null },
  { key: "instagram", label: "Instagram", icon: "/images/icons/contact/instagram.svg", href: null },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function ChannelRowContent({ icon, label }: { icon: string; label: string }) {
  return (
    <>
      <span className={styles.channelIconWrap}>
        <img src={icon} alt="" aria-hidden="true" width={22} height={22} />
      </span>
      <span className={styles.channelLabel}>{label}</span>
      <img className={styles.channelArrow} src={ARROW_ICON} alt="" aria-hidden="true" width={16} height={16} />
    </>
  );
}

function ContactMethodsDialog({ onClose, headingId }: { onClose: () => void; headingId: string }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    dialogRef.current?.querySelector<HTMLButtonElement>("[data-close-button]")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={headingId}>
        <button type="button" className={styles.close} aria-label="Закрити" data-close-button onClick={onClose}>
          <span aria-hidden="true">✕</span>
        </button>
        <div className={styles.iconCircle} aria-hidden="true">
          <span>✉</span>
        </div>
        <h2 id={headingId} className={styles.heading}>
          Інші способи зв&apos;язку
        </h2>
        <p className={styles.subtitle}>Оберіть зручний для вас канал</p>
        <ul className={styles.channelList}>
          {CHANNELS.map((channel) =>
            channel.href ? (
              <li key={channel.key}>
                <a className={styles.channelRow} href={channel.href} target="_blank" rel="noreferrer">
                  <ChannelRowContent icon={channel.icon} label={channel.label} />
                </a>
              </li>
            ) : (
              <li key={channel.key}>
                <span className={styles.channelRow} aria-disabled="true">
                  <ChannelRowContent icon={channel.icon} label={channel.label} />
                </span>
              </li>
            )
          )}
        </ul>
        <p className={styles.footnote}>Усі звернення залишаються конфіденційними</p>
      </div>
    </div>,
    document.body
  );
}

export default function ContactMethodsButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className={`${className ?? ""} ${styles.triggerReset}`}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>
      {isOpen && <ContactMethodsDialog onClose={close} headingId={headingId} />}
    </>
  );
}
