package br.edu.ufape.poo.academia.comunicacao.dto.response;

public record TipoExercicioDTOResponse(
    Long id,
    String nome,
    String grupoMuscular
) {}