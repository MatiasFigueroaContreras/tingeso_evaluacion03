import { TDificultad } from "@/types/TDificultad";
import { TPregunta } from "@/types/TPregunta";
import { TPrueba } from "@/types/TPrueba";
import secureLocalStorage from "react-secure-storage";

export class PruebaStorageManager {
    dificultad: TDificultad
    constructor(dificultad: TDificultad) {
        this.dificultad = dificultad;
    }

    getAll(): TPrueba {
        return secureLocalStorage.getItem(this.dificultad) as TPrueba;
    }

    setAll(preguntas: TPregunta[], respuestas: string[], inicio: Date, finalizado: boolean) {
        const prueba: TPrueba = {
            dificultad: this.dificultad,
            preguntas: preguntas,
            respuestas: respuestas,
            inicio: inicio.getTime(),
            finalizado: finalizado
        }

        secureLocalStorage.setItem(this.dificultad, prueba);
        return prueba;
    }

    setPreguntas(preguntas: TPregunta[]) {
        const prueba = secureLocalStorage.getItem(this.dificultad) as TPrueba
        prueba.preguntas = preguntas
        secureLocalStorage.setItem(this.dificultad, prueba);
    }

    setRespuestas(respuestas: string[]) {
        const prueba = secureLocalStorage.getItem(this.dificultad) as TPrueba;
        prueba.respuestas = respuestas;
        secureLocalStorage.setItem(this.dificultad, prueba);
    }

    setInicio(inicio: Date) {
        const prueba = secureLocalStorage.getItem(this.dificultad) as TPrueba;
        prueba.inicio = inicio.getTime();
        secureLocalStorage.setItem(this.dificultad, prueba);
    }

    setFinalizado(finalizado: boolean) {
        const prueba = secureLocalStorage.getItem(this.dificultad) as TPrueba;
        prueba.finalizado = finalizado;
        secureLocalStorage.setItem(this.dificultad, prueba);
    }

    remove() {
        secureLocalStorage.removeItem(this.dificultad);
    }

    static existsPrueba(dificultad: string) {
        const prueba = secureLocalStorage.getItem(dificultad) as TPrueba | null;
        return prueba !== null;
    }
}
