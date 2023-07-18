import styles from "./feedbackalert.module.css"

export const FeedbackTypes = {
    Informative: "informative",
    Error: "error",
    Success: "success",
};

export default function FeedbackAlert({
    feedback,
    type,
}: {
    feedback: string;
    type: string;
}) {
    return <div className={`${styles[type]} ${styles.alert}`}>{feedback}</div>;
}
