package br.edu.ufape.poo.academia.negocio.basico;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Instrutor extends Pessoa {

    private String cref;
    private String especialidade;
    private double salario;

    @JsonIgnore
    @OneToMany(mappedBy = "instrutor")
    private List<Treino> listaTreinos = new ArrayList<>();

    public Instrutor() {
        super();
    }

    public Instrutor(String nome, String cpf, String email, String telefone,
                     String cref, String especialidade, double salario) {
        super(nome, cpf, email, telefone);
        this.cref = cref;
        this.especialidade = especialidade;
        this.salario = salario;
    }

    public String getCref() {
        return cref;
    }

    public void setCref(String cref) {
        this.cref = cref;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public List<Treino> getListaTreinos() {
        return listaTreinos;
    }

    public void criarTreino(Treino treino) {
        this.listaTreinos.add(treino);
        treino.setInstrutor(this);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), cref, especialidade, salario);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;

        Instrutor other = (Instrutor) obj;

        return Double.doubleToLongBits(salario) == Double.doubleToLongBits(other.salario)
                && Objects.equals(cref, other.cref)
                && Objects.equals(especialidade, other.especialidade);
    }
}