package br.edu.ufape.poo.academia.comunicacao.dto.response;

import java.time.LocalDate;
import java.util.List;

public record TreinoDTOResponse(
    Long id,
    String nomeTreino,
    LocalDate dataCriacao,
    LocalDate dataFim,
    boolean ativo,
    List<ExercicioDTOResponse> listaExercicios
) {}