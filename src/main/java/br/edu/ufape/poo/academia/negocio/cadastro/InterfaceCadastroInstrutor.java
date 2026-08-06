package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;
import br.edu.ufape.poo.academia.negocio.cadastro.InstrutorNaoEncontradoException;

public interface InterfaceCadastroInstrutor {
    Instrutor salvarInstrutor(Instrutor instrutor);
    Instrutor procurarInstrutorPorCpf(String cpf) throws InstrutorNaoEncontradoException;
    List<Instrutor> listarInstrutores();
    void removerInstrutor(Long id);
}