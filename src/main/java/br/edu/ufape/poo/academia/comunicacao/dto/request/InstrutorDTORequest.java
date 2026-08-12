package br.edu.ufape.poo.academia.comunicacao.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record InstrutorDTORequest(
    @NotBlank(message = "O nome é obrigatório") String nome,
    @NotBlank(message = "O CPF é obrigatório") String cpf,
    @NotBlank(message = "O e-mail é obrigatório") @Email(message = "E-mail inválido") String email,
    @NotBlank(message = "O telefone é obrigatório") String telefone,
    @NotBlank(message = "O CREF é obrigatório") String cref,
    @NotBlank(message = "A especialidade é obrigatória") String especialidade,
    @Min(value = 0, message = "O salário deve ser positivo") double salario
) {}