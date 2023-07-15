package tingeso.evaluacion03.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.evaluacion03.entities.PreguntaEntity;
import tingeso.evaluacion03.services.PreguntaService;

import java.util.List;

@RestController
@RequestMapping("/preguntas")
public class PreguntaController {
    @Autowired
    private PreguntaService preguntaService;

    @PostMapping
    public ResponseEntity create(@RequestParam("codigo") String codigo,
                                 @RequestParam("respuesta") String respuesta,
                                 @RequestParam("dificultad") String dificultad) {
        try {
            preguntaService.create(codigo, respuesta, dificultad);
            return ResponseEntity.ok(null);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<PreguntaEntity>> getAll() {
        List<PreguntaEntity> preguntas = preguntaService.getAll();
        return ResponseEntity.ok(preguntas);
    }

    @GetMapping("/random")
    public ResponseEntity getNByDificultadRandom(@RequestParam("dificultad") String dificultad,
                                                 @RequestParam("cantidad") int cantidad) {
        try {
            List<PreguntaEntity> preguntas = preguntaService.getNByDificultadRandom(dificultad, cantidad);
            return ResponseEntity.ok(preguntas);
        }
        catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
