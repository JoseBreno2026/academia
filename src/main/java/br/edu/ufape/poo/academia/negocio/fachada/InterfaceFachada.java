package br.edu.ufape.poo.academia.negocio.fachada;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.*;
import br.edu.ufape.poo.academia.negocio.cadastro.*;

public interface InterfaceFachada {

    // ================= TREINO =================
    Treino salvarTreino(Treino entity);
    List<Treino> listarTreinos();
    boolean verificarExistenciaTreinoId(Long id);
    Treino buscarTreinoPorId(Long id) throws TreinoNaoEncontradoException;
    void deletarTreinoPorId(Long id) throws TreinoNaoEncontradoException;

    // ================= EXERCICIO =================
    Exercicio salvarExercicio(Exercicio entity);
    List<Exercicio> listarExercicios();
    boolean verificarExistenciaExercicioId(Long id);
    Exercicio buscarExercicioPorId(Long id) throws ExercicioNaoEncontradoException;
    void deletarExercicioPorId(Long id) throws ExercicioNaoEncontradoException;

    // ================= TIPO EXERCICIO =================
    TipoExercicio salvarTipoExercicio(TipoExercicio entity);
    List<TipoExercicio> listarTiposExercicio();
    boolean verificarExistenciaTipoExercicioId(Long id);
    TipoExercicio buscarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException;
    void deletarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException;

    // ================= ALUNO =================
    Aluno salvarAluno(Aluno entity) throws AlunoDuplicadoException;
    List<Aluno> listarAlunos();
    Aluno procurarAlunoPorCpf(String cpf) throws AlunoNaoEncontradoException;
    Aluno procurarAlunoPorId(Long id) throws AlunoNaoEncontradoException;
    void removerAluno(Long id) throws AlunoNaoEncontradoException;

    // ================= INSTRUTOR =================
    Instrutor salvarInstrutor(Instrutor entity);
    List<Instrutor> listarInstrutores();
    Instrutor procurarInstrutorPorCpf(String cpf) throws InstrutorNaoEncontradoException;
    Instrutor procurarInstrutorPorId(Long id) throws InstrutorNaoEncontradoException;
    void removerInstrutor(Long id) throws InstrutorNaoEncontradoException;

    // ================= PLANO =================
    Plano salvarPlano(Plano entity);
    List<Plano> listarPlanos();
    boolean verificarExistenciaPlanoId(Long id);
    Plano buscarPlanoPorId(Long id) throws PlanoNaoEncontradoException;
    void deletarPlanoPorId(Long id) throws PlanoNaoEncontradoException;

    // ================= PAGAMENTO =================
    Pagamento salvarPagamento(Pagamento entity) throws PagamentoInvalidoException;
    List<Pagamento> listarPagamentos();
    boolean verificarExistenciaPagamentoId(Long id);
    Pagamento buscarPagamentoPorId(Long id) throws PagamentoInvalidoException;
    void deletarPagamentoPorId(Long id) throws PagamentoInvalidoException;

    // ================= REGRAS COMPOSTAS =================
    void adicionarExercicioAoTreino(Long treinoId, Long exercicioId) throws TreinoNaoEncontradoException, ExercicioNaoEncontradoException;
    void associarInstrutorAoTreino(Long treinoId, String instrutorCpf) throws TreinoNaoEncontradoException, InstrutorNaoEncontradoException;
}