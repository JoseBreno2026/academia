'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { criarExercicio } from '@/app/actions/exercicios';
import { getTiposExercicios } from '@/app/actions/tiposExercicios';
import CampoInput from '@/components/CampoInput';

export default function NovoExercicioPage() {
  const router = useRouter();
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    async function carregarTipos() {
      const data = await getTiposExercicios();
      setTipos(data);
    }
    carregarTipos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await criarExercicio(formData);
    if (res.success) {
      alert('Exercício cadastrado com sucesso!');
      router.push('/exercicios');
    } else {
      alert('Erro ao cadastrar exercício. Verifique o console do VS Code.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Exercício</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Exercício</label>
        <select
          name="tipoExercicioId"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um Tipo...</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome} ({t.grupoMuscular})
            </option>
          ))}
        </select>
      </div>

      <CampoInput label="Séries" name="series" type="number" placeholder="Ex: 4" />
      <CampoInput label="Repetições" name="repeticoes" type="number" placeholder="Ex: 12" />
      <CampoInput label="Carga (kg)" name="carga" type="number" step="0.5" placeholder="Ex: 20.5" />
      <CampoInput label="Descanso (segundos)" name="descansoSegundos" type="number" placeholder="Ex: 60" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Salvar Exercício
      </button>
    </form>
  );
}