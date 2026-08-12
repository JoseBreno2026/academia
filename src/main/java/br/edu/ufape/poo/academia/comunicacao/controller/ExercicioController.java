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

import br.edu.ufape.poo.academia.comunicacao.conversor.ExercicioConversor;
import br.edu.ufape.poo.academia.comunicacao.dto.request.ExercicioDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.ExercicioDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;
import br.edu.ufape.poo.academia.negocio.cadastro.ExercicioNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.cadastro.TipoExercicioNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.fachada.InterfaceFachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/exercicios")
public class ExercicioController {

    @Autowired
    private InterfaceFachada fachada;

    @Autowired
    private ExercicioConversor conversor;

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody ExercicioDTORequest dto) {
        try {
            Exercicio entity = conversor.convertToEntity(dto);
            if (dto.tipoExercicioId() != null) {
                TipoExercicio tipo = fachada.buscarTipoExercicioPorId(dto.tipoExercicioId());
                entity.setTipoExercicio(tipo);
            }
            Exercicio salva = fachada.salvarExercicio(entity);
            return ResponseEntity.status(HttpStatus.CREATED).body(conversor.convertToResponse(salva));
        } catch (TipoExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ExercicioDTOResponse>> listarTodos() {
        List<Exercicio> lista = fachada.listarExercicios();
        List<ExercicioDTOResponse> response = lista.stream()
                .map(conversor::convertToResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Exercicio entity = fachada.buscarExercicioPorId(id);
            return ResponseEntity.ok(conversor.convertToResponse(entity));
        } catch (ExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody ExercicioDTORequest dto) {
        try {
            // Busca o exercício existente (lança ExercicioNaoEncontradoException se não existir)
            fachada.buscarExercicioPorId(id);

            Exercicio entity = conversor.convertToEntity(dto);
            entity.setId(id);

            if (dto.tipoExercicioId() != null) {
                TipoExercicio tipo = fachada.buscarTipoExercicioPorId(dto.tipoExercicioId());
                entity.setTipoExercicio(tipo);
            }

            Exercicio atualizada = fachada.salvarExercicio(entity);
            return ResponseEntity.ok(conversor.convertToResponse(atualizada));
        } catch (ExercicioNaoEncontradoException | TipoExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            fachada.deletarExercicioPorId(id);
            return ResponseEntity.noContent().build();
        } catch (ExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}