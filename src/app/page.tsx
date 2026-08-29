import styles from "@/styles/page.module.scss";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <p className={styles.eyebrow}>Initial project foundation</p>
        <h1>Psychologist</h1>
        <p>
          This is the starting point for the application structure and styling foundation.
        </p>
      </section>
    </main>
  );
}
