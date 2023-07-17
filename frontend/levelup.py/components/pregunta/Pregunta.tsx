import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { codeTheme } from "@/public/customThemeCodeMirror";

import styles from "./pregunta.module.css"
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({ subsets: ["latin"] });

export default function Pregunta({
    numero,
    codigo,
}: {
    numero: number;
    codigo: string;
}) {
    return (
        <section className={styles.pregunta}>
            <h3>PREGUNTA {numero}</h3>
            <p>Señale que es lo que imprime el siguiente codigo</p>
            <CodeMirror
                value={codigo}
                theme={codeTheme}
                className={styles.code}
                extensions={[python()]}
                minHeight="300px"
                maxWidth="900px"
                editable={false}
            />
            <textarea
                className={`${styles.answer} ${baloo.className}`}
                placeholder="Ingrese la salida del código"
                required
            />
        </section>
    );
}
