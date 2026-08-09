package br.edu.ufape.poo.academia.negocio.cadastro;

public class PagamentoInvalidoException extends Exception {
    private static final long serialVersionUID = 1L;

    public PagamentoInvalidoException(String mensagem) {
        super(mensagem);
    }
}