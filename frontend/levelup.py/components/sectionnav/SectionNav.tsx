import styles from "./sectionnav.module.css"

export default function SectionNav({
    amount,
    onSectionClick,
    isFinished,
    boolResults
}: {
    amount: number;
    onSectionClick: (section: number) => void;
    isFinished: boolean;
    boolResults: boolean[];
}) {
    const renderSections = () => {
        let sections = [];
        for (let i = 1; i <= amount; i++) {
            sections.push(
                <span className={isFinished ? boolResults[i - 1] ? styles["correct"] : styles["wrong"] : ""} key={i} onClick={() => onSectionClick(i)}>
                    {i}
                </span>
            );
        }
        return sections;
    };

    return (
        <section className={styles["section-nav"]}>
            <h3>Navega por las preguntas</h3>
            <hr />
            <div className={styles.sections}>{renderSections()}</div>
        </section>
    );
}
