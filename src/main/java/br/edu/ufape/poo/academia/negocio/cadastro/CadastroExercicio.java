package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.ExercicioRepository;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;

@Service
public class CadastroExercicio implements InterfaceCadastroExercicio {

    @Autowired
    private ExercicioRepository colecaoExercicio;

    public Exercicio salvarExercicio(Exercicio entity) {
        return colecaoExercicio.save(entity);
    }

    public List<Exercicio> listarExercicios() {
        return colecaoExercicio.findAll();
    }

    public boolean verificarExistenciaExercicioId(Long id) {
        return colecaoExercicio.existsById(id);
    }

    public Exercicio buscarExercicioPorId(Long id) throws ExercicioNaoEncontradoException {
        return colecaoExercicio.findById(id)
                .orElseThrow(() -> new ExercicioNaoEncontradoException(id));
    }

    public void deletarExercicioPorId(Long id) throws ExercicioNaoEncontradoException {
        if (!colecaoExercicio.existsById(id)) {
            throw new ExercicioNaoEncontradoException(id);
        }
        colecaoExercicio.deleteById(id);
    }
}