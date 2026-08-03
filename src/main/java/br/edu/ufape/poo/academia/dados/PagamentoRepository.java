package br.edu.ufape.poo.academia.dados;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
	
}