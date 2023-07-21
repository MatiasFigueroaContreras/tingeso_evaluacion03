import { ButtonHTMLAttributes } from "react";
import styles from "./buttonstyled.module.css";
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({ subsets: ["latin"] });

interface ButtonStyledProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    disabled: boolean;
    extraClass?: string;
}

export default function ButtonStyled({
    text,
    disabled,
    extraClass,
    ...extra
}: ButtonStyledProps) {
    return (
        <button
            className={`${styles.button} ${baloo.className} ${extraClass}`}
            disabled={disabled}
            {...extra}
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
