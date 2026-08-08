package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.TipoExercicio;

public interface InterfaceCadastroTipoExercicio {
    TipoExercicio salvarTipoExercicio(TipoExercicio entity);
    List<TipoExercicio> listarTiposExercicio();
    boolean verificarExistenciaTipoExercicioId(Long id);
    TipoExercicio buscarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException;
    void deletarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException;
}