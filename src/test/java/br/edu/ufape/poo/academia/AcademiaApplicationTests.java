package br.edu.ufape.poo.academia;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
    void testarFluxoCompletoEPersistenciaRelacionamentos() {
        // 1. Criar e salvar um Plano (usando nomePlano e preco do Diagrama)
        Plano plano = new Plano("Plano Mensal VIP", 120.0, "Musculação");
        plano = planoRepository.save(plano);

        // 2. Criar e salvar um Instrutor (usando o construtor completo de Instrutor + Pessoa)
        Instrutor instrutor = new Instrutor(
            "Carlos Silva", "111.222.333-44", "carlos@fit.com", "87988887777",
            "CREF-12345", "Musculação", 2500.0
        );
        instrutor = instrutorRepository.save(instrutor);

        // 3. Criar e salvar TipoExercicio (O exercício será salvo em cascata pelo Treino)
        TipoExercicio tipoPeito = new TipoExercicio("Musculação - Peitoral", "Peito");
        tipoPeito = tipoExercicioRepository.save(tipoPeito);

        Exercicio supino = new Exercicio(4, 12, 30.0, 60, tipoPeito);
        // *Removido o exercicioRepository.save(supino)* pois o CascadeType.PERSIST do Treino fará isso.

        // 4. Criar e salvar um Treino montado pelo Instrutor
        Treino treinoA = new Treino("Treino A - Peito e Tríceps", LocalDate.now(), LocalDate.now().plusMonths(3), true);
        treinoA.setInstrutor(instrutor);
        treinoA.adicionarExercicio(supino);

        // Salva o treino e persiste o exercício em cascata
        treinoA = treinoRepository.save(treinoA);

        // 5. Criar e salvar um Aluno vinculado ao Plano e ao Treino
        Aluno aluno = new Aluno(
            "José Breno", "123.456.789-00", "breno@email.com", "87999999999", 
            "20261001", LocalDate.now(), "Ativa"
        );
        aluno.vincularPlano(plano);
        aluno.adicionarTreino(treinoA);

        // 6. Criar e adicionar um Pagamento ao Aluno
        Pagamento pagamento = new Pagamento(LocalDate.now(), 120.0, LocalDate.now().plusMonths(1), "PAGO");
        aluno.adicionarPagamento(pagamento);

        // Salva o Aluno no banco
        Aluno alunoSalvo = alunoRepository.save(aluno);

        // --- VALIDAÇÕES DE PERSISTÊNCIA ---
        
        // Verifica se o Aluno foi salvo com ID gerado
        assertNotNull(alunoSalvo.getId());

        // Busca o Aluno salvo no banco de dados para garantir recuperação
        Optional<Aluno> alunoBuscado = alunoRepository.findById(alunoSalvo.getId());
        assertTrue(alunoBuscado.isPresent());

        // Valida se os relacionamentos persistem corretamente
        Aluno a = alunoBuscado.get();
        assertEquals("Plano Mensal VIP", a.getPlano().getNomePlano());
        assertEquals(1, a.getListaTreinos().size());
        assertEquals("Carlos Silva", a.getListaTreinos().get(0).getInstrutor().getNome());
        assertEquals(1, a.getListaPagamentos().size());
    }
}