"use client";

import Pregunta from "@/components/pregunta/Pregunta";
import TitleHeader from "@/components/titleheader/TitleHeader";
import PreguntaService from "@/services/PreguntaService";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./prueba.dificultad.module.css"

export default function pruebaDificultad() {
    const [difficulty, setDifficulty] = useState("")
    const [preguntas, setPreguntas] = useState([])
    const pathname = usePathname();

    useEffect(() => {
        const fetchPreguntas = async (difficulty: string, number: number) => {
            try {
                const response = await PreguntaService.getNRandomByDifficulty(
                    difficulty,
                    4
                );
                setPreguntas(response.data);
                console.log(response)
            } catch (error: AxiosError | any) {
                console.log(error);
            }
        };
        const difficultyTemp = pathname.split("/")[2];
        if(difficultyTemp != "basico" && difficultyTemp != "intermedio" && difficultyTemp != "avanzado"){
            // ERROR 404
        }

        setDifficulty(difficultyTemp);
        fetchPreguntas(difficultyTemp, 4);


    }, [])

    return (
        <>
            <TitleHeader
                title={`Prueba de nivel ${difficulty}`}
                subTitle="conteste las preguntas a continuación"
            />
            <form className={styles.preguntas}>
                {preguntas.map((pregunta, index) => (
                    <Pregunta
                        key={index}
                        numero={index + 1}
                        codigo={pregunta.codigo}
                    />
                ))}
                <button className={styles.button}>Terminar prueba</button>
            </form>
        </>
    );
}
