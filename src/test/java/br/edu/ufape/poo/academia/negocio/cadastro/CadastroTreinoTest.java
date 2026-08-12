package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ufape.poo.academia.negocio.basico.Treino;

@SpringBootTest
@Transactional
class CadastroTreinoTest {

    @Autowired
    private InterfaceCadastroTreino cadastroTreino;

    @Test
    void testarBuscarTreinoInexistenteLancaExcecao() {
        Long idInexistente = 999L;

        TreinoNaoEncontradoException exception = assertThrows(
            TreinoNaoEncontradoException.class,
            () -> {
                cadastroTreino.buscarTreinoPorId(idInexistente);
            }
        );

        assertEquals(idInexistente, exception.getId());
        assertNotNull(exception.getMessage());
    }

    @Test
    void testarSalvarEBuscarTreino() throws TreinoNaoEncontradoException {
        Treino t = new Treino("Treino A - Peito", LocalDate.now(), LocalDate.now().plusMonths(1), true);
        Treino salvo = cadastroTreino.salvarTreino(t);

        assertNotNull(salvo.getId());
        Treino encontrado = cadastroTreino.buscarTreinoPorId(salvo.getId());
        assertEquals("Treino A - Peito", encontrado.getNomeTreino());
    }
}