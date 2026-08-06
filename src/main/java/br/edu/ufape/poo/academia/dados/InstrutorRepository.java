package br.edu.ufape.poo.academia.dados;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;

public interface InstrutorRepository extends JpaRepository<Instrutor, Long> {
	Instrutor findByCpf(String cpf);
    boolean existsByCpf(String cpf);
}