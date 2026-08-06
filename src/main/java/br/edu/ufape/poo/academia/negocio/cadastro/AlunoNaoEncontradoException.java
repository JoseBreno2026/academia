package br.edu.ufape.poo.academia.negocio.cadastro;

public class AlunoNaoEncontradoException extends Exception {
    private static final long serialVersionUID = 1L;
    private String cpf;

    public AlunoNaoEncontradoException(String cpf) {
        super("Não existe no sistema um aluno com o CPF informado.");
        this.cpf = cpf;
    }

    public String getCpf() {
        return this.cpf;
    }
}