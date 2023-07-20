import styles from "./gradefeedback.module.css"

export default function GradeFeedback({grade} : {grade: number}) {
  return (
      <section className={styles["grade-feedback"]}>
          <h3>Calificación final</h3>
          <hr />
          <span>{grade.toFixed(1)}</span>
      </section>
  );
}
