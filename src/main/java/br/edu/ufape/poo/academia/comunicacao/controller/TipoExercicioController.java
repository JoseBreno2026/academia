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

import br.edu.ufape.poo.academia.comunicacao.conversor.TipoExercicioConversor;
import br.edu.ufape.poo.academia.comunicacao.dto.request.TipoExercicioDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.TipoExercicioDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;
import br.edu.ufape.poo.academia.negocio.cadastro.TipoExercicioNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.fachada.InterfaceFachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tipos-exercicios")
public class TipoExercicioController {

    @Autowired
    private InterfaceFachada fachada;

    @Autowired
    private TipoExercicioConversor conversor;

    @PostMapping
    public ResponseEntity<TipoExercicioDTOResponse> cadastrar(@Valid @RequestBody TipoExercicioDTORequest dto) {
        TipoExercicio entity = conversor.convertToEntity(dto);
        TipoExercicio salva = fachada.salvarTipoExercicio(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(conversor.convertToResponse(salva));
    }

    @GetMapping
    public ResponseEntity<List<TipoExercicioDTOResponse>> listarTodos() {
        List<TipoExercicio> lista = fachada.listarTiposExercicio();
        List<TipoExercicioDTOResponse> response = lista.stream()
                .map(conversor::convertToResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            TipoExercicio entity = fachada.buscarTipoExercicioPorId(id);
            return ResponseEntity.ok(conversor.convertToResponse(entity));
        } catch (TipoExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @Valid @RequestBody TipoExercicioDTORequest dto) {
        try {
            fachada.buscarTipoExercicioPorId(id);
            TipoExercicio entity = conversor.convertToEntity(dto);
            entity.setId(id);
            TipoExercicio atualizada = fachada.salvarTipoExercicio(entity);
            return ResponseEntity.ok(conversor.convertToResponse(atualizada));
        } catch (TipoExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            fachada.deletarTipoExercicioPorId(id);
            return ResponseEntity.noContent().build();
        } catch (TipoExercicioNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}