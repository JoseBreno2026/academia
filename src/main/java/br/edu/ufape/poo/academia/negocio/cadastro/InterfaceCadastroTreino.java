package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Treino;

public interface InterfaceCadastroTreino {
    Treino salvarTreino(Treino entity);
    List<Treino> listarTreinos();
    boolean verificarExistenciaTreinoId(Long id);
    Treino buscarTreinoPorId(Long id) throws TreinoNaoEncontradoException;
    void deletarTreinoPorId(Long id) throws TreinoNaoEncontradoException;
}