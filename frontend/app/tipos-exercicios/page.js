import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import { getTiposExercicios, criarTipoExercicio } from '@/app/actions/tiposExercicios';

export default async function TiposExerciciosPage() {
  const tipos = await getTiposExercicios().then((res) => res || []);

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            TIPOS DE EXERCÍCIOS
          </h1>
          <p className="text-sm text-gray-400">
            Cadastre os tipos base de exercícios e seus respectivos grupos musculares.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LISTA DE TIPOS CADASTRADOS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase mb-4">
              TIPOS CADASTRADOS
            </h2>

            {tipos.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-xs">
                Nenhum tipo de exercício cadastrado até o momento.
              </div>
            ) : (
              <div className="space-y-3">
                {tipos.map((t) => (
                  <div
                    key={t.id}
                    className="border border-gray-800/80 bg-[#0b0e14] rounded-xl p-4 transition hover:border-gray-700 flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-500">#{t.id}</span>
                        <h3 className="text-sm font-extrabold text-white tracking-wide">
                          {t.nome}
                        </h3>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        <span className="text-gray-500">Grupo Muscular: </span>
                        <span className="text-emerald-400 font-bold">{t.grupoMuscular}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tipos-exercicios/${t.id}/editar`}
                        className="p-1 hover:text-[#a3e635] text-gray-400 transition text-xs"
                        title="Editar"
                      >
                        ✏️
                      </Link>
                      <BotaoExcluir endpoint="tipos-exercicios" id={t.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FORMULÁRIO NOVO TIPO */}
        <div>
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase">
              NOVO TIPO DE EXERCÍCIO
            </h2>

            <form action={criarTipoExercicio} className="space-y-3">
              {/* NOME */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  NOME DO EXERCÍCIO
                </label>
                <input
                  name="nome"
                  type="text"
                  required
                  placeholder="Ex: Supino Reto, Agachamento..."
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              {/* GRUPO MUSCULAR */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  GRUPO MUSCULAR
                </label>
                <input
                  name="grupoMuscular"
                  type="text"
                  required
                  placeholder="Ex: Peito, Quadríceps, Costas..."
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
              >
                Cadastrar Tipo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}