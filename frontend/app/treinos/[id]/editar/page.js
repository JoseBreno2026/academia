'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getTreinoById, atualizarTreino } from '@/app/actions/treinos';
import { getInstrutores } from '@/app/actions/instrutores';
import { getExercicios } from '@/app/actions/exercicios';
import CampoInput from '@/components/CampoInput';

export default function EditarTreinoPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [treino, setTreino] = useState(null);
  const [instrutores, setInstrutores] = useState([]);
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    async function carregar() {
      const [treinoData, instrutoresData, exerciciosData] = await Promise.all([
        getTreinoById(id),
        getInstrutores(),
        getExercicios(),
      ]);
      if (treinoData) setTreino(treinoData);
      setInstrutores(instrutoresData);
      setExercicios(exerciciosData);
    }
    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await atualizarTreino(id, formData);
    if (res.success) {
      alert('Treino atualizado com sucesso!');
      router.push('/treinos');
    } else {
      alert(res.error || 'Erro ao atualizar o treino.');
    }
  }

  if (!treino) return <p className="p-4">Carregando dados...</p>;

  // Mapeia os IDs dos exercícios vinculados para marcar os checkboxes
  const exerciciosAtuaisIds = treino.listaExercicios ? treino.listaExercicios.map((e) => e.id) : [];

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Treino #{id}</h1>

      <CampoInput label="Nome do Treino" name="nomeTreino" defaultValue={treino.nomeTreino} />
      <CampoInput label="Data de Término" name="dataFim" type="date" defaultValue={treino.dataFim || ''} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instrutor Responsável</label>
        <select
          name="instrutorId"
          defaultValue={treino.instrutorId || ''}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o Instrutor...</option>
          {instrutores.map((ins) => (
            <option key={ins.id} value={ins.id}>
              {ins.nome} ({ins.especialidade || 'Instrutor'})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="ativo"
          defaultValue={treino.ativo ? 'true' : 'false'}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Exercícios do Treino:</label>
        <div className="space-y-2 border p-3 rounded max-h-48 overflow-y-auto bg-gray-50">
          {exercicios.map((ex) => (
            <label key={ex.id} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="exerciciosIds"
                value={ex.id}
                defaultChecked={exerciciosAtuaisIds.includes(ex.id)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>
                <strong>{ex.nome || `Exercício #${ex.id}`}</strong> — {ex.series}x{ex.repeticoes} ({ex.carga}kg)
              </span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Salvar Alterações
      </button>
    </form>
  );
}