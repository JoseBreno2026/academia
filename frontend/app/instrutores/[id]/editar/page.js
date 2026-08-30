'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getInstrutorById, atualizarInstrutor } from '@/app/actions/instrutores';

export default function EditarInstrutorPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [instrutor, setInstrutor] = useState(null);

  useEffect(() => {
    getInstrutorById(id).then((data) => {
      setInstrutor(data);
      setCarregando(false);
    });
  }, [id]);

  async function handleAction(formData) {
    setSalvando(true);
    const res = await atualizarInstrutor(id, formData);
    setSalvando(false);

    if (res.success) {
      alert('Instrutor atualizado com sucesso!');
      router.push('/instrutores');
    } else {
      alert(`Erro ao atualizar instrutor: ${res.error || 'Verifique os dados enviados.'}`);
    }
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-400 text-sm font-mono animate-pulse">Carregando dados do instrutor #{id}...</p>
      </div>
    );
  }

  if (!instrutor) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-[#121824] border border-red-500/30 rounded-xl text-center space-y-4">
        <p className="text-red-400 font-bold">Instrutor não encontrado.</p>
        <Link href="/instrutores" className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition">
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
            EDITAR INSTRUTOR #{id}
          </h1>
          <p className="text-sm text-gray-400">Atualize as informações do instrutor.</p>
        </div>
        <Link 
          href="/instrutores"
          className="px-3 py-1.5 bg-[#121824] border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg text-xs font-semibold transition"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-6 shadow-xl">
        <form action={handleAction} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              NOME COMPLETO
            </label>
            <input
              name="nome"
              type="text"
              defaultValue={instrutor.nome || ''}
              required
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                CPF
              </label>
              <input
                name="cpf"
                type="text"
                defaultValue={instrutor.cpf || ''}
                required
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                CREF
              </label>
              <input
                name="cref"
                type="text"
                defaultValue={instrutor.cref || ''}
                required
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                E-MAIL
              </label>
              <input
                name="email"
                type="email"
                defaultValue={instrutor.email || ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                TELEFONE
              </label>
              <input
                name="telefone"
                type="text"
                defaultValue={instrutor.telefone || ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                ESPECIALIDADE
              </label>
              <input
                name="especialidade"
                type="text"
                defaultValue={instrutor.especialidade || ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                SALÁRIO (R$)
              </label>
              <input
                name="salario"
                type="number"
                step="0.01"
                defaultValue={instrutor.salario || ''}
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