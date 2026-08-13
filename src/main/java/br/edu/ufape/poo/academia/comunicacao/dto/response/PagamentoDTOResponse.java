package br.edu.ufape.poo.academia.comunicacao.dto.response;

import java.time.LocalDate;

public record PagamentoDTOResponse(
    Long id,
    LocalDate dataPagamento,
    double valorPago,
    LocalDate dataVencimento,
    String status
) {}