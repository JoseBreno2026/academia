package br.edu.ufape.poo.academia.negocio.cadastro;

import java.util.List;
import br.edu.ufape.poo.academia.negocio.basico.Plano;

public interface InterfaceCadastroPlano {
    Plano salvarPlano(Plano entity);
    List<Plano> listarPlanos();
    boolean verificarExistenciaPlanoId(Long id);
    Plano buscarPlanoPorId(Long id) throws PlanoNaoEncontradoException;
    void deletarPlanoPorId(Long id) throws PlanoNaoEncontradoException;
}