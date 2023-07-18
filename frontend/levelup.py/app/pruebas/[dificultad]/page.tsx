"use client";

import styles from "./prueba.dificultad.module.css";
import Pregunta, { TPregunta } from "@/components/pregunta/Pregunta";
import TitleHeader from "@/components/titleheader/TitleHeader";
import PreguntaService from "@/services/PreguntaService";
import SectionNav from "@/components/sectionnav/SectionNav";
import Timer from "@/components/timer/Timer";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

export default function pruebaDificultad() {
    const [difficulty, setDifficulty] = useState("");
    const [preguntas, setPreguntas] = useState([] as TPregunta[]);
    const [respuestas, setRespuestas] = useState([] as string[]);
    const [finished, setFinished] = useState(false)
    const pathname = usePathname();
    const router = useRouter();

    const handleSectionNav = (section: number) => {
        router.replace("#" + section);
    };

    const handleUserAnswerChanges = (userAnswer: string, index: number) => {
        console.log(userAnswer)
        respuestas[index] = userAnswer;
        setRespuestas(respuestas);
        secureLocalStorage.setItem("respuestas", respuestas);
    }

    const handleFinishTest = () => {
        setFinished(true)
    }

    useEffect(() => {
        const fetchPreguntas = async (difficulty: string, number: number) => {
            try {
                const response = await PreguntaService.getNRandomByDifficulty(
                    difficulty,
                    number
                );
                setPreguntas(response.data);
                secureLocalStorage.setItem("preguntas", response.data);
                console.log(response);
            } catch (error: AxiosError | any) {
                console.log(error);
            }
        };
        const difficultyTemp = pathname.split("/")[2];
        if (
            difficultyTemp != "basico" &&
            difficultyTemp != "intermedio" &&
            difficultyTemp != "avanzado"
        ) {
            // ERROR 404
        }

        setDifficulty(difficultyTemp);

        const preguntasGuardadas =
            (secureLocalStorage.getItem("preguntas") as TPregunta[]) ?? [];
        if (preguntasGuardadas.length == 0) {
            fetchPreguntas(difficultyTemp, 4);
            setRespuestas(["", "", "", ""])
        } else {
            setPreguntas(preguntasGuardadas);
            const respuestasGuardadas = secureLocalStorage.getItem("respuestas") as string[] ?? ["", "", "", ""];
            setRespuestas(respuestasGuardadas);
        }
    }, []);

    return (
        <>
            <TitleHeader
                title={`Prueba de nivel ${difficulty}`}
                subTitle="conteste las preguntas a continuación"
            />
            <div className={styles.prueba}>
                <div className={styles.preguntas}>
                    {preguntas.map((pregunta: TPregunta, index) =>
                        index ? (
                            <Fragment key={index}>
                                <hr className={styles["hr-pregunta"]} />
                                <Pregunta
                                    numero={index + 1}
                                    pregunta={pregunta}
                                    userAnswer={respuestas[index]}
                                    onChangeAnswer={handleUserAnswerChanges}
                                    isFinished={finished}
                                />
                            </Fragment>
                        ) : (
                            <Pregunta
                                key={index}
                                numero={index + 1}
                                pregunta={pregunta}
                                userAnswer={respuestas[index]}
                                onChangeAnswer={handleUserAnswerChanges}
                                isFinished={finished}
                            />
                        )
                    )}
                </div>
                <section className={styles["side-helpers"]}>
                    <Timer dateStart={new Date()} />
                    <SectionNav amount={4} onSectionClick={handleSectionNav} />
                    <button
                        onClick={handleFinishTest}
                        className={styles.button}
                    >
                        Terminar prueba
                    </button>
                </section>
            </div>
        </>
    );
}
