package br.edu.ufape.poo.academia.negocio.cadastro;

public class PlanoNaoEncontradoException extends Exception {
    private static final long serialVersionUID = 1L;

    public PlanoNaoEncontradoException() {
        super("Plano não foi encontrado!");
    }
}