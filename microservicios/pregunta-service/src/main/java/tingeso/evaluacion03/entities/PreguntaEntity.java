package tingeso.evaluacion03.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="pregunta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreguntaEntity {
    @Id
    @SequenceGenerator(name = "pregunta_sequence", sequenceName = "pregunta_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pregunta_sequence")
    private Integer id;
    @Column(columnDefinition = "TEXT")
    private String codigo;
    @Column(columnDefinition = "TEXT")
    private String respuesta;
    @Enumerated(EnumType.STRING)
    private Dificultad dificultad;
}
