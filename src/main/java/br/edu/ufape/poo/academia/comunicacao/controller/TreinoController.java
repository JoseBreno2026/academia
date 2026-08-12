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
import br.edu.ufape.poo.academia.negocio.fachada.Fachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/treinos")
public class TreinoController {

    @Autowired
    private Fachada fachada;

    @Autowired
    private TreinoConversor conversor;

    @PostMapping
    public ResponseEntity<TreinoDTOResponse> cadastrar(@Valid @RequestBody TreinoDTORequest dto) throws TreinoNaoEncontradoException, ExercicioNaoEncontradoException {
        Treino entity = conversor.convertToEntity(dto);
        Treino salva = fachada.salvarTreino(entity);

        // Vincula a lista de exercícios se fornecida
        if (dto.exerciciosIds() != null) {
            for (Long exId : dto.exerciciosIds()) {
                fachada.adicionarExercicioAoTreino(salva.getId(), exId);
            }
        }

        Treino treinoAtualizado = fachada.buscarTreinoPorId(salva.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(conversor.convertToResponse(treinoAtualizado));
    }

    @GetMapping
    public ResponseEntity<List<TreinoDTOResponse>> listarTodos() {
        List<Treino> lista = fachada.listarTreinos();
        List<TreinoDTOResponse> response = lista.stream()
                .map(conversor::convertToResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreinoDTOResponse> buscarPorId(@PathVariable Long id) throws TreinoNaoEncontradoException {
        Treino entity = fachada.buscarTreinoPorId(id);
        return ResponseEntity.ok(conversor.convertToResponse(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreinoDTOResponse> atualizar(@PathVariable Long id, @Valid @RequestBody TreinoDTORequest dto) throws TreinoNaoEncontradoException, ExercicioNaoEncontradoException {
        fachada.buscarTreinoPorId(id); // Garante existência
        Treino entity = conversor.convertToEntity(dto);
        entity.setId(id);
        Treino salva = fachada.salvarTreino(entity);

        if (dto.exerciciosIds() != null) {
            for (Long exId : dto.exerciciosIds()) {
                fachada.adicionarExercicioAoTreino(salva.getId(), exId);
            }
        }

        Treino treinoAtualizado = fachada.buscarTreinoPorId(salva.getId());
        return ResponseEntity.ok(conversor.convertToResponse(treinoAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) throws TreinoNaoEncontradoException {
        fachada.deletarTreinoPorId(id);
        return ResponseEntity.noContent().build();
    }
}