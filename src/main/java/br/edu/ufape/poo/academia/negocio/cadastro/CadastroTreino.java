package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.TreinoRepository;
import br.edu.ufape.poo.academia.negocio.basico.Treino;

@Service
public class CadastroTreino {

    @Autowired
    private TreinoRepository colecaoTreino;

    public Treino salvarTreino(Treino entity) {
        return colecaoTreino.save(entity);
    }

    public List<Treino> listarTreinos() {
        return colecaoTreino.findAll();
    }

    public boolean verificarExistenciaTreinoId(Long id) {
        return colecaoTreino.existsById(id);
    }

    public Treino buscarTreinoPorId(Long id) throws TreinoNaoEncontradoException {
        return colecaoTreino.findById(id)
                .orElseThrow(() -> new TreinoNaoEncontradoException(id));
    }

    public void deletarTreinoPorId(Long id) throws TreinoNaoEncontradoException {
        if (!colecaoTreino.existsById(id)) {
            throw new TreinoNaoEncontradoException(id);
        }
        colecaoTreino.deleteById(id);
    }
}