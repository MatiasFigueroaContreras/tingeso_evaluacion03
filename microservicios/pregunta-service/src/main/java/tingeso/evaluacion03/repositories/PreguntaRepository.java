package tingeso.evaluacion03.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tingeso.evaluacion03.entities.Dificultad;
import tingeso.evaluacion03.entities.PreguntaEntity;

import java.util.List;

@Repository
public interface PreguntaRepository extends JpaRepository<PreguntaEntity, Integer> {
    @Query(value = "SELECT * FROM pregunta WHERE dificultad = :dificultad ORDER BY RANDOM() LIMIT :cantidad", nativeQuery = true)
    List<PreguntaEntity> findNByDificultadRandom(@Param("dificultad") String dificultad, @Param("cantidad") int cantidad);
}
