import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import { getTreinos, criarTreino } from '@/app/actions/treinos';
import { getExercicios } from '@/app/actions/exercicios';

// Helper para formatar data 'YYYY-MM-DD' sem bugs de timezone
function formatarDataSemTimezone(dataString) {
  if (!dataString) return '-';
  // Se vier no formato ISO completo (ex: 2026-08-26T00:00:00), pega apenas a parte da data
  const dataLimpa = dataString.split('T')[0];
  const partes = dataLimpa.split('-');
  if (partes.length !== 3) return dataString;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export default async function TreinosPage() {
  const [treinos, exercicios] = await Promise.all([
    getTreinos().then((res) => res || []),
    getExercicios().then((res) => res || []),
  ]);

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            FICHAS DE TREINO
          </h1>
          <p className="text-sm text-gray-400">
            Gerenciamento de treinos, prescrições e ficha de exercícios.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LISTA DE TREINOS CADASTRADOS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase mb-4">
              TREINOS CADASTRADOS
            </h2>

            {treinos.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-xs">
                Nenhum treino cadastrado até o momento.
              </div>
            ) : (
              <div className="space-y-4">
                {treinos.map((treino) => (
                  <div
                    key={treino.id}
                    className="border border-gray-800/80 bg-[#0b0e14] rounded-xl p-4 transition hover:border-gray-700"
                  >
                    {/* CABEÇALHO DO CARD */}
                    <div className="flex items-center justify-between pb-3 border-b border-gray-800/60 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-gray-500">#{treino.id}</span>
                        <h3 className="text-sm font-extrabold text-white tracking-wide">
                          {treino.nomeTreino}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            treino.ativo
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {treino.ativo ? 'ATIVO' : 'INATIVO'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/treinos/${treino.id}/editar`}
                          className="p-1 hover:text-[#a3e635] text-gray-400 transition text-xs"
                          title="Editar"
                        >
                          ✏️
                        </Link>
                        <BotaoExcluir endpoint="treinos" id={treino.id} />
                      </div>
                    </div>

                    {/* DATAS (Com renderização imune a UTC/Fuso) */}
                    <div className="flex gap-4 text-[11px] text-gray-400 font-mono mb-3">
                      <div>
                        <span className="text-gray-500">Criado em: </span>
                        {formatarDataSemTimezone(treino.dataCriacao)}
                      </div>
                      <div>
                        <span className="text-gray-500">Data Fim: </span>
                        {formatarDataSemTimezone(treino.dataFim)}
                      </div>
                    </div>

                    {/* EXERCÍCIOS VINCULADOS */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                        EXERCÍCIOS ({treino.listaExercicios?.length || 0})
                      </span>
                      {treino.listaExercicios && treino.listaExercicios.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {treino.listaExercicios.map((ex, idx) => (
                            <div
                              key={ex.id || idx}
                              className="bg-[#121824] border border-gray-800/50 rounded-lg p-2 text-xs flex justify-between items-center"
                            >
                              <div>
                                <p className="font-bold text-gray-200">
                                  {ex.nome || ex.tipoExercicio?.nome || 'Exercício'}
                                </p>
                                <p className="text-[10px] text-gray-400 font-mono">
                                  {ex.series}x{ex.repeticoes} • {ex.carga}kg • {ex.descansoSegundos}s descanso
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-gray-600 italic">
                          Nenhum exercício vinculado a esta ficha.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FORMULÁRIO DE CADASTRAR NOVO TREINO */}
        <div>
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase">
              NOVO TREINO
            </h2>

            <form action={criarTreino} className="space-y-3">
              {/* NOME */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  NOME DO TREINO
                </label>
                <input
                  name="nomeTreino"
                  type="text"
                  required
                  placeholder="Ex: Treino A - Peito e Tríceps"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              {/* DATA DE CRIAÇÃO */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  DATA DE CRIAÇÃO
                </label>
                <input
                  name="dataCriacao"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              {/* DATA DE TÉRMINO / VALIDADE */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  DATA DE TÉRMINO / VALIDADE
                </label>
                <input
                  name="dataFim"
                  type="date"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  STATUS
                </label>
                <select
                  name="ativo"
                  defaultValue="true"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                >
                  <option value="true">ATIVO</option>
                  <option value="false">INATIVO</option>
                </select>
              </div>

              {/* VINCULAR EXERCÍCIOS */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  ASSOCIAR EXERCÍCIOS
                </label>
                <div className="space-y-2 border border-gray-800 bg-[#0b0e14] p-3 rounded-lg max-h-48 overflow-y-auto">
                  {exercicios.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">
                      Nenhum exercício cadastrado no sistema.
                    </p>
                  ) : (
                    exercicios.map((ex) => (
                      <label
                        key={ex.id}
                        className="flex items-center space-x-3 text-xs text-gray-300 p-1.5 rounded hover:bg-gray-800/40 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          name="exerciciosIds"
                          value={ex.id}
                          className="rounded border-gray-700 text-[#a3e635] focus:ring-0 bg-[#121824] accent-[#a3e635]"
                        />
                        <div className="flex-1">
                          <span className="font-bold text-white block">
                            {ex.nome || ex.tipoExercicio?.nome || `Exercício #${ex.id}`}
                          </span>
                          <span className="text-gray-400 font-mono text-[10px]">
                            {ex.series}x{ex.repeticoes} • {ex.carga}kg • {ex.descansoSegundos}s descanso
                          </span>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
              >
                Cadastrar Treino
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}