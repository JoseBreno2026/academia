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

    public Exercicio convertToEntity(ExercicioDTORequest request) {
        Exercicio entity = new Exercicio();
        entity.setNome(request.nome());
        entity.setSeries(request.series());
        entity.setRepeticoes(request.repeticoes());
        entity.setCarga(request.carga());
        entity.setDescansoSegundos(request.descansoSegundos());
        return entity;
    }

    public ExercicioDTOResponse convertToResponse(Exercicio entity) {
        if (entity == null) {
            return null;
        }
        return new ExercicioDTOResponse(
            entity.getId(),
            entity.getNome(),
            entity.getSeries(),
            entity.getRepeticoes(),
            entity.getCarga(),
            entity.getDescansoSegundos(),
            tipoExercicioConversor.convertToResponse(entity.getTipoExercicio())
        );
    }
}