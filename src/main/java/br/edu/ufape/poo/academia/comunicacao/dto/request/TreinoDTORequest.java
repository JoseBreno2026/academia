package br.edu.ufape.poo.academia.comunicacao.dto.request;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TreinoDTORequest(
    @NotBlank(message = "O nome do treino é obrigatório")
    String nomeTreino,

    LocalDate dataFim,

    @NotNull(message = "O status do treino é obrigatório")
    Boolean ativo,

    List<Long> exerciciosIds,

    Long instrutorId
) {}