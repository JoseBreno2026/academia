'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPagamentoPorId, atualizarPagamento } from '@/app/actions/pagamentos';

export default function EditarPagamentoPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [pagamento, setPagamento] = useState(null);

  useEffect(() => {
    getPagamentoPorId(id).then((data) => {
      setPagamento(data);
      setCarregando(false);
    });
  }, [id]);

  async function handleAction(formData) {
    setSalvando(true);
    const res = await atualizarPagamento(id, formData);
    setSalvando(false);

    if (res.success) {
      alert('Pagamento atualizado com sucesso!');
      router.push('/pagamentos');
    } else {
      alert(`Erro ao atualizar pagamento: ${res.error || 'Verifique os dados enviados.'}`);
    }
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-sm font-mono animate-pulse">Carregando dados do pagamento #{id}...</p>
      </div>
    );
  }

  if (!pagamento) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-[#121824] border border-red-500/30 rounded-xl text-center space-y-4">
        <p className="text-red-400 font-bold">Registro de pagamento não encontrado.</p>
        <Link href="/pagamentos" className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition">
          Voltar para a Lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            EDITAR PAGAMENTO #{id}
          </h1>
          <p className="text-sm text-gray-400">Atualização de status e valores financeiros.</p>
        </div>
        <Link 
          href="/pagamentos"
          className="px-3 py-1.5 bg-[#121824] border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg text-xs font-semibold transition"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-6 shadow-xl">
        <form action={handleAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                VALOR PAGO (R$)
              </label>
              <input
                name="valorPago"
                type="number"
                step="0.01"
                defaultValue={pagamento.valorPago || ''}
                required
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                STATUS
              </label>
              <select
                name="status"
                defaultValue={pagamento.status || 'PENDENTE'}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              >
                <option value="PAGO">PAGO</option>
                <option value="PENDENTE">PENDENTE</option>
                <option value="CANCELADO">CANCELADO</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                DATA DE VENCIMENTO
              </label>
              <input
                name="dataVencimento"
                type="date"
                defaultValue={pagamento.dataVencimento ? pagamento.dataVencimento.split('T')[0] : ''}
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
                defaultValue={pagamento.dataPagamento ? pagamento.dataPagamento.split('T')[0] : ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full mt-4 bg-[#a3e635] hover:bg-[#84cc16] disabled:bg-gray-700 text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
          >
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}