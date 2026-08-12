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
import br.edu.ufape.poo.academia.negocio.fachada.Fachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/exercicios")
public class ExercicioController {

    @Autowired
    private Fachada fachada;

    @Autowired
    private ExercicioConversor conversor;

    @PostMapping
    public ResponseEntity<ExercicioDTOResponse> cadastrar(@Valid @RequestBody ExercicioDTORequest dto) throws TipoExercicioNaoEncontradoException {
        Exercicio entity = conversor.convertToEntity(dto);
        if (dto.tipoExercicioId() != null) {
            TipoExercicio tipo = fachada.buscarTipoExercicioPorId(dto.tipoExercicioId());
            entity.setTipoExercicio(tipo);
        }
        Exercicio salva = fachada.salvarExercicio(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(conversor.convertToResponse(salva));
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
    public ResponseEntity<ExercicioDTOResponse> buscarPorId(@PathVariable Long id) throws ExercicioNaoEncontradoException {
        Exercicio entity = fachada.buscarExercicioPorId(id);
        return ResponseEntity.ok(conversor.convertToResponse(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExercicioDTOResponse> atualizar(@PathVariable Long id, @Valid @RequestBody ExercicioDTORequest dto) throws ExercicioNaoEncontradoException, TipoExercicioNaoEncontradoException {
        fachada.buscarExercicioPorId(id); // Garante a existência
        Exercicio entity = conversor.convertToEntity(dto);
        entity.setId(id);
        if (dto.tipoExercicioId() != null) {
            TipoExercicio tipo = fachada.buscarTipoExercicioPorId(dto.tipoExercicioId());
            entity.setTipoExercicio(tipo);
        }
        Exercicio atualizada = fachada.salvarExercicio(entity);
        return ResponseEntity.ok(conversor.convertToResponse(atualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) throws ExercicioNaoEncontradoException {
        fachada.deletarExercicioPorId(id);
        return ResponseEntity.noContent().build();
    }
}