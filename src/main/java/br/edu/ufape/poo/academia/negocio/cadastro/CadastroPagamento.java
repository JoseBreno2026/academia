package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ufape.poo.academia.dados.AlunoRepository;
import br.edu.ufape.poo.academia.dados.PagamentoRepository;
import br.edu.ufape.poo.academia.negocio.basico.Aluno;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;

@Service
public class CadastroPagamento implements InterfaceCadastroPagamento {

    @Autowired
    private PagamentoRepository colecaoPagamento;

    @Autowired
    private AlunoRepository alunoRepository;

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
    @Transactional
    public void deletarPagamentoPorId(Long id) throws PagamentoInvalidoException {
        Pagamento pagamento = colecaoPagamento.findById(id)
                .orElseThrow(() -> new PagamentoInvalidoException("Não é possível deletar. Pagamento inexistente!"));

        // Busca todos os alunos e desvincula o pagamento da lista do aluno se existir
        List<Aluno> alunos = alunoRepository.findAll();
        for (Aluno aluno : alunos) {
            if (aluno.getListaPagamentos() != null && aluno.getListaPagamentos().contains(pagamento)) {
                aluno.getListaPagamentos().remove(pagamento);
                alunoRepository.save(aluno);
            }
        }

        colecaoPagamento.delete(pagamento);
    }
}