package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Aluno;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoDuplicadoException;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoNaoEncontradoException;

public interface InterfaceCadastroAluno {
    Aluno salvarAluno(Aluno aluno) throws AlunoDuplicadoException;
    Aluno procurarAlunoPorCpf(String cpf) throws AlunoNaoEncontradoException;
    List<Aluno> listarAlunos();
    void removerAluno(Long id);
}