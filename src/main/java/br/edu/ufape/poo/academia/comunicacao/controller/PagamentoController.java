package br.edu.ufape.poo.academia.comunicacao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ufape.poo.academia.comunicacao.conversor.PagamentoConversor;
import br.edu.ufape.poo.academia.comunicacao.dto.request.PagamentoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.PagamentoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Pagamento;
import br.edu.ufape.poo.academia.negocio.cadastro.PagamentoInvalidoException;
import br.edu.ufape.poo.academia.negocio.fachada.InterfaceFachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pagamentos")
public class PagamentoController {

    @Autowired
    private InterfaceFachada fachada;

    @Autowired
    private PagamentoConversor conversor;

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody PagamentoDTORequest dto) {
        try {
            Pagamento entity = conversor.convertToEntity(dto);
            Pagamento salvo = fachada.salvarPagamento(entity);
            return ResponseEntity.status(HttpStatus.CREATED).body(conversor.convertToResponse(salvo));
        } catch (PagamentoInvalidoException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<PagamentoDTOResponse>> listarTodos() {
        List<Pagamento> lista = fachada.listarPagamentos();
        List<PagamentoDTOResponse> response = lista.stream()
                .map(conversor::convertToResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Pagamento entity = fachada.buscarPagamentoPorId(id);
            return ResponseEntity.ok(conversor.convertToResponse(entity));
        } catch (PagamentoInvalidoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody PagamentoDTORequest dto) {
        try {
            Pagamento existente = fachada.buscarPagamentoPorId(id);
            existente.setDataPagamento(dto.dataPagamento());
            existente.setValorPago(dto.valorPago());
            existente.setDataVencimento(dto.dataVencimento());
            existente.setStatus(dto.status());

            Pagamento atualizado = fachada.salvarPagamento(existente);
            return ResponseEntity.ok(conversor.convertToResponse(atualizado));
        } catch (PagamentoInvalidoException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            fachada.deletarPagamentoPorId(id);
            return ResponseEntity.noContent().build();
        } catch (PagamentoInvalidoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}