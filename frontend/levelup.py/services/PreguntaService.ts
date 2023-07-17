import axios from "axios";

const PREGUNTA_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/preguntas`;

class PreguntaService {
    async create(code: string, answer: string, difficulty: string) {
        return axios.post(
            PREGUNTA_API_URL,
            {
                codigo: code,
                respuesta: answer,
                dificultad: difficulty
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
    }

    async getNRandomByDifficulty(difficulty: string, amount: number) {
        return axios.get(PREGUNTA_API_URL + "/random", {
            headers: { "Content-Type": "multipart/form-data" },
            params: {
                dificultad: difficulty,
                cantidad: amount
            }
        })
    }
}

export default new PreguntaService();
