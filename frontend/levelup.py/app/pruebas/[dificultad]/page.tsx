"use client";

import styles from "./prueba.dificultad.module.css";
import Pregunta from "@/components/pregunta/Pregunta";
import TitleHeader from "@/components/titleheader/TitleHeader";
import PreguntaService from "@/services/PreguntaService";
import SectionNav from "@/components/sectionnav/SectionNav";
import Timer from "@/components/timer/Timer";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GradeFeedback from "@/components/gradefeedback/GradeFeedback";
import { TPregunta } from "@/types/TPregunta";
import { PruebaStorageManager } from "@/public/localStorageManager";
import { TDificultad } from "@/types/TDificultad";
import { TPrueba } from "@/types/TPrueba";

export default function pruebaDificultad() {
    const [pruebaStorageManager, setPruebaStorageManager] =
        useState<PruebaStorageManager>();
    const [difficulty, setDifficulty] = useState("");
    const [preguntas, setPreguntas] = useState([] as TPregunta[]);
    const [respuestas, setRespuestas] = useState(["", "", "", ""]);
    const [boolResults, setBoolResults] = useState([
        false,
        false,
        false,
        false,
    ]);
    const [finished, setFinished] = useState(false);
    const [dateStart, setDateStart] = useState(new Date());
    const pathname = usePathname();
    const router = useRouter();

    const handleSectionNav = (section: number) => {
        router.replace("#" + section);
    };

    const handleUserAnswerChanges = (userAnswer: string, index: number) => {
        respuestas[index] = userAnswer;
        setRespuestas(respuestas);
        pruebaStorageManager?.setRespuestas(respuestas);
    };

    const getBoolResults = (answers: string[], questions: TPregunta[]) => {
        return answers.map(
            (answer, index) => answer.replace(/\r/g, '') === questions[index].respuesta.replace(/\r/g, '')
        );
    };

    const calculateGrade = (boolResults: boolean[]) => {
        const results = boolResults.map((boolResult) =>
            boolResult ? 7.0 : 1.0
        );

        return (
            results.reduce((acc, result) => acc + result, 0) / results.length
        );
    };

    const handleFinishTest = () => {
        setFinished(true);
        pruebaStorageManager?.setFinalizado(true);
        setBoolResults(getBoolResults(respuestas, preguntas));
    };

    const handleStartOtherTest = () => {
        pruebaStorageManager?.remove();
        router.replace("/pruebas");
    };

    useEffect(() => {
        const fetchPreguntas = async (difficulty: string, number: number) => {
            try {
                const response = await PreguntaService.getNRandomByDifficulty(
                    difficulty,
                    number
                );
                return response.data as TPregunta[];
            } catch (error: AxiosError | any) {
                console.log(error);
            }

            return [] as TPregunta[];
        };

        const verifySetPruebaStorageManager = () => {
            const difficultyTemp = pathname.split("/")[2];
            try {
                const pruebaStorageManager = new PruebaStorageManager(
                    difficultyTemp as TDificultad
                );
                setPruebaStorageManager(pruebaStorageManager);
                return pruebaStorageManager;
            } catch (e) {
                console.log(e);
                router.replace("/prueba");
                alert(e);
                return;
            }
        };
        const setAll = (prueba: TPrueba) => {
            setDifficulty(prueba.dificultad);
            setPreguntas(prueba.preguntas);
            setRespuestas(prueba.respuestas);
            setBoolResults(getBoolResults(prueba.respuestas, prueba.preguntas));
            setDateStart(new Date(prueba.inicio));
            setFinished(prueba.finalizado);
        };

        const init = async () => {
            const pruebaStorageM = verifySetPruebaStorageManager();
            if (pruebaStorageM) {
                if (
                    PruebaStorageManager.existsPrueba(pruebaStorageM.dificultad)
                ) {
                    const prueba = pruebaStorageM.getAll();
                    setAll(prueba);
                } else {
                    const questions = await fetchPreguntas(
                        pruebaStorageM.dificultad,
                        4
                    );
                    if (questions.length != 4) {
                        // Poner mensaje
                    }
                    const prueba = pruebaStorageM.setAll(
                        questions,
                        ["", "", "", ""],
                        dateStart,
                        false
                    );
                    setAll(prueba);
                }
            }
        };

        init();
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
                    {finished ? (
                        <GradeFeedback grade={calculateGrade(boolResults)} />
                    ) : null}
                    <Timer dateStart={dateStart} run={!finished} />
                    <SectionNav
                        amount={4}
                        onSectionClick={handleSectionNav}
                        isFinished={finished}
                        boolResults={boolResults}
                    />
                    {finished ? (
                        <button
                            onClick={handleStartOtherTest}
                            className={styles.button}
                        >
                            Iniciar otra prueba
                        </button>
                    ) : (
                        <button
                            onClick={handleFinishTest}
                            className={styles.button}
                        >
                            Terminar prueba
                        </button>
                    )}
                </section>
            </div>
        </>
    );
}
