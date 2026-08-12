package br.edu.ufape.poo.academia.comunicacao.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TipoExercicioDTORequest(
    @NotBlank(message = "O nome do tipo de exercício é obrigatório")
    String nome,

    @NotBlank(message = "O grupo muscular é obrigatório")
    String grupoMuscular
) {}