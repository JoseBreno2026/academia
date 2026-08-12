package br.edu.ufape.poo.academia.comunicacao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ufape.poo.academia.comunicacao.conversor.InstrutorConversor;
import br.edu.ufape.poo.academia.comunicacao.dto.request.InstrutorDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.InstrutorDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;
import br.edu.ufape.poo.academia.negocio.cadastro.InstrutorNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.fachada.InterfaceFachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/instrutores")
public class InstrutorController {

    @Autowired
    private InterfaceFachada fachada;

    @Autowired
    private InstrutorConversor conversor;

    @GetMapping("/{cpf}")
    public ResponseEntity<?> buscarInstrutorCpf(@PathVariable String cpf) {
        try {
            Instrutor instrutor = fachada.procurarInstrutorPorCpf(cpf);
            InstrutorDTOResponse saida = conversor.entityToResponse(instrutor);
            return ResponseEntity.ok(saida);
        } catch (InstrutorNaoEncontradoException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/")
    public List<InstrutorDTOResponse> listarInstrutores() {
        return fachada.listarInstrutores()
                .stream().map(conversor::entityToResponse).toList();
    }

    @PostMapping("/")
    public ResponseEntity<?> cadastrarInstrutor(@RequestBody @Valid InstrutorDTORequest instrutorRequest) {
        Instrutor novo = conversor.requestToEntity(instrutorRequest);
        Instrutor salvo = fachada.salvarInstrutor(novo);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(conversor.entityToResponse(salvo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerInstrutor(@PathVariable Long id) {
        try {
            fachada.removerInstrutor(id);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Instrutor removido com sucesso");
        } catch (InstrutorNaoEncontradoException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}