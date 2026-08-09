package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.PlanoRepository;
import br.edu.ufape.poo.academia.negocio.basico.Plano;

@Service
public class CadastroPlano implements InterfaceCadastroPlano {

    @Autowired
    private PlanoRepository colecaoPlano;

    @Override
    public Plano salvarPlano(Plano entity) {
        return colecaoPlano.save(entity);
    }

    @Override
    public List<Plano> listarPlanos() {
        return colecaoPlano.findAll();
    }

    @Override
    public boolean verificarExistenciaPlanoId(Long id) {
        return colecaoPlano.existsById(id);
    }

    @Override
    public Plano buscarPlanoPorId(Long id) throws PlanoNaoEncontradoException {
        return colecaoPlano.findById(id)
                .orElseThrow(() -> new PlanoNaoEncontradoException());
    }

    @Override
    public void deletarPlanoPorId(Long id) throws PlanoNaoEncontradoException {
        if (!colecaoPlano.existsById(id)) {
            throw new PlanoNaoEncontradoException();
        }
        colecaoPlano.deleteById(id);
    }
}