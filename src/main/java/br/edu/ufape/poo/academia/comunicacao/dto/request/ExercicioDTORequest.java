package br.edu.ufape.poo.academia.comunicacao.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ExercicioDTORequest(
    @NotNull(message = "O número de séries é obrigatório")
    @Positive(message = "O número de séries deve ser positivo")
    Integer series,

    @NotNull(message = "O número de repetições é obrigatório")
    @Positive(message = "O número de repetições deve ser positivo")
    Integer repeticoes,

    @NotNull(message = "A carga é obrigatória")
    @Positive(message = "A carga deve ser positiva")
    Double carga,

    @NotNull(message = "O tempo de descanso é obrigatório")
    @Positive(message = "O tempo de descanso deve ser positivo")
    Integer descansoSegundos,

    @NotNull(message = "O ID do tipo de exercício é obrigatório")
    Long tipoExercicioId
) {}