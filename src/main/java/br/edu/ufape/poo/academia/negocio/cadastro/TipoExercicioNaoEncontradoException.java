package br.edu.ufape.poo.academia.negocio.cadastro;

public class TipoExercicioNaoEncontradoException extends Exception {
    private static final long serialVersionUID = 1L;
    private final Long id;

    public TipoExercicioNaoEncontradoException(Long id) {
        super("Não existe no sistema um tipo de exercício com o ID: " + id);
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }
}