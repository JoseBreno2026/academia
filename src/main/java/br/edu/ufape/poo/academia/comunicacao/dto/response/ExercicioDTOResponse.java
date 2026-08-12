package br.edu.ufape.poo.academia.comunicacao.dto.response;

public record ExercicioDTOResponse(
    Long id,
    String nome,
    Integer series,
    Integer repeticoes,
    Double carga,
    Integer descansoSegundos,
    TipoExercicioDTOResponse tipoExercicio
) {}