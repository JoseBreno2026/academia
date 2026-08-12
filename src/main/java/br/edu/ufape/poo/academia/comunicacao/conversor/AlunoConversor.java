package br.edu.ufape.poo.academia.comunicacao.conversor;

import org.springframework.stereotype.Component;

import br.edu.ufape.poo.academia.comunicacao.dto.request.AlunoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.AlunoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Aluno;

@Component
public class AlunoConversor {

    public Aluno requestToEntity(AlunoDTORequest dto) {
        Aluno aluno = new Aluno(
            dto.nome(),
            dto.cpf(),
            dto.email(),
            dto.telefone(),
            dto.matricula(),
            dto.dataMatricula(),
            dto.statusMatricula()
        );
        return aluno;
    }

    public AlunoDTOResponse entityToResponse(Aluno aluno) {
        return new AlunoDTOResponse(
            aluno.getId(),
            aluno.getNome(),
            aluno.getCpf(),
            aluno.getEmail(),
            aluno.getTelefone(),
            aluno.getMatricula(),
            aluno.getDataMatricula(),
            aluno.getStatusMatricula()
        );
    }
}