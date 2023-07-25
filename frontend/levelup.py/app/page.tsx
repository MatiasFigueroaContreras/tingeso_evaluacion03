import TitleHeader from "@/components/titleheader/TitleHeader";
import styles from "./home.module.css"
import Link from "next/link";

export default function Home() {
    return (
        <>
            <TitleHeader
                title="¡Bienvenido a LEVELUP.py!"
                subTitle="el lugar donde podrás subir tu nivel de programación en Python"
            />
            <div className={styles.main}>
                <h2>
                    ¡Desafía tu comprensión de programas con nuestras pruebas!
                </h2>
                <section className={styles.section}>
                    <h3>¿QUE OFRECEMOS?</h3>
                    <ul className={styles.list}>
                        <li>Resuelve 4 preguntas en cada prueba, según tu nivel.</li>
                        <li>
                            Obtén resultados instantáneos y puntajes de 1.0 a 7.0.
                        </li>
                        <li>
                            Comparte tus propias preguntas y desafía a otros.
                        </li>
                    </ul>
                </section>
                <div className={styles.desafio}>
                    <p>¿Listo para el desafío? </p>
                    <Link className={styles.link} href="/pruebas">¡Comienza ahora!</Link>
                </div>
            </div>
        </>
    );
}
