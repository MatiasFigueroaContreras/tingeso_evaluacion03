import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { codeTheme } from "@/public/customThemeCodeMirror";

import styles from "./pregunta.module.css"
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({ subsets: ["latin"] });

export type TPregunta = {
    id: number;
    codigo: string;
    respuesta: string;
    dificultad: string;
}

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
    isFinished: boolean
}) {
    return (
        <section id={numero.toString()} className={styles.pregunta}>
            <h3>PREGUNTA {numero}</h3>
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
            <textarea
                defaultValue={userAnswer}
                className={`${styles.answer} ${baloo.className}`}
                placeholder="Ingrese la salida del código"
                onChange={(e) => onChangeAnswer(e.target.value, numero - 1)}
                readOnly={isFinished}
            />
        </section>
    );
}
