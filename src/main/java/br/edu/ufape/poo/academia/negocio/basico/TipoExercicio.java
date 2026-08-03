package br.edu.ufape.poo.academia.negocio.basico;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TipoExercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String grupoMuscular;

    // Construtor vazio
    public TipoExercicio() {
        super();
    }

    // Construtor com parâmetros
    public TipoExercicio(String nome, String grupoMuscular) {
        this.nome = nome;
        this.grupoMuscular = grupoMuscular;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getGrupoMuscular() {
        return grupoMuscular;
    }

    public void setGrupoMuscular(String grupoMuscular) {
        this.grupoMuscular = grupoMuscular;
    }

    // HashCode - Equals
    @Override
    public int hashCode() {
        return Objects.hash(id, nome, grupoMuscular);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;

        TipoExercicio other = (TipoExercicio) obj;

        return Objects.equals(id, other.id) 
                && Objects.equals(nome, other.nome)
                && Objects.equals(grupoMuscular, other.grupoMuscular);
    }
}