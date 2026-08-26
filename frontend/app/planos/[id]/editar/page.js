'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPlanoPorId, atualizarPlano } from '@/app/actions/planos';

export default function EditarPlanoPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [plano, setPlano] = useState(null);

  useEffect(() => {
    getPlanoPorId(id).then((data) => {
      setPlano(data);
      setCarregando(false);
    });
  }, [id]);

  async function handleAction(formData) {
    setSalvando(true);
    const res = await atualizarPlano(id, formData);
    setSalvando(false);

    if (res.success) {
      alert('Plano atualizado com sucesso!');
      router.push('/planos');
    } else {
      alert(`Erro ao atualizar plano: ${res.error || 'Verifique os dados enviados.'}`);
    }
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-sm font-mono animate-pulse">Carregando dados do plano #{id}...</p>
      </div>
    );
  }

  if (!plano) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-[#121824] border border-red-500/30 rounded-xl text-center space-y-4">
        <p className="text-red-400 font-bold">Plano não encontrado.</p>
        <Link href="/planos" className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition">
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
            EDITAR PLANO #{id}
          </h1>
          <p className="text-sm text-gray-400">Atualize os valores e especificações do plano.</p>
        </div>
        <Link 
          href="/planos"
          className="px-3 py-1.5 bg-[#121824] border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg text-xs font-semibold transition"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-6 shadow-xl">
        <form action={handleAction} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              NOME DO PLANO
            </label>
            <input
              name="nomePlano"
              type="text"
              defaultValue={plano.nomePlano || ''}
              required
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                PREÇO (R$)
              </label>
              <input
                name="preco"
                type="number"
                step="0.01"
                defaultValue={plano.preco || ''}
                required
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
                defaultValue={plano.modalidade || ''}
                required
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