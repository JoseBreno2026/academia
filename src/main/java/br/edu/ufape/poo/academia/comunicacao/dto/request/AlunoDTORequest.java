package br.edu.ufape.poo.academia.comunicacao.dto.request;

import java.time.LocalDate;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AlunoDTORequest(
    @NotBlank(message = "O nome é obrigatório") String nome,
    @NotBlank(message = "O CPF é obrigatório") String cpf,
    @NotBlank(message = "O e-mail é obrigatório") @Email(message = "E-mail inválido") String email,
    @NotBlank(message = "O telefone é obrigatório") String telefone,
    @NotBlank(message = "A matrícula é obrigatória") String matricula,
    @NotNull(message = "A data da matrícula é obrigatória") LocalDate dataMatricula,
    @NotBlank(message = "O status da matrícula é obrigatório") String statusMatricula
) {}