package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.PagamentoRepository;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;

@Service
public class CadastroPagamento implements InterfaceCadastroPagamento {

    @Autowired
    private PagamentoRepository colecaoPagamento;

    @Override
    public Pagamento salvarPagamento(Pagamento entity) throws PagamentoInvalidoException {
        if (entity == null || entity.getValor() <= 0) {
            throw new PagamentoInvalidoException("O valor do pagamento deve ser maior que zero!");
        }
        return colecaoPagamento.save(entity);
    }

    @Override
    public List<Pagamento> listarPagamentos() {
        return colecaoPagamento.findAll();
    }

    @Override
    public boolean verificarExistenciaPagamentoId(Long id) {
        return colecaoPagamento.existsById(id);
    }

    @Override
    public Pagamento buscarPagamentoPorId(Long id) throws PagamentoInvalidoException {
        return colecaoPagamento.findById(id)
                .orElseThrow(() -> new PagamentoInvalidoException("Pagamento não encontrado pelo ID informado!"));
    }

    @Override
    public void deletarPagamentoPorId(Long id) throws PagamentoInvalidoException {
        if (!colecaoPagamento.existsById(id)) {
            throw new PagamentoInvalidoException("Não é possível deletar. Pagamento inexistente!");
        }
        colecaoPagamento.deleteById(id);
    }
}