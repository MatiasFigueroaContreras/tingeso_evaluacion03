import styles from "./sectionnav.module.css"

export default function SectionNav({
    amount,
    onSectionClick,
}: {
    amount: number;
    onSectionClick: (section: number) => void;
}) {
    const renderSections = () => {
        let sections = [];
        for (let i = 1; i <= amount; i++) {
            sections.push(
                <span key={i} onClick={() => onSectionClick(i)}>
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
