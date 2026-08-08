package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CadastroExercicioTest {

    @Autowired
    private InterfaceCadastroExercicio cadastroExercicio;

    @Test
    void testarBuscarExercicioInexistenteLancaExcecao() {
        Long idInexistente = 999L;

        ExercicioNaoEncontradoException exception = assertThrows(
            ExercicioNaoEncontradoException.class,
            () -> {
                cadastroExercicio.buscarExercicioPorId(idInexistente);
            }
        );

        assertEquals(idInexistente, exception.getId());
        assertTrue(exception.getMessage().contains("Não existe exercício com o ID"));
    }
}