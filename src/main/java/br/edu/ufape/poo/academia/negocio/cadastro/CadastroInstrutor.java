package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.InstrutorRepository;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;
import br.edu.ufape.poo.academia.negocio.cadastro.InstrutorNaoEncontradoException;

@Service
public class CadastroInstrutor implements InterfaceCadastroInstrutor {

    @Autowired
    private InstrutorRepository instrutorRepository;

    @Override
    public Instrutor salvarInstrutor(Instrutor instrutor) {
        return instrutorRepository.save(instrutor);
    }

    @Override
    public Instrutor procurarInstrutorPorCpf(String cpf) throws InstrutorNaoEncontradoException {
        Instrutor instrutor = instrutorRepository.findByCpf(cpf);
        if (instrutor == null) {
            throw new InstrutorNaoEncontradoException(cpf);
        }
        return instrutor;
    }

    @Override
    public List<Instrutor> listarInstrutores() {
        return instrutorRepository.findAll();
    }

    @Override
    public void removerInstrutor(Long id) {
        instrutorRepository.deleteById(id);
    }
} 