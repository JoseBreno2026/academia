'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { criarTreino } from '@/app/actions/treinos';
import { getInstrutores } from '@/app/actions/instrutores';
import { getExercicios } from '@/app/actions/exercicios';
import CampoInput from '@/components/CampoInput';

export default function NovoTreinoPage() {
  const router = useRouter();
  const [instrutores, setInstrutores] = useState([]);
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const [instrutoresData, exerciciosData] = await Promise.all([
        getInstrutores(),
        getExercicios(),
      ]);
      setInstrutores(instrutoresData);
      setExercicios(exerciciosData);
    }
    carregarDados();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await criarTreino(formData);
    if (res.success) {
      alert('Treino cadastrado com sucesso!');
      router.push('/treinos');
    } else {
      alert('Erro ao cadastrar treino. Verifique o console do VS Code.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Treino</h1>

      <CampoInput label="Nome do Treino (ex: Treino A - Peito e Tríceps)" name="nomeTreino" placeholder="Nome" />
      
      <CampoInput label="Data de Término" name="dataFim" type="date" />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instrutor Responsável</label>
        <select
          name="instrutorId"
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
          defaultValue="true"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Selecione os Exercícios do Treino:</label>
        <div className="space-y-2 border p-3 rounded max-h-48 overflow-y-auto bg-gray-50">
          {exercicios.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum exercício cadastrado ainda.</p>
          ) : (
            exercicios.map((ex) => (
              <label key={ex.id} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="exerciciosIds"
                  value={ex.id}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>
                  <strong>{ex.nome || `Exercício #${ex.id}`}</strong> — {ex.series}x{ex.repeticoes} ({ex.carga}kg)
                </span>
              </label>
            ))
          )}
        </div>
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Salvar Treino
      </button>
    </form>
  );
}