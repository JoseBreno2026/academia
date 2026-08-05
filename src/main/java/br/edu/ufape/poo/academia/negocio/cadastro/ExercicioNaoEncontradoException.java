package br.edu.ufape.poo.academia.negocio.cadastro;

public class ExercicioNaoEncontradoException extends Exception {
    private static final long serialVersionUID = 1L;
    private final Long id;

    public ExercicioNaoEncontradoException(Long id) {
        super("Não existe no sistema um exercício com o ID: " + id);
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }
}