'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTipoExercicioById, atualizarTipoExercicio } from '@/app/actions/tiposExercicios';

export default function EditarTipoExercicioPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [tipo, setTipo] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const data = await getTipoExercicioById(id);
      if (data) setTipo(data);
      setCarregando(false);
    }
    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await atualizarTipoExercicio(id, formData);
    if (res.success) {
      router.push('/tipos-exercicios');
    } else {
      alert(res.error || 'Erro ao atualizar o tipo de exercício.');
    }
  }

  if (carregando) {
    return (
      <div className="py-10 text-center text-gray-500 text-xs">
        Carregando dados do tipo de exercício...
      </div>
    );
  }

  if (!tipo) {
    return (
      <div className="py-10 text-center text-rose-500 text-xs">
        Tipo de exercício não encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white uppercase tracking-wide">
          EDITAR TIPO #{id}
        </h1>
        <Link
          href="/tipos-exercicios"
          className="text-xs text-gray-400 hover:text-white transition"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NOME */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              NOME DO EXERCÍCIO
            </label>
            <input
              name="nome"
              type="text"
              required
              defaultValue={tipo.nome}
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
              defaultValue={tipo.grupoMuscular}
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link
              href="/tipos-exercicios"
              className="w-1/2 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="w-1/2 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}