package br.edu.ufape.poo.academia.comunicacao.conversor;

import org.springframework.stereotype.Component;
import br.edu.ufape.poo.academia.comunicacao.dto.request.PlanoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.PlanoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Plano;

@Component
public class PlanoConversor {

    public Plano convertToEntity(PlanoDTORequest dto) {
        Plano entity = new Plano();
        entity.setNomePlano(dto.nomePlano());
        entity.setPreco(dto.preco());
        entity.setModalidade(dto.modalidade());
        return entity;
    }

    public PlanoDTOResponse convertToResponse(Plano entity) {
        return new PlanoDTOResponse(
            entity.getId(),
            entity.getNomePlano(),
            entity.getPreco(),
            entity.getModalidade()
        );
    }
}