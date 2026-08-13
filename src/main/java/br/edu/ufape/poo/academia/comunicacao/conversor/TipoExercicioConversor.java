package br.edu.ufape.poo.academia.comunicacao.conversor;

import org.springframework.stereotype.Component;

import br.edu.ufape.poo.academia.comunicacao.dto.request.TipoExercicioDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.TipoExercicioDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;

@Component
public class TipoExercicioConversor {

    public TipoExercicio requestToEntity(TipoExercicioDTORequest dto) {
        TipoExercicio tipo = new TipoExercicio();
        tipo.setNome(dto.nome());
        tipo.setGrupoMuscular(dto.grupoMuscular());
        return tipo;
    }

    public TipoExercicioDTOResponse entityToResponse(TipoExercicio entity) {
        return new TipoExercicioDTOResponse(
            entity.getId(),
            entity.getNome(),
            entity.getGrupoMuscular()
        );
    }
}