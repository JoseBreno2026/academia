package br.edu.ufape.poo.academia.comunicacao.dto.response;

import java.time.LocalDate;

public record AlunoDTOResponse(
    Long id,
    String nome,
    String cpf,
    String email,
    String telefone,
    String matricula,
    LocalDate dataMatricula,
    String statusMatricula
) {}