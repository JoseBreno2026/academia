package br.edu.ufape.poo.academia.negocio.fachada;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ufape.poo.academia.negocio.basico.Aluno;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;
import br.edu.ufape.poo.academia.negocio.basico.Plano;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;
import br.edu.ufape.poo.academia.negocio.basico.Treino;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoDuplicadoException;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.cadastro.ExercicioNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.cadastro.InstrutorNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.cadastro.PagamentoInvalidoException;
import br.edu.ufape.poo.academia.negocio.cadastro.PlanoNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.cadastro.TipoExercicioNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.cadastro.TreinoNaoEncontradoException;

@SpringBootTest
@Transactional
@Rollback(false)
class FachadaTest {

    @Autowired
    private InterfaceFachada fachada;

    private Treino treinoBase;
    private Exercicio exercicioBase;
    private TipoExercicio tipoExercicioBase;
    private Aluno alunoBase;
    private Instrutor instrutorBase;
    private Plano planoBase;
    private Pagamento pagamentoBase;

    @BeforeEach
    public void init() throws Exception {
        // Sufixo único baseado no tempo para evitar erros de Unique Constraint no CPF/E-mail
        String sufixo = String.valueOf(System.currentTimeMillis()).substring(7);

        // 1. TipoExercicio
        TipoExercicio tipo = new TipoExercicio();
        tipo.setNome("Musculação " + sufixo);
        tipo.setGrupoMuscular("Membros Superiores");
        this.tipoExercicioBase = fachada.salvarTipoExercicio(tipo);

        // 2. Exercicio (Associando o TipoExercicio já persistido no banco)
        Exercicio ex = new Exercicio(4, 12, 50.0, 60, this.tipoExercicioBase);
        this.exercicioBase = fachada.salvarExercicio(ex);

        // 3. Treino (Preenchendo atributos adicionais)
        Treino tr = new Treino();
        tr.setNomeTreino("Treino A");
        tr.setAtivo(true);
        tr.setDataCriacao(LocalDate.now());
        tr.setDataFim(LocalDate.now().plusMonths(3));
        this.treinoBase = fachada.salvarTreino(tr);

        // 4. Instrutor
        Instrutor inst = new Instrutor(
            "Carlos Silva", 
            "111222" + sufixo, 
            "carlos" + sufixo + "@email.com", 
            "87988887777", 
            "123456-G/PE", 
            "Musculação", 
            3000.0
        );
        this.instrutorBase = fachada.salvarInstrutor(inst);

        // 5. Aluno
        Aluno al = new Aluno(
            "João Pedro", 
            "555666" + sufixo, 
            "joao" + sufixo + "@email.com", 
            "87999998888", 
            "20261001", 
            LocalDate.now(), 
            "ATIVO"
        );
        this.alunoBase = fachada.salvarAluno(al);

        // 6. Plano (Preenchendo modalidade e preço)
        Plano pl = new Plano();
        pl.setNome("Plano Mensal");
        pl.setModalidade("Musculação + Crossfit");
        pl.setPreco(120.0);
        this.planoBase = fachada.salvarPlano(pl);

        // 7. Pagamento (Preenchendo datas e status)
        Pagamento pag = new Pagamento();
        pag.setValor(120.0);
        pag.setDataPagamento(LocalDate.now());
        pag.setDataVencimento(LocalDate.now().plusMonths(1));
        pag.setStatus("PAGO");
        this.pagamentoBase = fachada.salvarPagamento(pag);
    }

    // ================= 1. TESTES DE TREINO =================
    @Test
    void testTreinoOperacoesEException() throws TreinoNaoEncontradoException {
        assertNotNull(fachada.buscarTreinoPorId(treinoBase.getId()));
        assertTrue(fachada.verificarExistenciaTreinoId(treinoBase.getId()));

        List<Treino> lista = fachada.listarTreinos();
        assertFalse(lista.isEmpty());

        fachada.deletarTreinoPorId(treinoBase.getId());
        assertThrows(TreinoNaoEncontradoException.class, () -> {
            fachada.buscarTreinoPorId(treinoBase.getId());
        });
    }

    // ================= 2. TESTES DE EXERCICIO =================
    @Test
    void testExercicioOperacoesEException() throws ExercicioNaoEncontradoException {
        assertNotNull(fachada.buscarExercicioPorId(exercicioBase.getId()));
        assertTrue(fachada.verificarExistenciaExercicioId(exercicioBase.getId()));

        List<Exercicio> lista = fachada.listarExercicios();
        assertFalse(lista.isEmpty());

        fachada.deletarExercicioPorId(exercicioBase.getId());
        assertThrows(ExercicioNaoEncontradoException.class, () -> {
            fachada.buscarExercicioPorId(exercicioBase.getId());
        });
    }

    // ================= 3. TESTES DE TIPO EXERCICIO =================
    @Test
    void testTipoExercicioOperacoesEException() throws TipoExercicioNaoEncontradoException, ExercicioNaoEncontradoException {
        assertNotNull(fachada.buscarTipoExercicioPorId(tipoExercicioBase.getId()));
        assertTrue(fachada.verificarExistenciaTipoExercicioId(tipoExercicioBase.getId()));

        List<TipoExercicio> lista = fachada.listarTiposExercicio();
        assertFalse(lista.isEmpty());

        // 1. Apaga primeiro o exercício dependente criado no @BeforeEach
        if (this.exercicioBase != null && fachada.verificarExistenciaExercicioId(this.exercicioBase.getId())) {
            fachada.deletarExercicioPorId(this.exercicioBase.getId());
        }

        // 2. Agora o TipoExercicio pode ser deletado livremente sem violar a Foreign Key no banco
        fachada.deletarTipoExercicioPorId(tipoExercicioBase.getId());
        
        assertThrows(TipoExercicioNaoEncontradoException.class, () -> {
            fachada.buscarTipoExercicioPorId(tipoExercicioBase.getId());
        });
    }

    // ================= 4. TESTES DE ALUNO =================
    @Test
    void testAlunoOperacoesEExceptions() throws AlunoNaoEncontradoException {
        assertNotNull(fachada.procurarAlunoPorCpf(alunoBase.getCpf()));

        List<Aluno> lista = fachada.listarAlunos();
        assertFalse(lista.isEmpty());

        // Teste de Aluno Duplicado (Tentando cadastrar com o mesmo CPF do alunoBase)
        Aluno alunoDuplicado = new Aluno(
            "Outro João", 
            alunoBase.getCpf(), 
            "outro@email.com", 
            "87999997777", 
            "20261002", 
            LocalDate.now(), 
            "ATIVO"
        );
        assertThrows(AlunoDuplicadoException.class, () -> {
            fachada.salvarAluno(alunoDuplicado);
        });

        // Teste de Remoção e Aluno Não Encontrado
        fachada.removerAluno(alunoBase.getId());
        assertThrows(AlunoNaoEncontradoException.class, () -> {
            fachada.procurarAlunoPorCpf(alunoBase.getCpf());
        });
    }

    // ================= 5. TESTES DE INSTRUTOR =================
    @Test
    void testInstrutorOperacoesEException() throws InstrutorNaoEncontradoException {
        assertNotNull(fachada.procurarInstrutorPorCpf(instrutorBase.getCpf()));

        List<Instrutor> lista = fachada.listarInstrutores();
        assertFalse(lista.isEmpty());

        fachada.removerInstrutor(instrutorBase.getId());
        assertThrows(InstrutorNaoEncontradoException.class, () -> {
            fachada.procurarInstrutorPorCpf(instrutorBase.getCpf());
        });
    }

    // ================= 6. TESTES DE PLANO =================
    @Test
    void testPlanoOperacoesEException() throws PlanoNaoEncontradoException {
        assertNotNull(fachada.buscarPlanoPorId(planoBase.getId()));
        assertTrue(fachada.verificarExistenciaPlanoId(planoBase.getId()));

        List<Plano> lista = fachada.listarPlanos();
        assertFalse(lista.isEmpty());

        fachada.deletarPlanoPorId(planoBase.getId());
        assertThrows(PlanoNaoEncontradoException.class, () -> {
            fachada.buscarPlanoPorId(planoBase.getId());
        });
    }

    // ================= 7. TESTES DE PAGAMENTO =================
    @Test
    void testPagamentoOperacoesEException() throws PagamentoInvalidoException {
        assertNotNull(fachada.buscarPagamentoPorId(pagamentoBase.getId()));
        assertTrue(fachada.verificarExistenciaPagamentoId(pagamentoBase.getId()));

        List<Pagamento> lista = fachada.listarPagamentos();
        assertFalse(lista.isEmpty());

        // Teste de valor inválido
        Pagamento pagInvalido = new Pagamento();
        pagInvalido.setValor(0.0);
        assertThrows(PagamentoInvalidoException.class, () -> {
            fachada.salvarPagamento(pagInvalido);
        });

        fachada.deletarPagamentoPorId(pagamentoBase.getId());
        assertThrows(PagamentoInvalidoException.class, () -> {
            fachada.buscarPagamentoPorId(pagamentoBase.getId());
        });
    }

    // ================= 8. TESTES DAS REGRAS COMPOSTAS =================
    @Test
    void testAdicionarExercicioAoTreino() throws TreinoNaoEncontradoException, ExercicioNaoEncontradoException {
        fachada.adicionarExercicioAoTreino(treinoBase.getId(), exercicioBase.getId());
        Treino treinoAtualizado = fachada.buscarTreinoPorId(treinoBase.getId());
        assertEquals(1, treinoAtualizado.getListaExercicios().size());
    }

    @Test
    void testAssociarInstrutorAoTreino() throws TreinoNaoEncontradoException, InstrutorNaoEncontradoException {
        fachada.associarInstrutorAoTreino(treinoBase.getId(), instrutorBase.getCpf());
        Treino treinoAtualizado = fachada.buscarTreinoPorId(treinoBase.getId());
        assertNotNull(treinoAtualizado.getInstrutor());
        assertEquals(instrutorBase.getCpf(), treinoAtualizado.getInstrutor().getCpf());
    }
}