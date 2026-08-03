package br.edu.ufape.poo.academia.dados;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.ufape.poo.academia.negocio.basico.Treino;

public interface TreinoRepository extends JpaRepository<Treino, Long> {

}