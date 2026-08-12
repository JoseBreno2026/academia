package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
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
        assertNotNull(exception.getMessage());
    }
}