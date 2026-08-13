package br.edu.ufape.poo.academia.comunicacao.dto.response;

public record PlanoDTOResponse(
    Long id,
    String nomePlano,
    double preco,
    String modalidade
) {}