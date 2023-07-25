"use client";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { codeTheme } from "@/public/customThemeCodeMirror";

import styles from "./subir-preguntas.module.css";
import TitleHeader from "@/components/titleheader/TitleHeader";
import PreguntaService from "@/services/PreguntaService";
import FeedbackAlert from "@/components/feedbackalert/FeedbackAlert";
import { FeedbackTypes } from "@/components/feedbackalert/FeedbackAlert";
import { FormEvent, useRef, useState } from "react";
import { Baloo_2 } from "next/font/google";
import { AxiosError } from "axios";
import ButtonStyled from "@/components/buttonstyled/ButtonStyled";

const baloo = Baloo_2({ subsets: ["latin"] });

export default function subirPregunta() {
    const [code, setCode] = useState("");
    const [codeAnswer, setCodeAnswer] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const [feedback, setFeedback] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);


    const resizeTextArea = () => {
        const textareaUser = textAreaRef.current;
        if (textareaUser) {
            const lines = textareaUser.value.split("\n").length;
            const newHeight = lines * 30 + 12;

            textareaUser.style.height = `${Math.max(newHeight, 45)}px`;
        }

        const textareaReal = textAreaRef.current;
        if (textareaReal) {
            const lines = textareaReal.value.split("\n").length;
            const newHeight = lines * 30 + 12;

            textareaReal.style.height = `${Math.max(newHeight, 45)}px`;
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback("");
        if (!code.replace(/\s/g, "").length) {
            setAlertType(FeedbackTypes.Informative);
            setTimeout(() => {
                setFeedback("Debes ingresar el código del programa en Python");
                setIsSubmitting(false);
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }, 300);
            return;
        }
        try {
            await PreguntaService.create(code, codeAnswer, difficulty);
            setTimeout(() => {
                setFeedback("Pregunta ingresada correctamente!");
                setIsSubmitting(false);
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }, 300);
            setAlertType(FeedbackTypes.Success);
        } catch (error: AxiosError | any) {
            setAlertType(FeedbackTypes.Error);
            if (error.response === undefined || error.response.status >= 500) {
                setTimeout(() => {
                    setFeedback(
                        "Ocurrió un error al intentar ingresar la pregunta, inténtalo más tarde"
                    );
                    setIsSubmitting(false);
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }, 300);
            } else {
                setTimeout(() => {
                    setFeedback(error.response.data);
                    setIsSubmitting(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 300);
            }
        }
    };

    return (
        <>
            <TitleHeader
                title="Subir preguntas"
                subTitle="aporta agregando nuevas preguntas al repositorio"
            />
            {feedback ? (
                <FeedbackAlert feedback={feedback} type={alertType} />
            ) : null}
            <form className={styles.form} onSubmit={handleSubmit}>
                <section className={styles.codesection}>
                    <h3>CÓDIGO</h3>
                    <p>Ingrese el código del programa en Python</p>
                    <CodeMirror
                        value={code}
                        theme={codeTheme}
                        className={styles.code}
                        extensions={[python()]}
                        minHeight="300px"
                        maxWidth="48vw"
                        onChange={(code) => setCode(code)}
                    />
                </section>
                <div className={styles.inputs}>
                    <textarea
                        ref={textAreaRef}
                        className={`${styles.codeoutput} ${baloo.className}`}
                        placeholder="Ingrese la salida del código"
                        onChange={(e) => setCodeAnswer(e.target.value)}
                        onInput={resizeTextArea}
                    />
                    <select
                        className={`${styles.level} ${baloo.className}`}
                        defaultValue=""
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Seleccione la dificultad
                        </option>
                        <option value="BASICO">Basico</option>
                        <option value="INTERMEDIO">Intermedio</option>
                        <option value="AVANZADO">Avanzado</option>
                    </select>
                </div>
                <ButtonStyled
                    text="Subir pregunta"
                    disabled={isSubmitting}
                    type="submit"
                />
            </form>
        </>
    );
}
