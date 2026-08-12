package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class CadastroTipoExercicioTest {

    @Autowired
    private InterfaceCadastroTipoExercicio cadastroTipoExercicio;

    @Test
    void testarBuscarTipoExercicioInexistenteLancaExcecao() {
        Long idInexistente = 999L;

        TipoExercicioNaoEncontradoException exception = assertThrows(
            TipoExercicioNaoEncontradoException.class,
            () -> {
                cadastroTipoExercicio.buscarTipoExercicioPorId(idInexistente);
            }
        );

        assertEquals(idInexistente, exception.getId());
        assertNotNull(exception.getMessage());
    }
}