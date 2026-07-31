package br.edu.ufape.poo.academia.negocio.basico;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.Objects;

@Entity
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int series;
    private int repeticoes;
    private double carga;
    private int descansoSegundos;

    @ManyToOne
    private TipoExercicio tipoExercicio;

    // Construtor vazio
    public Exercicio() {
    	super();
    }

    // Construtor com parâmetros
    public Exercicio(int series, int repeticoes, double carga, int descansoSegundos, TipoExercicio tipoExercicio) {
        this.series = series;
        this.repeticoes = repeticoes;
        this.carga = carga;
        this.descansoSegundos = descansoSegundos;
        this.tipoExercicio = tipoExercicio;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getSeries() {
        return series;
    }

    public void setSeries(int series) {
        this.series = series;
    }

    public int getRepeticoes() {
        return repeticoes;
    }

    public void setRepeticoes(int repeticoes) {
        this.repeticoes = repeticoes;
    }

    public double getCarga() {
        return carga;
    }

    public void setCarga(double carga) {
        this.carga = carga;
    }

    public int getDescansoSegundos() {
        return descansoSegundos;
    }

    public void setDescansoSegundos(int descansoSegundos) {
        this.descansoSegundos = descansoSegundos;
    }

    public TipoExercicio getTipoExercicio() {
        return tipoExercicio;
    }

    public void setTipoExercicio(TipoExercicio tipoExercicio) {
        this.tipoExercicio = tipoExercicio;
    }
    
 // HashCode - Equals
    @Override
    public int hashCode() {
        return Objects.hash(id, series, repeticoes, carga, descansoSegundos, tipoExercicio);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
            
        Exercicio other = (Exercicio) obj;
        
        return Objects.equals(id, other.id) 
                && series == other.series 
                && repeticoes == other.repeticoes 
                && Double.doubleToLongBits(carga) == Double.doubleToLongBits(other.carga) 
                && descansoSegundos == other.descansoSegundos 
                && Objects.equals(tipoExercicio, other.tipoExercicio);
    }
}