package br.edu.ufape.poo.academia.comunicacao.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PlanoDTORequest(
    @NotBlank(message = "O nome do plano é obrigatório")
    String nomePlano,
    
    @NotNull(message = "O preço é obrigatório")
    @Positive(message = "O preço deve ser maior que zero")
    Double preco,
    
    @NotBlank(message = "A modalidade é obrigatória")
    String modalidade
) {}