package br.edu.ufape.poo.academia.dados;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;

public interface ExercicioRepository extends JpaRepository<Exercicio, Long> {
	
}