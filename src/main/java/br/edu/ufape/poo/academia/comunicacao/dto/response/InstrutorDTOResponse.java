package br.edu.ufape.poo.academia.comunicacao.dto.response;

public record InstrutorDTOResponse(
    Long id,
    String nome,
    String cpf,
    String email,
    String telefone,
    String cref,
    String especialidade,
    double salario
) {}