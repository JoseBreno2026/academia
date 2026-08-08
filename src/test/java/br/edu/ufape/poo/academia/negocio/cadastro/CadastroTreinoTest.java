package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import br.edu.ufape.poo.academia.negocio.basico.Treino;

@SpringBootTest
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
        assertTrue(exception.getMessage().contains("Não existe treino com o ID"));
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