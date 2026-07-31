package br.edu.ufape.poo.academia.negocio.basico;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Aluno extends Pessoa {

    private String matricula;
    private LocalDate dataMatricula;
    private String statusMatricula;
    
    @OneToOne
    private Plano plano;

    @OneToMany
    private List<Treino> listaTreinos = new ArrayList<>();

    @OneToMany
    private List<Pagamento> listaPagamentos = new ArrayList<>();

    protected Aluno() {
        super();
    }

    public Aluno(String nome, String cpf, String email, String telefone,
                 String matricula, LocalDate dataMatricula, String statusMatricula) {

        super(nome, cpf, email, telefone);

        this.matricula = matricula;
        this.dataMatricula = dataMatricula;
        this.statusMatricula = statusMatricula;
    }

    public String getMatricula() {
        return matricula;
    }

    public LocalDate getDataMatricula() {
        return dataMatricula;
    }

    public String getStatusMatricula() {
        return statusMatricula;
    }

    public void setStatusMatricula(String statusMatricula) {
        this.statusMatricula = statusMatricula;
    }

    public List<Treino> getListaTreinos() {
        return listaTreinos;
    }

    public List<Pagamento> getListaPagamentos() {
        return listaPagamentos;
    }
    
    public Plano getPlano() {
        return plano;
    }
    
    public void vincularPlano(Plano plano) {
        this.plano = plano;
    }
    
    public void adicionarTreino(Treino treino) {
        this.listaTreinos.add(treino);
    }

    public void adicionarPagamento(Pagamento pagamento) {
        this.listaPagamentos.add(pagamento);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(),
                matricula,
                dataMatricula,
                statusMatricula,
                plano);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;

        Aluno other = (Aluno) obj;

        return Objects.equals(matricula, other.matricula)
                && Objects.equals(dataMatricula, other.dataMatricula)
                && Objects.equals(statusMatricula, other.statusMatricula)
                && Objects.equals(plano, other.plano);
    }

}