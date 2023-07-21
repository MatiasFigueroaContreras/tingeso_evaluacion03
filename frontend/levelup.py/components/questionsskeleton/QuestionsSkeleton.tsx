import styles from "./questionsskeleton.module.css"

export default function QuestionsSkeleton({amount}: {amount: number}) {
  const renderQuestions = () => {
    const questions = []
    for(let q = 0; q < amount; q++) {
        questions.push(
            <section key={q} className={styles.question}>
                <div className={styles.top}>
                    <h3></h3>
                </div>
                <p></p>
                <div className={styles.code}></div>
                <div className={styles.answer}></div>
            </section>
        )
    }
    return questions;
  }
  return <div className={styles.questions}>{renderQuestions()}</div>;
}
