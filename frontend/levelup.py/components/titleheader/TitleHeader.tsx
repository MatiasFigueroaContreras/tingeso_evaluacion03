import styles from "./titleheader.module.css";

export default function TitleHeader({
    title,
    subTitle,
}: {
    title: string;
    subTitle: string;
}) {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <h3 className={styles.subtitle}>{subTitle}</h3>
            <hr />
        </div>
    );
}
