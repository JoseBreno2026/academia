package br.edu.ufape.poo.academia.negocio.cadastro;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.edu.ufape.poo.academia.negocio.basico.Aluno;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoDuplicadoException;
import br.edu.ufape.poo.academia.negocio.cadastro.AlunoNaoEncontradoException;

@SpringBootTest
class CadastroAlunoTest {

    @Autowired
    private InterfaceCadastroAluno cadastroAluno;

    @Test
    void testarCadastroAlunoDuplicado() {
        String cpf = "111.222.333-44";
        
        // Criando dois alunos com o mesmo CPF
        Aluno a1 = new Aluno("João", cpf, "joao@email.com", "9999-9999", "MAT01", LocalDate.now(), "ATIVO");
        Aluno a2 = new Aluno("Maria", cpf, "maria@email.com", "8888-8888", "MAT02", LocalDate.now(), "ATIVO");

        AlunoDuplicadoException exception = assertThrows(AlunoDuplicadoException.class, () -> {
            cadastroAluno.salvarAluno(a1);
            cadastroAluno.salvarAluno(a2); // O segundo deve disparar a exceção
        });

        assertEquals(cpf, exception.getCpf());
        assertTrue(exception.getMessage().contains("Já existe um aluno"));
    }
    
    @Test
    void testarProcurarAlunoInexistente() {
        String cpfInexistente = "000.000.000-00";

        AlunoNaoEncontradoException exception = assertThrows(AlunoNaoEncontradoException.class, () -> {
            cadastroAluno.procurarAlunoPorCpf(cpfInexistente);
        });

        assertEquals(cpfInexistente, exception.getCpf());
    }
}