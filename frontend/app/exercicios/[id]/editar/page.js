'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getExercicioById, atualizarExercicio } from '@/app/actions/exercicios';
import { getTiposExercicios } from '@/app/actions/tiposExercicios';

export default function EditarExercicioPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [exercicio, setExercicio] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const [exData, tiposData] = await Promise.all([
        getExercicioById(id),
        getTiposExercicios().then((res) => res || []),
      ]);
      if (exData) setExercicio(exData);
      setTipos(tiposData);
      setCarregando(false);
    }
    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await atualizarExercicio(id, formData);
    if (res.success) {
      router.push('/exercicios');
    } else {
      alert(res.error || 'Erro ao atualizar o exercício.');
    }
  }

  if (carregando) {
    return (
      <div className="py-10 text-center text-gray-500 text-xs">
        Carregando dados do exercício...
      </div>
    );
  }

  if (!exercicio) {
    return (
      <div className="py-10 text-center text-rose-500 text-xs">
        Exercício não encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white uppercase tracking-wide">
          EDITAR EXERCÍCIO #{id}
        </h1>
        <Link
          href="/exercicios"
          className="text-xs text-gray-400 hover:text-white transition"
        >
          ← Voltar
        </Link>
      </div>

      <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-5 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TIPO DE EXERCÍCIO */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              TIPO DE EXERCÍCIO
            </label>
            <select
              name="tipoExercicioId"
              defaultValue={exercicio.tipoExercicio?.id || ''}
              required
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
            >
              <option value="" disabled>
                Selecione um tipo...
              </option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome} ({t.grupoMuscular})
                </option>
              ))}
            </select>
          </div>

          {/* SÉRIES E REPETIÇÕES */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                SÉRIES
              </label>
              <input
                name="series"
                type="number"
                min="1"
                required
                defaultValue={exercicio.series}
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
                defaultValue={exercicio.repeticoes}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

          {/* CARGA E DESCANSO */}
          <div className="grid grid-cols-2 gap-3">
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
                defaultValue={exercicio.carga}
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
                defaultValue={exercicio.descansoSegundos}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link
              href="/exercicios"
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