package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.edu.ufape.poo.academia.negocio.cadastro.InstrutorNaoEncontradoException;

@SpringBootTest
class CadastroInstrutorTest {

    @Autowired
    private InterfaceCadastroInstrutor cadastroInstrutor;

    @Test
    void testarProcurarInstrutorInexistente() {
        String cpfInexistente = "999.888.777-66";

        InstrutorNaoEncontradoException exception = assertThrows(InstrutorNaoEncontradoException.class, () -> {
            cadastroInstrutor.procurarInstrutorPorCpf(cpfInexistente);
        });

        assertEquals(cpfInexistente, exception.getCpf());
    }
}