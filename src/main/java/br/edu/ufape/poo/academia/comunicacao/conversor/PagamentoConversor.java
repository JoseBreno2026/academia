package br.edu.ufape.poo.academia.comunicacao.conversor;

import org.springframework.stereotype.Component;
import br.edu.ufape.poo.academia.comunicacao.dto.request.PagamentoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.PagamentoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;

@Component
public class PagamentoConversor {

    public Pagamento convertToEntity(PagamentoDTORequest dto) {
        Pagamento entity = new Pagamento();
        entity.setDataPagamento(dto.dataPagamento());
        entity.setValorPago(dto.valorPago());
        entity.setDataVencimento(dto.dataVencimento());
        entity.setStatus(dto.status());
        return entity;
    }

    public PagamentoDTOResponse convertToResponse(Pagamento entity) {
        return new PagamentoDTOResponse(
            entity.getId(),
            entity.getDataPagamento(),
            entity.getValorPago(),
            entity.getDataVencimento(),
            entity.getStatus()
        );
    }
}