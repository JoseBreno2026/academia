package br.edu.ufape.poo.academia.comunicacao.dto.request;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PagamentoDTORequest(
    @NotNull(message = "A data de pagamento é obrigatória")
    LocalDate dataPagamento,

    @NotNull(message = "O valor pago é obrigatório")
    @Positive(message = "O valor deve ser maior que zero")
    Double valorPago,

    @NotNull(message = "A data de vencimento é obrigatória")
    LocalDate dataVencimento,

    @NotBlank(message = "O status é obrigatório")
    String status
) {}