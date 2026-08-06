package br.edu.ufape.poo.academia.negocio.basico;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Aluno extends Pessoa {

    private String matricula;
    private LocalDate dataMatricula;
    private String statusMatricula;
    
    @ManyToOne
    private Plano plano;

    @OneToMany
    private List<Treino> listaTreinos = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pagamento> listaPagamentos = new ArrayList<>();	

    // Construtor vazio
    protected Aluno() {
        super();
    }

    // Construtor com parâmetros
    public Aluno(String nome, String cpf, String email, String telefone,
                 String matricula, LocalDate dataMatricula, String statusMatricula) {

        super(nome, cpf, email, telefone);

        this.matricula = matricula;
        this.dataMatricula = dataMatricula;
        this.statusMatricula = statusMatricula;
    }
    
    // Getters e Setters

    public String getMatricula() {
        return matricula;
    }

    // ADICIONADO: Faltava o setMatricula!
    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public LocalDate getDataMatricula() {
        return dataMatricula;
    }

    // ADICIONADO: Faltava o setDataMatricula!
    public void setDataMatricula(LocalDate dataMatricula) {
        this.dataMatricula = dataMatricula;
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
    
    // Métodos exclusivos
    
    public void vincularPlano(Plano plano) {
        this.plano = plano;
    }
    
    public void adicionarTreino(Treino treino) {
        this.listaTreinos.add(treino);
    }

    public void adicionarPagamento(Pagamento pagamento) {
        this.listaPagamentos.add(pagamento);
    }
    
    // HashCode - Equals
    
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