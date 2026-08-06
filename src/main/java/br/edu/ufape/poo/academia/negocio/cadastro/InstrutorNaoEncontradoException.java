package br.edu.ufape.poo.academia.negocio.cadastro;

public class InstrutorNaoEncontradoException extends Exception{
	private static final long serialVersionUID = 1L;
    private String cpf;

    public InstrutorNaoEncontradoException(String cpf) {
        super("Não existe no sistema um instrutor com o CPF informado.");
        this.cpf = cpf;
    }

    public String getCpf() {
        return this.cpf;
    }
}
