"use client";

import styles from "./prueba.dificultad.module.css";
import Pregunta from "@/components/pregunta/Pregunta";
import TitleHeader from "@/components/titleheader/TitleHeader";
import PreguntaService from "@/services/PreguntaService";
import SectionNav from "@/components/sectionnav/SectionNav";
import Timer from "@/components/timer/Timer";
import GradeFeedback from "@/components/gradefeedback/GradeFeedback";
import ButtonStyled from "@/components/buttonstyled/ButtonStyled";
import QuestionsSkeleton from "@/components/questionsskeleton/QuestionsSkeleton";

import { AxiosError } from "axios";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { TPregunta } from "@/types/TPregunta";
import { PruebaStorageManager } from "@/public/localStorageManager";
import { TDificultad } from "@/types/TDificultad";
import { TPrueba } from "@/types/TPrueba";
import FeedbackAlert, {
    FeedbackTypes,
} from "@/components/feedbackalert/FeedbackAlert";

export default function pruebaDificultad({
    params,
}: {
    params: { dificultad: string };
}) {
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
    const [dateEnd, setDateEnd] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorFeedback, setErrorFeedback] = useState("");

    const [recall, setRecall] = useState(0);
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
            (answer, index) =>
                answer.replace(/\r/g, "") ===
                questions[index].respuesta.replace(/\r/g, "")
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
        setIsSubmitting(true);
        const endDate = new Date();
        pruebaStorageManager?.setFinalizado(true);
        pruebaStorageManager?.setFinal(endDate);
        setTimeout(() => {
            setFinished(true);
            setDateEnd(endDate);
            setBoolResults(getBoolResults(respuestas, preguntas));
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsSubmitting(false);
        }, 300);
    };

    const handleStartOtherTest = () => {
        setIsSubmitting(true);
        setLoading(true);
        pruebaStorageManager?.remove();
        setRecall(recall + 1);
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
                return [] as TPregunta[];
            }
        };

        const setAll = (prueba: TPrueba) => {
            setDifficulty(prueba.dificultad);
            setPreguntas(prueba.preguntas);
            setRespuestas(prueba.respuestas);
            setBoolResults(getBoolResults(prueba.respuestas, prueba.preguntas));
            setDateStart(new Date(prueba.inicio));
            setDateEnd(new Date(prueba.final));
            setFinished(prueba.finalizado);
        };

        const verifyPruebaStorageManager = (difficulty: string) => {
            if (!["basico", "intermedio", "avanzado"].includes(difficulty)) {
                router.replace("/404");
            }

            const pruebaStorageManager = new PruebaStorageManager(
                difficulty as TDificultad
            );

            return pruebaStorageManager;
        };

        const getPrueba = async (pruebaStorageM: PruebaStorageManager) => {
            if (PruebaStorageManager.existsPrueba(pruebaStorageM.dificultad)) {
                return pruebaStorageM.getAll();
            }

            const questions = await fetchPreguntas(
                pruebaStorageM.dificultad,
                4
            );

            if (questions.length != 4) {
                return null;
            }

            const prueba = pruebaStorageM.setAll(
                questions,
                ["", "", "", ""],
                new Date(),
                new Date(),
                false
            );

            return prueba;
        };

        const startTest = async () => {
            const pruebaStorageM = verifyPruebaStorageManager(
                params.dificultad
            );
            setPruebaStorageManager(pruebaStorageM);

            setLoading(true);
            const prueba = await getPrueba(pruebaStorageM);
            setTimeout(() => {
                prueba
                    ? setAll(prueba)
                    : setErrorFeedback(
                          "Hubo un error cargando las preguntas, inténtalo más tarde"
                      );
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                setLoading(false);
                setIsSubmitting(false);
            }, 350);

        };

        startTest();
    }, [recall]);

    return (
        <>
            <TitleHeader
                title={`Prueba de nivel ${difficulty}`}
                subTitle="conteste las preguntas a continuación"
            />
            {errorFeedback ? (
                <FeedbackAlert
                    type={FeedbackTypes.Error}
                    feedback={errorFeedback}
                />
            ) : (
                <div className={styles.prueba}>
                    {loading ? (
                        <QuestionsSkeleton amount={4} />
                    ) : (
                        <div className={styles.preguntas}>
                            {preguntas.map((pregunta: TPregunta, index) =>
                                index ? (
                                    <Fragment key={index}>
                                        <hr className={styles["hr-pregunta"]} />
                                        <Pregunta
                                            numero={index + 1}
                                            pregunta={pregunta}
                                            userAnswer={respuestas[index]}
                                            onChangeAnswer={
                                                handleUserAnswerChanges
                                            }
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
                    )}
                    <section className={styles["side-helpers"]}>
                        {finished ? (
                            <GradeFeedback
                                grade={calculateGrade(boolResults)}
                            />
                        ) : null}
                        <Timer
                            dateStart={dateStart}
                            run={!finished}
                            dateEnd={dateEnd}
                        />
                        <SectionNav
                            amount={4}
                            onSectionClick={handleSectionNav}
                            isFinished={finished}
                            boolResults={boolResults}
                        />
                        {finished ? (
                            <ButtonStyled
                                text="Iniciar otra prueba"
                                onClick={handleStartOtherTest}
                                extraClass={styles.button}
                                disabled={isSubmitting}
                            />
                        ) : (
                            <ButtonStyled
                                text="Terminar prueba"
                                onClick={handleFinishTest}
                                extraClass={styles.button}
                                disabled={isSubmitting}
                            />
                        )}
                    </section>
                </div>
            )}
        </>
    );
}
