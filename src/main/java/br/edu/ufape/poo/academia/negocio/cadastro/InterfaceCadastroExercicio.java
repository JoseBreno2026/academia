package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Exercicio;

public interface InterfaceCadastroExercicio {
    Exercicio salvarExercicio(Exercicio entity);
    List<Exercicio> listarExercicios();
    boolean verificarExistenciaExercicioId(Long id);
    Exercicio buscarExercicioPorId(Long id) throws ExercicioNaoEncontradoException;
    void deletarExercicioPorId(Long id) throws ExercicioNaoEncontradoException;
}