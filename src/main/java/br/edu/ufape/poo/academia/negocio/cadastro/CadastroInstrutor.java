package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.InstrutorRepository;
import br.edu.ufape.poo.academia.negocio.basico.Instrutor;

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
    public Instrutor procurarInstrutorPorId(Long id) throws InstrutorNaoEncontradoException {
        return instrutorRepository.findById(id)
                .orElseThrow(() -> new InstrutorNaoEncontradoException(id.toString()));
    }

    @Override
    public List<Instrutor> listarInstrutores() {
        return instrutorRepository.findAll();
    }

    @Override
    public void removerInstrutor(Long id) throws InstrutorNaoEncontradoException {
        if (!instrutorRepository.existsById(id)) {
            throw new InstrutorNaoEncontradoException(id.toString());
        }
        instrutorRepository.deleteById(id);
    }
}