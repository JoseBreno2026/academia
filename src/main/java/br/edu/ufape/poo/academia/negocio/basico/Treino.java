package br.edu.ufape.poo.academia.negocio.basico;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Treino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeTreino;
    private LocalDate dataCriacao;
    private LocalDate dataFim;
    private boolean ativo;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercicio> listaExercicios = new ArrayList<>();

    public Treino() {
    }

    public Treino(String nomeTreino, LocalDate dataCriacao, LocalDate dataFim, boolean ativo) {
        this.nomeTreino = nomeTreino;
        this.dataCriacao = dataCriacao;
        this.dataFim = dataFim;
        this.ativo = ativo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeTreino() {
        return nomeTreino;
    }

    public void setNomeTreino(String nomeTreino) {
        this.nomeTreino = nomeTreino;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public List<Exercicio> getListaExercicios() {
        return listaExercicios;
    }

    public void adicionarExercicio(Exercicio exercicio) {
        this.listaExercicios.add(exercicio);
    }
}