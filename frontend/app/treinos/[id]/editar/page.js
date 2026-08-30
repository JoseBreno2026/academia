'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTreinoById, atualizarTreino } from '@/app/actions/treinos';
import { getExercicios } from '@/app/actions/exercicios';

export default function EditarTreinoPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [treino, setTreino] = useState(null);
  const [exercicios, setExercicios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const [treinoData, exerciciosData] = await Promise.all([
          getTreinoById(id),
          getExercicios(),
        ]);

        if (treinoData) setTreino(treinoData);
        if (Array.isArray(exerciciosData)) setExercicios(exerciciosData);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      } finally { 
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSalvando(true);
    const formData = new FormData(e.target);

    const res = await atualizarTreino(id, formData);
    if (res.success) {
      router.push('/treinos');
    } else {
      alert(res.error || 'Erro ao atualizar o treino.');
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-xs font-mono text-gray-400 animate-pulse">
          Carregando dados do treino...
        </p>
      </div>
    );
  }

  if (!treino) {
    return (
      <div className="bg-[#121824] border border-gray-800 rounded-xl p-6 text-center space-y-4">
        <p className="text-sm text-rose-400">Treino não encontrado.</p>
        <Link
          href="/treinos"
          className="inline-block text-xs font-bold text-gray-300 hover:text-white underline"
        >
          Voltar para Treinos
        </Link>
      </div>
    );
  }

  // Mapeia os IDs dos exercícios vinculados para marcar os checkboxes
  const exerciciosAtuaisIds = treino.listaExercicios
    ? treino.listaExercicios.map((e) => e.id)
    : [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-800/80">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            EDITAR TREINO #{id}
          </h1>
          <p className="text-sm text-gray-400">
            Atualize as especificações e os exercícios da ficha.
          </p>
        </div>
        <Link
          href="/treinos"
          className="text-xs font-bold text-gray-400 hover:text-white transition px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50"
        >
          ← Voltar
        </Link>
      </div>

      {/* FORMULÁRIO */}
      <div className="bg-[#121824] border border-gray-800/80 rounded-xl p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              NOME DO TREINO
            </label>
            <input
              name="nomeTreino"
              type="text"
              required
              defaultValue={treino.nomeTreino}
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                DATA DE TÉRMINO / VALIDADE
              </label>
              <input
                name="dataFim"
                type="date"
                defaultValue={treino.dataFim || ''}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                STATUS DO TREINO
              </label>
              <select
                name="ativo"
                defaultValue={treino.ativo ? 'true' : 'false'}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a3e635]"
              >
                <option value="true">ATIVO</option>
                <option value="false">INATIVO</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              EXERCÍCIOS VINCULADOS
            </label>
            <div className="space-y-2 border border-gray-800 bg-[#0b0e14] p-3 rounded-lg max-h-56 overflow-y-auto custom-scrollbar">
              {exercicios.length === 0 ? (
                <p className="text-xs text-gray-500 italic">
                  Nenhum exercício cadastrado no sistema.
                </p>
              ) : (
                exercicios.map((ex) => (
                  <label
                    key={ex.id}
                    className="flex items-center space-x-3 text-xs text-gray-300 p-2 rounded hover:bg-gray-800/40 cursor-pointer transition border border-transparent hover:border-gray-800"
                  >
                    <input
                      type="checkbox"
                      name="exerciciosIds"
                      value={ex.id}
                      defaultChecked={exerciciosAtuaisIds.includes(ex.id)}
                      className="rounded border-gray-700 text-[#a3e635] focus:ring-0 bg-[#121824] accent-[#a3e635]"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-white">
                        {ex.nome || ex.tipoExercicio?.nome || `Exercício #${ex.id}`}
                      </span>
                      <span className="text-gray-400 font-mono text-[11px] block">
                        {ex.series}x{ex.repeticoes} • {ex.carga}kg • {ex.descansoSegundos}s descanso
                      </span>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={salvando}
              className="flex-1 bg-[#a3e635] hover:bg-[#84cc16] text-black font-extrabold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#a3e635]/10 cursor-pointer disabled:opacity-50"
            >
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <Link
              href="/treinos"
              className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-lg text-xs uppercase tracking-wider transition"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}