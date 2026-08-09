package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CadastroPlanoTest {

    @Autowired
    private InterfaceCadastroPlano cadastroPlano;

    @Test
    void testarBuscarPlanoInexistenteLancaExcecao() {
        assertThrows(PlanoNaoEncontradoException.class, () -> {
            cadastroPlano.buscarPlanoPorId(9999L);
        });
    }
}