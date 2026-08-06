package br.edu.ufape.poo.academia.negocio.cadastro;

public class AlunoDuplicadoException extends Exception{
	private static final long serialVersionUID = 1L;
    private String cpf;

    public AlunoDuplicadoException(String cpf) {
        super("Já existe um aluno cadastrado com este CPF.");
        this.cpf = cpf;
    }

    public String getCpf() {
        return this.cpf;
    }
}