import { TPregunta } from "./TPregunta"

export type TPrueba = {
    dificultad: string,
    preguntas: TPregunta[],
    respuestas: string[],
    inicio: number,
    finalizado: boolean
}