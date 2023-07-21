import Link from "next/link";
import styles from "./pruebas.module.css";
import TitleHeader from "@/components/titleheader/TitleHeader";

export default function pruebas() {
    return (
        <>
            <TitleHeader
                title="Iniciar prueba"
                subTitle="practica y sube tu nivel de programación en Python"
            />
            <div className={styles.main}>
                <section className={styles.section}>
                    <h3>DETALLES</h3>
                    <ul className={styles.list}>
                        <li>
                            La prueba consiste en 4 preguntas del nivel
                            seleccionado de igual puntaje.
                        </li>
                        <li>
                            La prueba tiene una calificación final entre 1.0 y
                            7.0.
                        </li>
                        <li>
                            Las preguntas cuentan con una sección de código en
                            Python.
                        </li>
                        <li>
                            La respuesta se considera correcta si es
                            <b> exactamente </b>
                            la salida del programa.
                        </li>
                    </ul>
                </section>
                <section className={styles.section}>
                    <h3>COMENZAR O CONTINUAR</h3>
                    <p>
                        Seleccione el nivel de dificultad de las preguntas para
                        comenzar o continuar la prueba
                    </p>
                    <div className={styles.buttons}>
                        <Link className={styles.button} href="/pruebas/basico">
                            Nivel básico
                        </Link>
                        <Link
                            className={styles.button}
                            href="/pruebas/intermedio"
                        >
                            Nivel intermedio
                        </Link>
                        <Link
                            className={styles.button}
                            href="/pruebas/avanzado"
                        >
                            Nivel avanzado
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
