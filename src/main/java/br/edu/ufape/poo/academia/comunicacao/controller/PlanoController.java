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

import br.edu.ufape.poo.academia.comunicacao.conversor.PlanoConversor;
import br.edu.ufape.poo.academia.comunicacao.dto.request.PlanoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.PlanoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Plano;
import br.edu.ufape.poo.academia.negocio.cadastro.PlanoNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.fachada.InterfaceFachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/planos")
public class PlanoController {

    @Autowired
    private InterfaceFachada fachada;

    @Autowired
    private PlanoConversor conversor;

    @PostMapping
    public ResponseEntity<PlanoDTOResponse> cadastrar(@Valid @RequestBody PlanoDTORequest dto) {
        Plano entity = conversor.convertToEntity(dto);
        Plano salvo = fachada.salvarPlano(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(conversor.convertToResponse(salvo));
    }

    @GetMapping
    public ResponseEntity<List<PlanoDTOResponse>> listarTodos() {
        List<Plano> lista = fachada.listarPlanos();
        List<PlanoDTOResponse> response = lista.stream()
                .map(conversor::convertToResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Plano entity = fachada.buscarPlanoPorId(id);
            return ResponseEntity.ok(conversor.convertToResponse(entity));
        } catch (PlanoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody PlanoDTORequest dto) {
        try {
            Plano existente = fachada.buscarPlanoPorId(id);
            existente.setNomePlano(dto.nomePlano());
            existente.setPreco(dto.preco());
            existente.setModalidade(dto.modalidade());
            
            Plano atualizado = fachada.salvarPlano(existente);
            return ResponseEntity.ok(conversor.convertToResponse(atualizado));
        } catch (PlanoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            fachada.deletarPlanoPorId(id);
            return ResponseEntity.noContent().build();
        } catch (PlanoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}