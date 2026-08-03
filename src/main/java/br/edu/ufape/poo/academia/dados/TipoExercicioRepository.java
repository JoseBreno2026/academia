package br.edu.ufape.poo.academia.dados;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;

public interface TipoExercicioRepository extends JpaRepository<TipoExercicio, Long> {
	
}