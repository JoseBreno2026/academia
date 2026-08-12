package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Aluno;

public interface InterfaceCadastroAluno {
    Aluno salvarAluno(Aluno aluno) throws AlunoDuplicadoException;
    Aluno procurarAlunoPorCpf(String cpf) throws AlunoNaoEncontradoException;
    Aluno procurarAlunoPorId(Long id) throws AlunoNaoEncontradoException;
    List<Aluno> listarAlunos();
    void removerAluno(Long id) throws AlunoNaoEncontradoException;
}