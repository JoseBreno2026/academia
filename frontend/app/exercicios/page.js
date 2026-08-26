import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import { getExercicios, criarExercicio } from '@/app/actions/exercicios';
import { getTiposExercicios } from '@/app/actions/tiposExercicios';

export default async function ExerciciosPage() {
  const [exercicios, tiposExercicios] = await Promise.all([
    getExercicios().then((res) => res || []),
    getTiposExercicios().then((res) => res || []),
  ]);

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            EXERCÍCIOS CONFIGURADOS
          </h1>
          <p className="text-sm text-gray-400">
            Gerenciamento de exercícios, prescrevendo séries, cargas e descansos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LISTA DE EXERCÍCIOS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase mb-4">
              EXERCÍCIOS CADASTRADOS
            </h2>

            {exercicios.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-xs">
                Nenhum exercício cadastrado até o momento.
              </div>
            ) : (
              <div className="space-y-3">
                {exercicios.map((ex) => (
                  <div
                    key={ex.id}
                    className="border border-gray-800/80 bg-[#0b0e14] rounded-xl p-4 transition hover:border-gray-700 flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-500">#{ex.id}</span>
                        <h3 className="text-sm font-extrabold text-white tracking-wide">
                          {ex.tipoExercicio?.nome || ex.nome || 'Exercício sem nome'}
                        </h3>
                        {ex.tipoExercicio?.grupoMuscular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {ex.tipoExercicio.grupoMuscular}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-gray-400 font-mono flex gap-3">
                        <span>
                          <strong className="text-gray-200">{ex.series}</strong>x
                          <strong className="text-gray-200">{ex.repeticoes}</strong> reps
                        </span>
                        <span>•</span>
                        <span>
                          <strong className="text-gray-200">{ex.carga}</strong> kg
                        </span>
                        <span>•</span>
                        <span>
                          <strong className="text-gray-200">{ex.descansoSegundos}</strong>s descanso
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/exercicios/${ex.id}/editar`}
                        className="p-1 hover:text-[#a3e635] text-gray-400 transition text-xs"
                        title="Editar"
                      >
                        ✏️
                      </Link>
                      <BotaoExcluir endpoint="exercicios" id={ex.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FORMULÁRIO NOVO EXERCÍCIO */}
        <div>
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase">
              NOVO EXERCÍCIO
            </h2>

            <form action={criarExercicio} className="space-y-3">
              {/* TIPO DE EXERCÍCIO */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  TIPO DE EXERCÍCIO
                </label>
                <select
                  name="tipoExercicioId"
                  required
                  defaultValue=""
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                >
                  <option value="" disabled>
                    Selecione um tipo...
                  </option>
                  {tiposExercicios.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome} ({t.grupoMuscular})
                    </option>
                  ))}
                </select>
              </div>

              {/* SÉRIES E REPETIÇÕES */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    SÉRIES
                  </label>
                  <input
                    name="series"
                    type="number"
                    min="1"
                    required
                    placeholder="Ex: 4"
                    className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    REPETIÇÕES
                  </label>
                  <input
                    name="repeticoes"
                    type="number"
                    min="1"
                    required
                    placeholder="Ex: 12"
                    className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
              </div>

              {/* CARGA E DESCANSO */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    CARGA (KG)
                  </label>
                  <input
                    name="carga"
                    type="number"
                    step="0.5"
                    min="0"
                    required
                    placeholder="Ex: 20"
                    className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    DESCANSO (SEG)
                  </label>
                  <input
                    name="descansoSegundos"
                    type="number"
                    min="0"
                    required
                    placeholder="Ex: 60"
                    className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
              >
                Cadastrar Exercício
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}