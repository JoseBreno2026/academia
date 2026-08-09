package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;

public interface InterfaceCadastroPagamento {
    Pagamento salvarPagamento(Pagamento entity) throws PagamentoInvalidoException;
    List<Pagamento> listarPagamentos();
    boolean verificarExistenciaPagamentoId(Long id);
    Pagamento buscarPagamentoPorId(Long id) throws PagamentoInvalidoException;
    void deletarPagamentoPorId(Long id) throws PagamentoInvalidoException;
}