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

import br.edu.ufape.poo.academia.comunicacao.conversor.AlunoConversor;
import br.edu.ufape.poo.academia.comunicacao.dto.request.AlunoDTORequest;
import br.edu.ufape.poo.academia.comunicacao.dto.response.AlunoDTOResponse;
import br.edu.ufape.poo.academia.negocio.basico.Aluno;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoDuplicadoException;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoNaoEncontradoException;
import br.edu.ufape.poo.academia.negocio.fachada.InterfaceFachada;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private InterfaceFachada fachada;

    @Autowired
    private AlunoConversor conversor;

    @GetMapping("/{cpf}")
    public ResponseEntity<?> buscarAlunoCpf(@PathVariable String cpf) {
        try {
            Aluno a = fachada.procurarAlunoPorCpf(cpf);
            AlunoDTOResponse saida = conversor.entityToResponse(a);
            return ResponseEntity.ok(saida);
        } catch (AlunoNaoEncontradoException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> buscarAlunoPorId(@PathVariable Long id) {
        try {
            Aluno a = fachada.procurarAlunoPorId(id);
            AlunoDTOResponse saida = conversor.entityToResponse(a);
            return ResponseEntity.ok(saida);
        } catch (AlunoNaoEncontradoException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/")
    public List<AlunoDTOResponse> listarAlunos() {
        return fachada.listarAlunos()
                .stream().map(conversor::entityToResponse).toList();
    }

    @PostMapping("/")
    public ResponseEntity<?> cadastrarAluno(@RequestBody @Valid AlunoDTORequest alunoRequest) {
        Aluno novo = conversor.requestToEntity(alunoRequest);
        try {
            Aluno salvo = fachada.salvarAluno(novo);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(conversor.entityToResponse(salvo));
        } catch (AlunoDuplicadoException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarAluno(@PathVariable Long id, @RequestBody @Valid AlunoDTORequest alunoRequest) {
        try {
            Aluno existente = fachada.procurarAlunoPorId(id);
            conversor.updateEntityFromRequest(alunoRequest, existente);
            Aluno atualizado = fachada.salvarAluno(existente);
            return ResponseEntity.ok(conversor.entityToResponse(atualizado));
        } catch (AlunoNaoEncontradoException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (AlunoDuplicadoException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerAluno(@PathVariable Long id) {
        try {
            fachada.removerAluno(id);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Aluno removido com sucesso");
        } catch (AlunoNaoEncontradoException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}