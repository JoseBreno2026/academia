package br.edu.ufape.poo.academia.negocio.cadastro;

public class TreinoNaoEncontradoException extends Exception {
    private static final long serialVersionUID = 1L;
    private final Long id;

    public TreinoNaoEncontradoException(Long id) {
        super("Não existe no sistema um treino com o ID: " + id);
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }
}