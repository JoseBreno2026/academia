package br.edu.ufape.poo.academia;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ufape.poo.academia.dados.AlunoRepository;
import br.edu.ufape.poo.academia.dados.ExercicioRepository;
import br.edu.ufape.poo.academia.dados.InstrutorRepository;
import br.edu.ufape.poo.academia.dados.PagamentoRepository;
import br.edu.ufape.poo.academia.dados.PlanoRepository;
import br.edu.ufape.poo.academia.dados.TipoExercicioRepository;
import br.edu.ufape.poo.academia.dados.TreinoRepository;
import br.edu.ufape.poo.academia.negocio.basico.Aluno;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;
import br.edu.ufape.poo.academia.negocio.basico.Plano;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;
import br.edu.ufape.poo.academia.negocio.basico.Treino;

@SpringBootTest
class AcademiaApplicationTests {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private InstrutorRepository instrutorRepository;

    @Autowired
    private PlanoRepository planoRepository;

    @Autowired
    private TipoExercicioRepository tipoExercicioRepository;

    @Autowired
    private ExercicioRepository exercicioRepository;

    @Autowired
    private TreinoRepository treinoRepository;

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @Test
    @Transactional
    @Rollback(false)
    void testarFluxoCompletoEPersistenciaRelacionamentos() {
        // --- 1. CONTAGENS INICIAIS (Antes de salvar) ---
        long qtdPlanosAntes = planoRepository.count();
        long qtdInstrutoresAntes = instrutorRepository.count();
        long qtdTiposAntes = tipoExercicioRepository.count();
        long qtdTreinosAntes = treinoRepository.count();
        long qtdAlunosAntes = alunoRepository.count();

        // --- 2. CRIAÇÃO E PERSISTÊNCIA DOS OBJETOS ---

        // Plano
        Plano plano = new Plano("Plano Mensal VIP", 120.0, "Musculação");
        plano = planoRepository.save(plano);

        // Instrutor
        Instrutor instrutor = new Instrutor(
            "Carlos Silva", "111.222.333-44", "carlos@fit.com", "87988887777",
            "CREF-12345", "Musculação", 2500.0
        );
        instrutor = instrutorRepository.save(instrutor);

        // TipoExercicio e Exercicio
        TipoExercicio tipoPeito = new TipoExercicio("Musculação - Peitoral", "Peito");
        tipoPeito = tipoExercicioRepository.save(tipoPeito);

        Exercicio supino = new Exercicio(4, 12, 30.0, 60, tipoPeito);

        // Treino com Exercicio em Cascata
        Treino treinoA = new Treino("Treino A - Peito e Tríceps", LocalDate.now(), LocalDate.now().plusMonths(3), true);
        treinoA.setInstrutor(instrutor);
        treinoA.adicionarExercicio(supino);
        treinoA = treinoRepository.save(treinoA);

        // Aluno com Plano, Treino e Pagamento
        Aluno aluno = new Aluno(
            "José Breno", "123.456.789-00", "breno@email.com", "87999999999", 
            "20261001", LocalDate.now(), "Ativa"
        );
        aluno.vincularPlano(plano);
        aluno.adicionarTreino(treinoA);

        Pagamento pagamento = new Pagamento(LocalDate.now(), 120.0, LocalDate.now().plusMonths(1), "PAGO");
        aluno.adicionarPagamento(pagamento);

        // Salva o Aluno
        Aluno alunoSalvo = alunoRepository.save(aluno);

        // --- 3. CONTAGENS FINAIS (Depois de salvar) ---
        long qtdPlanosDepois = planoRepository.count();
        long qtdInstrutoresDepois = instrutorRepository.count();
        long qtdTiposDepois = tipoExercicioRepository.count();
        long qtdTreinosDepois = treinoRepository.count();
        long qtdAlunosDepois = alunoRepository.count();

        // --- 4. VERIFICAÇÕES DE INCREMENTO (Estilo do Professor) ---
        assertEquals(qtdPlanosAntes + 1, qtdPlanosDepois);
        assertEquals(qtdInstrutoresAntes + 1, qtdInstrutoresDepois);
        assertEquals(qtdTiposAntes + 1, qtdTiposDepois);
        assertEquals(qtdTreinosAntes + 1, qtdTreinosDepois);
        assertEquals(qtdAlunosAntes + 1, qtdAlunosDepois);

        // --- 5. VALIDAÇÕES DE RECUPERAÇÃO E RELACIONAMENTOS ---
        assertNotNull(alunoSalvo.getId());

        Optional<Aluno> alunoBuscado = alunoRepository.findById(alunoSalvo.getId());
        assertTrue(alunoBuscado.isPresent());

        Aluno a = alunoBuscado.get();
        assertEquals("Plano Mensal VIP", a.getPlano().getNomePlano());
        assertEquals(1, a.getListaTreinos().size());
        assertEquals("Carlos Silva", a.getListaTreinos().get(0).getInstrutor().getNome());
        assertEquals(1, a.getListaPagamentos().size());
    }
}