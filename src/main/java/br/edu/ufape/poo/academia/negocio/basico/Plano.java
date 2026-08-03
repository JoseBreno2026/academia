package br.edu.ufape.poo.academia.negocio.basico;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomePlano;
    private double preco;
    private String modalidade;

    public Plano() {
    }

    public Plano(String nomePlano, double preco, String modalidade) {
        this.nomePlano = nomePlano;
        this.preco = preco;
        this.modalidade = modalidade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getters e Setters do Diagrama UML
    public String getNomePlano() {
        return nomePlano;
    }

    public void setNomePlano(String nomePlano) {
        this.nomePlano = nomePlano;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

    // Aliases para compatibilidade com o Teste
    public String getNome() {
        return nomePlano;
    }

    public void setNome(String nome) {
        this.nomePlano = nome;
    }

    public double getValor() {
        return preco;
    }

    public void setValor(double valor) {
        this.preco = valor;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, modalidade, nomePlano, preco);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Plano other = (Plano) obj;
        return Objects.equals(id, other.id) 
                && Objects.equals(modalidade, other.modalidade)
                && Objects.equals(nomePlano, other.nomePlano)
                && Double.doubleToLongBits(preco) == Double.doubleToLongBits(other.preco);
    }
}