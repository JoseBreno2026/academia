package br.edu.ufape.poo.academia.negocio.fachada;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.ufape.poo.academia.negocio.basico.*;
import br.edu.ufape.poo.academia.negocio.cadastro.*;

@Service
public class Fachada implements InterfaceFachada {

    @Autowired
    private InterfaceCadastroTreino cadastroTreino;

    @Autowired
    private InterfaceCadastroExercicio cadastroExercicio;

    @Autowired
    private InterfaceCadastroTipoExercicio cadastroTipoExercicio;

    // ================= TREINO =================
    @Override
    public Treino salvarTreino(Treino entity) {
        return cadastroTreino.salvarTreino(entity);
    }

    @Override
    public List<Treino> listarTreinos() {
        return cadastroTreino.listarTreinos();
    }

    @Override
    public boolean verificarExistenciaTreinoId(Long id) {
        return cadastroTreino.verificarExistenciaTreinoId(id);
    }

    @Override
    public Treino buscarTreinoPorId(Long id) throws TreinoNaoEncontradoException {
        return cadastroTreino.buscarTreinoPorId(id);
    }

    @Override
    public void deletarTreinoPorId(Long id) throws TreinoNaoEncontradoException {
        cadastroTreino.deletarTreinoPorId(id);
    }

    // ================= EXERCICIO =================
    @Override
    public Exercicio salvarExercicio(Exercicio entity) {
        return cadastroExercicio.salvarExercicio(entity);
    }

    @Override
    public List<Exercicio> listarExercicios() {
        return cadastroExercicio.listarExercicios();
    }

    @Override
    public boolean verificarExistenciaExercicioId(Long id) {
        return cadastroExercicio.verificarExistenciaExercicioId(id);
    }

    @Override
    public Exercicio buscarExercicioPorId(Long id) throws ExercicioNaoEncontradoException {
        return cadastroExercicio.buscarExercicioPorId(id);
    }

    @Override
    public void deletarExercicioPorId(Long id) throws ExercicioNaoEncontradoException {
        cadastroExercicio.deletarExercicioPorId(id);
    }

    // ================= TIPO EXERCICIO =================
    @Override
    public TipoExercicio salvarTipoExercicio(TipoExercicio entity) {
        return cadastroTipoExercicio.salvarTipoExercicio(entity);
    }

    @Override
    public List<TipoExercicio> listarTiposExercicio() {
        return cadastroTipoExercicio.listarTiposExercicio();
    }

    @Override
    public boolean verificarExistenciaTipoExercicioId(Long id) {
        return cadastroTipoExercicio.verificarExistenciaTipoExercicioId(id);
    }

    @Override
    public TipoExercicio buscarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException {
        return cadastroTipoExercicio.buscarTipoExercicioPorId(id);
    }

    @Override
    public void deletarTipoExercicioPorId(Long id) throws TipoExercicioNaoEncontradoException {
        cadastroTipoExercicio.deletarTipoExercicioPorId(id);
    }
}