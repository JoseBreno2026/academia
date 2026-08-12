package br.edu.ufape.poo.academia.comunicacao.conversor;

import org.springframework.stereotype.Component;

import br.edu.ufape.poo.academia.comunicacao.dto.request.TipoExercicioDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.TipoExercicioDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;

@Component
public class TipoExercicioConversor {

    public TipoExercicio convertToEntity(TipoExercicioDTORequest request) {
        TipoExercicio entity = new TipoExercicio();
        entity.setNome(request.nome());
        entity.setGrupoMuscular(request.grupoMuscular());
        return entity;
    }

    public TipoExercicioDTOResponse convertToResponse(TipoExercicio entity) {
        if (entity == null) {
            return null;
        }
        return new TipoExercicioDTOResponse(
            entity.getId(),
            entity.getNome(),
            entity.getGrupoMuscular()
        );
    }
}