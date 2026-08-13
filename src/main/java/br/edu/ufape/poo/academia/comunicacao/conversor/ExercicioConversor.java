package br.edu.ufape.poo.academia.comunicacao.conversor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.edu.ufape.poo.academia.comunicacao.dto.request.ExercicioDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.ExercicioDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;

@Component
public class ExercicioConversor {

    @Autowired
    private TipoExercicioConversor tipoExercicioConversor;

    public Exercicio requestToEntity(ExercicioDTORequest dto) {
        Exercicio exercicio = new Exercicio();
        exercicio.setSeries(dto.series());
        exercicio.setRepeticoes(dto.repeticoes());
        exercicio.setCarga(dto.carga());
        exercicio.setDescansoSegundos(dto.descansoSegundos());
        return exercicio;
    }

    public ExercicioDTOResponse entityToResponse(Exercicio entity) {
        return new ExercicioDTOResponse(
            entity.getId(),
            entity.getNome(),
            entity.getSeries(),
            entity.getRepeticoes(),
            entity.getCarga(),
            entity.getDescansoSegundos(),
            entity.getTipoExercicio() != null ? tipoExercicioConversor.entityToResponse(entity.getTipoExercicio()) : null
        );
    }
}