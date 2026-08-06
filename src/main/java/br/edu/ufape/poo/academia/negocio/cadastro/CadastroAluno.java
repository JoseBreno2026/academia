package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.AlunoRepository;
import br.edu.ufape.poo.academia.negocio.basico.Aluno;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoDuplicadoException;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoNaoEncontradoException;

@Service
public class CadastroAluno implements InterfaceCadastroAluno {

    @Autowired
    private AlunoRepository alunoRepository;

    @Override
    public Aluno salvarAluno(Aluno aluno) throws AlunoDuplicadoException {
        if (alunoRepository.existsByCpf(aluno.getCpf())) {
            throw new AlunoDuplicadoException(aluno.getCpf());
        }
        return alunoRepository.save(aluno);
    }

    @Override
    public Aluno procurarAlunoPorCpf(String cpf) throws AlunoNaoEncontradoException {
        Aluno aluno = alunoRepository.findByCpf(cpf);
        if (aluno == null) {
            throw new AlunoNaoEncontradoException(cpf);
        }
        return aluno;
    }

    @Override
    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }
    
    @Override
    public void removerAluno(Long id) {
        alunoRepository.deleteById(id);
    }
}