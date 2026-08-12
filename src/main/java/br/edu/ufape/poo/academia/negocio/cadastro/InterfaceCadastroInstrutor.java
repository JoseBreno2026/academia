package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;

public interface InterfaceCadastroInstrutor {
    Instrutor salvarInstrutor(Instrutor instrutor);
    Instrutor procurarInstrutorPorCpf(String cpf) throws InstrutorNaoEncontradoException;
    Instrutor procurarInstrutorPorId(Long id) throws InstrutorNaoEncontradoException;
    List<Instrutor> listarInstrutores();
    void removerInstrutor(Long id) throws InstrutorNaoEncontradoException;
}