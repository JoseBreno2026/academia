package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.dados.TipoExercicioRepository;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;

@Service
public class CadastroTipoExercicio {

    @Autowired
    private TipoExercicioRepository colecaoTipoExercicio;

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
        if (!colecaoTipoExercicio.existsById(id)) {
            throw new TipoExercicioNaoEncontradoException(id);
        }
        colecaoTipoExercicio.deleteById(id);
    }
}