package br.edu.ufape.poo.academia.negocio.fachada;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.negocio.basico.*;
import br.edu.ufape.poo.academia.negocio.cadastro.*;

@Service
public class Fachada implements InterfaceFachada {

    @Autowired
    private InterfaceCadastroTreino cadastroTreino;

    @Autowired
    private InterfaceCadastroExercicio cadastroExercicio;

    @Autowired
    private InterfaceCadastroTipoExercicio cadastroTipoExercicio;

    @Autowired
    private InterfaceCadastroInstrutor cadastroInstrutor;

    @Autowired
    private InterfaceCadastroAluno cadastroAluno;

    @Autowired
    private InterfaceCadastroPlano cadastroPlano;

    @Autowired
    private InterfaceCadastroPagamento cadastroPagamento;

    // ================= TREINO =================
    @Override
    public Treino salvarTreino(Treino entity) {
        return cadastroTreino.salvarTreino(entity);
    }

    @Override
    public List<Treino> listarTreinos() {
        return cadastroTreino.listarTreinos();
    }

    @Override
    public boolean verificarExistenciaTreinoId(Long id) {
        return cadastroTreino.verificarExistenciaTreinoId(id);
    }

    @Override
    public Treino buscarTreinoPorId(Long id) throws TreinoNaoEncontradoException {
        return cadastroTreino.buscarTreinoPorId(id);
    }

    @Override
    public void deletarTreinoPorId(Long id) throws TreinoNaoEncontradoException {
        cadastroTreino.deletarTreinoPorId(id);
    }

    // ================= EXERCICIO =================
    @Override
    public Exercicio salvarExercicio(Exercicio entity) {
        return cadastroExercicio.salvarExercicio(entity);
    }

    @Override
    public List<Exercicio> listarExercicios() {
        return cadastroExercicio.listarExercicios();
    }

    @Override
    public boolean verificarExistenciaExercicioId(Long id) {
        return cadastroExercicio.verificarExistenciaExercicioId(id);
    }

    @Override
    public Exercicio buscarExercicioPorId(Long id) throws ExercicioNaoEncontradoException {
        return cadastroExercicio.buscarExercicioPorId(id);
    }

    @Override
    public void deletarExercicioPorId(Long id) throws ExercicioNaoEncontradoException {
        cadastroExercicio.deletarExercicioPorId(id);
    }

    // ================= TIPO EXERCICIO =================
    @Override
    public TipoExercicio salvarTipoExercicio(TipoExercicio entity) {
        return cadastroTipoExercicio.salvarTipoExercicio(entity);
    }

    @Override
    public List<TipoExercicio> listarTiposExercicio() {
        return cadastroTipoExercicio.listarTiposExercicio();
    }

    @Override
    public boolean verificarExistenciaTipoExercicioId(Long id) {
        return cadastroTipoExercicio.verificarExistenciaTipoExercicioId(id);
    }

    @Override
    public TipoExercicio buscarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException {
        return cadastroTipoExercicio.buscarTipoExercicioPorId(id);
    }

    @Override
    public void deletarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException {
        cadastroTipoExercicio.deletarTipoExercicioPorId(id);
    }

    // ================= ALUNO =================
    @Override
    public Aluno salvarAluno(Aluno entity) throws AlunoDuplicadoException {
        return cadastroAluno.salvarAluno(entity);
    }

    @Override
    public List<Aluno> listarAlunos() {
        return cadastroAluno.listarAlunos();
    }

    @Override
    public Aluno procurarAlunoPorCpf(String cpf) throws AlunoNaoEncontradoException {
        return cadastroAluno.procurarAlunoPorCpf(cpf);
    }

    @Override
    public void removerAluno(Long id) throws AlunoNaoEncontradoException {
        cadastroAluno.removerAluno(id);
    }

    // ================= INSTRUTOR =================
    @Override
    public Instrutor salvarInstrutor(Instrutor entity) {
        return cadastroInstrutor.salvarInstrutor(entity);
    }

    @Override
    public List<Instrutor> listarInstrutores() {
        return cadastroInstrutor.listarInstrutores();
    }

    @Override
    public Instrutor procurarInstrutorPorCpf(String cpf) throws InstrutorNaoEncontradoException {
        return cadastroInstrutor.procurarInstrutorPorCpf(cpf);
    }

    @Override
    public void removerInstrutor(Long id) throws InstrutorNaoEncontradoException {
        cadastroInstrutor.removerInstrutor(id);
    }

    // ================= PLANO (Lennarth) =================
    @Override
    public Plano salvarPlano(Plano entity) {
        return cadastroPlano.salvarPlano(entity);
    }

    @Override
    public List<Plano> listarPlanos() {
        return cadastroPlano.listarPlanos();
    }

    @Override
    public boolean verificarExistenciaPlanoId(Long id) {
        return cadastroPlano.verificarExistenciaPlanoId(id);
    }

    @Override
    public Plano buscarPlanoPorId(Long id) throws PlanoNaoEncontradoException {
        return cadastroPlano.buscarPlanoPorId(id);
    }

    @Override
    public void deletarPlanoPorId(Long id) throws PlanoNaoEncontradoException {
        cadastroPlano.deletarPlanoPorId(id);
    }

    // ================= PAGAMENTO (Lennarth) =================
    @Override
    public Pagamento salvarPagamento(Pagamento entity) throws PagamentoInvalidoException {
        return cadastroPagamento.salvarPagamento(entity);
    }

    @Override
    public List<Pagamento> listarPagamentos() {
        return cadastroPagamento.listarPagamentos();
    }

    @Override
    public boolean verificarExistenciaPagamentoId(Long id) {
        return cadastroPagamento.verificarExistenciaPagamentoId(id);
    }

    @Override
    public Pagamento buscarPagamentoPorId(Long id) throws PagamentoInvalidoException {
        return cadastroPagamento.buscarPagamentoPorId(id);
    }

    @Override
    public void deletarPagamentoPorId(Long id) throws PagamentoInvalidoException {
        cadastroPagamento.deletarPagamentoPorId(id);
    }

    // ================= REGRAS COMPOSTAS =================
    @Override
    public void adicionarExercicioAoTreino(Long treinoId, Long exercicioId) 
            throws TreinoNaoEncontradoException, ExercicioNaoEncontradoException {
        Treino treino = cadastroTreino.buscarTreinoPorId(treinoId);
        Exercicio exercicio = cadastroExercicio.buscarExercicioPorId(exercicioId);
        
        treino.adicionarExercicio(exercicio);
        cadastroTreino.salvarTreino(treino);
    }

    @Override
    public void associarInstrutorAoTreino(Long treinoId, String instrutorCpf) 
            throws TreinoNaoEncontradoException, InstrutorNaoEncontradoException {
        Treino treino = cadastroTreino.buscarTreinoPorId(treinoId);
        Instrutor instrutor = cadastroInstrutor.procurarInstrutorPorCpf(instrutorCpf);
        
        treino.setInstrutor(instrutor);
        cadastroTreino.salvarTreino(treino);
    }
}