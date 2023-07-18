import styles from "./buttonstyled.module.css";
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({ subsets: ["latin"] });

export default function ButtonStyled({
    text,
    disabled,
    extraClass,
}: {
    text: string;
    disabled: boolean;
    extraClass?: string;
}) {
    return (
        <button
            className={`${styles.button} ${baloo.className} ${extraClass}`}
            type="submit"
            disabled={disabled}
        >
            <span className={styles.text}>{text}</span>
            {disabled && (
                <div className={styles["loading-container"]}>
                    <div className={styles["loading-circle"]}></div>
                </div>
            )}
        </button>
    );
}
