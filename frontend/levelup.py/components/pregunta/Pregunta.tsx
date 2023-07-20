"use client"

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { codeTheme } from "@/public/customThemeCodeMirror";

import styles from "./pregunta.module.css";
import { Baloo_2 } from "next/font/google";
import { useEffect, useRef } from "react";
import { TPregunta } from "@/types/TPregunta";

const baloo = Baloo_2({ subsets: ["latin"] });


export default function Pregunta({
    numero,
    pregunta,
    userAnswer,
    onChangeAnswer,
    isFinished,
}: {
    numero: number;
    pregunta: TPregunta;
    userAnswer: string;
    onChangeAnswer: (userAnswer: string, index: number) => void;
    isFinished: boolean;
}) {
    const textAreaUserAnswerRef = useRef<HTMLTextAreaElement>(null);
    const textAreaRealAnswerRef = useRef<HTMLTextAreaElement>(null);

    const isCorrect = () => {
        return (
            userAnswer.replace(/\r/g, "") ===
            pregunta.respuesta.replace(/\r/g, "")
        );
    };

    useEffect(() => {
        resizeTextArea();
    }, [userAnswer]);

    const resizeTextArea = () => {
        const textareaUser = textAreaUserAnswerRef.current;
        if (textareaUser) {
            const lines = textareaUser.value.split("\n").length;
            const newHeight = lines * 30 + 12;

            textareaUser.style.height = `${Math.max(newHeight, 45)}px`;
        }

        const textareaReal = textAreaRealAnswerRef.current;
        if (textareaReal) {
            const lines = textareaReal.value.split("\n").length;
            const newHeight = lines * 30 + 12;

            textareaReal.style.height = `${Math.max(newHeight, 45)}px`;
        }
    };
    return (
        <section id={numero.toString()} className={styles.pregunta}>
            <div className={styles.top}>
                <h3>PREGUNTA {numero}</h3>
                {isFinished ? (
                    isCorrect() ? (
                        <div className={`${styles.feedback} ${styles.correct}`}>
                            <svg
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M707.84 323.413333L426.666667 604.586667l-110.506667-110.08L256 554.666667l170.666667 170.666666 341.333333-341.333333zM512 853.333333a341.333333 341.333333 0 1 1 341.333333-341.333333 341.333333 341.333333 0 0 1-341.333333 341.333333z m0-768a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z"
                                    fill="#075D23"
                                />
                            </svg>
                            <h4>Correcta</h4>
                        </div>
                    ) : (
                        <div className={`${styles.feedback} ${styles.wrong}`}>
                            <svg
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M512 853.333333a341.333333 341.333333 0 1 1 341.333333-341.333333 341.333333 341.333333 0 0 1-341.333333 341.333333z m0-768a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m110.506667 256L512 451.84 401.493333 341.333333 341.333333 401.493333 451.84 512 341.333333 622.506667 401.493333 682.666667 512 572.16 622.506667 682.666667 682.666667 622.506667 572.16 512 682.666667 401.493333z"
                                    fill="#FF0000"
                                />
                            </svg>
                            <h4>Incorrecta</h4>
                        </div>
                    )
                ) : null}
            </div>
            <p>Señale que es lo que imprime el siguiente código:</p>
            <CodeMirror
                value={pregunta.codigo}
                theme={codeTheme}
                className={styles.code}
                extensions={[python()]}
                minHeight="250px"
                maxWidth="48vw"
                editable={false}
                readOnly={true}
            />
            {isFinished ? (
                <p className={styles["textarea-placeholder"]}>Tu respuesta:</p>
            ) : null}
            <textarea
                ref={textAreaUserAnswerRef}
                defaultValue={userAnswer}
                className={`${styles.answer} ${baloo.className}`}
                placeholder={isFinished ? "" : "Ingrese la salida del código"}
                onChange={(e) => onChangeAnswer(e.target.value, numero - 1)}
                onInput={resizeTextArea}
                readOnly={isFinished}
            />
            {isFinished ? (
                <>
                    <p className={styles["textarea-placeholder"]}>
                        Respuesta correcta:
                    </p>
                    <textarea
                        ref={textAreaRealAnswerRef}
                        value={pregunta.respuesta}
                        className={`${styles.answer} ${baloo.className}`}
                        readOnly
                    />
                </>
            ) : null}
        </section>
    );
}
