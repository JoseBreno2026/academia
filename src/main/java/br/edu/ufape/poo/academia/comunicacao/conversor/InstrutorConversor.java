package br.edu.ufape.poo.academia.comunicacao.conversor;

import org.springframework.stereotype.Component;

import br.edu.ufape.poo.academia.comunicacao.dto.request.InstrutorDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.InstrutorDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;

@Component
public class InstrutorConversor {

    public Instrutor requestToEntity(InstrutorDTORequest dto) {
        Instrutor instrutor = new Instrutor(
            dto.nome(),
            dto.cpf(),
            dto.email(),
            dto.telefone(),
            dto.cref(),
            dto.especialidade(),
            dto.salario()
        );
        return instrutor;
    }

    public InstrutorDTOResponse entityToResponse(Instrutor instrutor) {
        return new InstrutorDTOResponse(
            instrutor.getId(),
            instrutor.getNome(),
            instrutor.getCpf(),
            instrutor.getEmail(),
            instrutor.getTelefone(),
            instrutor.getCref(),
            instrutor.getEspecialidade(),
            instrutor.getSalario()
        );
    }
}