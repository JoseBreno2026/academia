package br.edu.ufape.poo.academia.comunicacao.conversor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.edu.ufape.poo.academia.comunicacao.dto.request.TreinoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.ExercicioDTOResponse;
import br.edu.ufape.poo.academia.comunicacao.dto.response.TreinoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Treino;

@Component
public class TreinoConversor {

    @Autowired
    private ExercicioConversor exercicioConversor;

    public Treino requestToEntity(TreinoDTORequest request) {
        Treino entity = new Treino();
        entity.setNomeTreino(request.nomeTreino());
        entity.setDataFim(request.dataFim());
        if (request.ativo() != null) {
            entity.setAtivo(request.ativo());
        }
        return entity;
    }

    public TreinoDTOResponse entityToResponse(Treino entity) {
        if (entity == null) {
            return null;
        }

        List<ExercicioDTOResponse> exerciciosResponse = new ArrayList<>();
        if (entity.getListaExercicios() != null) {
            exerciciosResponse = entity.getListaExercicios().stream()
                    .map(exercicioConversor::entityToResponse) // Ajustado aqui
                    .toList();
        }

        return new TreinoDTOResponse(
            entity.getId(),
            entity.getNomeTreino(),
            entity.getDataCriacao(),
            entity.getDataFim(),
            entity.isAtivo(),
            exerciciosResponse
        );
    }
}