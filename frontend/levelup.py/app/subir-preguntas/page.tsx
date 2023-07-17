"use client"

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { codeTheme } from "@/public/customThemeCodeMirror";

import styles from "./subir-preguntas.module.css";
import TitleHeader from "@/components/titleheader/TitleHeader";
import PreguntaService from "@/services/PreguntaService";
import { FormEvent, useState } from "react";
import { Baloo_2 } from "next/font/google";
import { AxiosError } from "axios";



const baloo = Baloo_2({ subsets: ["latin"] });

export default function subirPregunta() {
    const [code, setCode] = useState("");
    const [codeAnswer, setCodeAnswer] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const handleSubmit =async (e: FormEvent) => {
        e.preventDefault();
        try {
            await PreguntaService.create(code, codeAnswer, difficulty);
        }
        catch (error: AxiosError | any) {
            if (error.response === undefined || error.response.status >= 500) {
                console.log(error);
                console.log("test");
            } else {
                console.log(error);
            }
        }
    }

    return (
        <>
            <TitleHeader
                title="Subir preguntas"
                subTitle="aporta agregando nuevas preguntas al repositorio"
            />
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
                        maxWidth="900px"
                        onChange={(code) => setCode(code)}
                    />
                </section>
                <div className={styles.inputs}>
                    <textarea
                        className={`${styles.codeoutput} ${baloo.className}`}
                        placeholder="Ingrese la salida del código"
                        onChange={(e) => setCodeAnswer(e.target.value)}
                        required
                    />
                    <select
                        className={`${styles.level} ${baloo.className}`}
                        defaultValue="dificultad"
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    >
                        <option value="dificultad" disabled>
                            Seleccione la dificultad
                        </option>
                        <option value="BASCIO">Basico</option>
                        <option value="INTERMEDIO">Intermedio</option>
                        <option value="AVANZADO">Avanzado</option>
                    </select>
                </div>
                <button
                    className={`${styles.button} ${baloo.className}`}
                    type="submit"
                >
                    Subir pregunta
                </button>
            </form>
        </>
    );
}
