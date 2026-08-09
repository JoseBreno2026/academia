package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CadastroPagamentoTest {

    @Autowired
    private InterfaceCadastroPagamento cadastroPagamento;

    @Test
    void testarBuscarPagamentoInexistenteLancaExcecao() {
        assertThrows(PagamentoInvalidoException.class, () -> {
            cadastroPagamento.buscarPagamentoPorId(9999L);
        });
    }
}