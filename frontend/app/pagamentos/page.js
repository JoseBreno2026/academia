import Link from 'next/link';
import BotaoExcluir from '@/components/BotaoExcluir';
import StatusBadge from '@/components/StatusBadge';
import { getPagamentos, criarPagamento } from '@/app/actions/pagamentos';

export default async function PagamentosPage() {
  const pagamentos = (await getPagamentos()) || [];

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            REGISTROS DE PAGAMENTO
          </h1>
          <p className="text-sm text-gray-400">
            Gerenciamento de mensalidades e lançamentos financeiros.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TABELA DE PAGAMENTOS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase mb-4">
              HISTÓRICO DE LANÇAMENTOS
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3 px-2">Valor</th>
                    <th className="pb-3 px-2">Vencimento</th>
                    <th className="pb-3 px-2">Data Pagamento</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50 text-xs">
                  {pagamentos.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500">
                        Nenhum pagamento registrado.
                      </td>
                    </tr>
                  ) : (
                    pagamentos.map((pag) => (
                      <tr key={pag.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-gray-500">#{pag.id}</td>
                        <td className="py-3 px-2 text-[#a3e635] font-mono font-bold">
                          R$ {Number(pag.valorPago || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-2 text-gray-300 font-mono">
                          {pag.dataVencimento ? new Date(pag.dataVencimento).toLocaleDateString('pt-BR') : '-'}
                        </td>
                        <td className="py-3 px-2 text-gray-300 font-mono">
                          {pag.dataPagamento ? new Date(pag.dataPagamento).toLocaleDateString('pt-BR') : '-'}
                        </td>
                        <td className="py-3 px-2">
                          <StatusBadge status={pag.status} />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/pagamentos/${pag.id}/editar`}
                              className="p-1 hover:text-[#a3e635] text-gray-400 transition"
                              title="Editar"
                            >
                              ✏️
                            </Link>
                            <BotaoExcluir endpoint="pagamentos" id={pag.id} />
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

        {/* FORMULÁRIO DE CADASTRO */}
        <div>
          <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-gray-200 tracking-wider uppercase">
              NOVO PAGAMENTO
            </h2>

            <form action={criarPagamento} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  VALOR PAGO (R$)
                </label>
                <input
                  name="valorPago"
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  DATA DE VENCIMENTO
                </label>
                <input
                  name="dataVencimento"
                  type="date"
                  required
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  DATA DO PAGAMENTO
                </label>
                <input
                  name="dataPagamento"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  STATUS
                </label>
                <select
                  name="status"
                  defaultValue="PAGO"
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
                >
                  <option value="PAGO">PAGO</option>
                  <option value="PENDENTE">PENDENTE</option>
                  <option value="CANCELADO">CANCELADO</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
              >
                Salvar Pagamento
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}