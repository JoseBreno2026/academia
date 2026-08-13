package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.ExercicioRepository;
import br.edu.ufape.poo.academia.dados.TipoExercicioRepository;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;

@Service
public class CadastroTipoExercicio implements InterfaceCadastroTipoExercicio {

    @Autowired
    private TipoExercicioRepository colecaoTipoExercicio;

    @Autowired
    private ExercicioRepository colecaoExercicio;

    public TipoExercicio salvarTipoExercicio(TipoExercicio entity) {
        return colecaoTipoExercicio.save(entity);
    }

    public List<TipoExercicio> listarTiposExercicio() {
        return colecaoTipoExercicio.findAll();
    }

    public boolean verificarExistenciaTipoExercicioId(Long id) {
        return colecaoTipoExercicio.existsById(id);
    }

    public TipoExercicio buscarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException {
        return colecaoTipoExercicio.findById(id)
                .orElseThrow(() -> new TipoExercicioNaoEncontradoException(id));
    }

    public void deletarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException {
        TipoExercicio tipoExercicio = buscarTipoExercicioPorId(id);

        // Desvincula o TipoExercicio de todos os Exercícios associados
        List<Exercicio> exerciciosComOTipo = colecaoExercicio.findAll().stream()
                .filter(e -> e.getTipoExercicio() != null && e.getTipoExercicio().getId().equals(id))
                .toList();

        for (Exercicio exercicio : exerciciosComOTipo) {
            exercicio.setTipoExercicio(null);
            colecaoExercicio.save(exercicio);
        }

        colecaoTipoExercicio.delete(tipoExercicio);
    }
}