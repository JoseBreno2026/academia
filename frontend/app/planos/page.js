import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import { getPlanos, criarPlano } from '@/app/actions/planos';

export default async function PlanosPage() {
  const planos = await getPlanos();

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            PLANOS
          </h1>
          <p className="text-sm text-gray-400">
            Gerenciamento de modalidades e tabelas de preços.
          </p>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabela de Planos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase mb-4">
              PLANOS DISPONÍVEIS
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3 px-2">Nome do Plano</th>
                    <th className="pb-3 px-2">Preço</th>
                    <th className="pb-3 px-2">Modalidade</th>
                    <th className="pb-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50 text-xs">
                  {planos.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        Nenhum plano cadastrado.
                      </td>
                    </tr>
                  ) : (
                    planos.map((plano) => (
                      <tr key={plano.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-gray-400">{plano.id}</td>
                        <td className="py-3 px-2 font-bold text-white">{plano.nomePlano}</td>
                        <td className="py-3 px-2 text-[#a3e635] font-mono font-bold">
                          R$ {Number(plano.preco || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-2 text-gray-300 font-medium">
                          <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-300">
                            {plano.modalidade || 'Geral'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/planos/${plano.id}/editar`}
                              className="p-1 hover:text-[#a3e635] text-gray-400 transition"
                              title="Editar"
                            >
                              ✏️
                            </Link>
                            <BotaoExcluir endpoint="planos" id={plano.id} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Formulário de Cadastro */}
        <div className="space-y-6">
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase">
              CRIAR NOVO PLANO
            </h2>

            <form action={criarPlano} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  NOME DO PLANO
                </label>
                <input
                  name="nomePlano"
                  type="text"
                  required
                  placeholder="Ex: Mensal VIP"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  PREÇO (R$)
                </label>
                <input
                  name="preco"
                  type="number"
                  step="0.01"
                  required
                  placeholder="99.90"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  MODALIDADE
                </label>
                <input
                  name="modalidade"
                  type="text"
                  required
                  placeholder="Ex: Musculação / Pilates"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
              >
                Cadastrar Plano
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}