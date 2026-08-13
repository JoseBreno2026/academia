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

import br.edu.ufape.poo.academia.comunicacao.conversor.TreinoConversor;
import br.edu.ufape.poo.academia.comunicacao.dto.request.TreinoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.TreinoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Treino;
import br.edu.ufape.poo.academia.negocio.cadastro.ExercicioNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.cadastro.TreinoNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.fachada.InterfaceFachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/treinos")
public class TreinoController {

    @Autowired
    private InterfaceFachada fachada;

    @Autowired
    private TreinoConversor conversor;

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody TreinoDTORequest dto) {
        try {
            Treino entity = conversor.requestToEntity(dto);
            Treino salva = fachada.salvarTreino(entity);

            if (dto.exerciciosIds() != null) {
                for (Long exId : dto.exerciciosIds()) {
                    fachada.adicionarExercicioAoTreino(salva.getId(), exId);
                }
            }

            Treino treinoAtualizado = fachada.buscarTreinoPorId(salva.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(conversor.entityToResponse(treinoAtualizado));
        } catch (TreinoNaoEncontradoException | ExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<TreinoDTOResponse>> listarTodos() {
        List<Treino> lista = fachada.listarTreinos();
        List<TreinoDTOResponse> response = lista.stream()
                .map(conversor::entityToResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Treino entity = fachada.buscarTreinoPorId(id);
            return ResponseEntity.ok(conversor.entityToResponse(entity));
        } catch (TreinoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody TreinoDTORequest dto) {
        try {
            Treino existente = fachada.buscarTreinoPorId(id);
            
            existente.setNomeTreino(dto.nomeTreino());
            existente.setDataFim(dto.dataFim());
            if (dto.ativo() != null) {
                existente.setAtivo(dto.ativo());
            }

            Treino atualizada = fachada.salvarTreino(existente);
            return ResponseEntity.ok(conversor.entityToResponse(atualizada));
        } catch (TreinoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            fachada.deletarTreinoPorId(id);
            return ResponseEntity.noContent().build();
        } catch (TreinoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}