package tingeso.evaluacion03.services;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tingeso.evaluacion03.entities.Dificultad;
import tingeso.evaluacion03.entities.PreguntaEntity;
import tingeso.evaluacion03.repositories.PreguntaRepository;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;

@Service
public class PreguntaService {
    @Autowired
    private PreguntaRepository preguntaRepository;

    public void create(@NonNull String codigo, @NonNull String respuesta, @NonNull String dificultad) {
        Dificultad dificultadEnum = normalizarDificultad(dificultad);
        PreguntaEntity pregunta = new PreguntaEntity(null, codigo, respuesta, dificultadEnum);
        preguntaRepository.save(pregunta);
    }

    public List<PreguntaEntity> getAll() {
        return preguntaRepository.findAll();
    }

    public List<PreguntaEntity> getNByDificultadRandom(@NonNull String dificultad, int cantidad) {
        if(cantidad < 0) {
            throw new IllegalArgumentException("La cantidad de preguntas debe ser positiva");
        }
        Dificultad dificultadEnum = normalizarDificultad(dificultad);
        return preguntaRepository.findNByDificultadRandom(dificultadEnum.name(), cantidad);
    }

    private Dificultad normalizarDificultad(String dificultad) {
        String dificultadNormalizada = Normalizer.normalize(dificultad, Normalizer.Form.NFD);
        dificultadNormalizada = dificultadNormalizada.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        dificultadNormalizada = dificultadNormalizada.toUpperCase(Locale.ROOT);
        try {
            Dificultad dificultadEnum = Dificultad.valueOf(dificultadNormalizada);
            return dificultadEnum;
        }
        catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("La dificultad ingresada no es valida");
        }
    }
}
