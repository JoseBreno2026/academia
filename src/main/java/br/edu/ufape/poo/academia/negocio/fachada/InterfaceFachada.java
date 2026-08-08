package br.edu.ufape.poo.academia.negocio.fachada;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.*;
import br.edu.ufape.poo.academia.negocio.cadastro.*;

public interface InterfaceFachada {

    // Treino
    Treino salvarTreino(Treino entity);
    List<Treino> listarTreinos();
    boolean verificarExistenciaTreinoId(Long id);
    Treino buscarTreinoPorId(Long id) throws TreinoNaoEncontradoException;
    void deletarTreinoPorId(Long id) throws TreinoNaoEncontradoException;

    // Exercicio
    Exercicio salvarExercicio(Exercicio entity);
    List<Exercicio> listarExercicios();
    boolean verificarExistenciaExercicioId(Long id);
    Exercicio buscarExercicioPorId(Long id) throws ExercicioNaoEncontradoException;
    void deletarExercicioPorId(Long id) throws ExercicioNaoEncontradoException;

    // TipoExercicio
    TipoExercicio salvarTipoExercicio(TipoExercicio entity);
    List<TipoExercicio> listarTiposExercicio();
    boolean verificarExistenciaTipoExercicioId(Long id);
    TipoExercicio buscarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException;
    void deletarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException;

 // Métodos compostos (regras de negócio que cruzam cadastros)
    void adicionarExercicioAoTreino(Long treinoId, Long exercicioId) throws TreinoNaoEncontradoException, ExercicioNaoEncontradoException;
    void associarInstrutorAoTreino(Long treinoId, String instrutorCpf) throws TreinoNaoEncontradoException, InstrutorNaoEncontradoException;
}