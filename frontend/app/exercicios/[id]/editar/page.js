'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getExercicioById, atualizarExercicio } from '@/app/actions/exercicios';
import { getTiposExercicios } from '@/app/actions/tiposExercicios';
import CampoInput from '@/components/CampoInput';

export default function EditarExercicioPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [exercicio, setExercicio] = useState(null);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const [exData, tiposData] = await Promise.all([
        getExercicioById(id),
        getTiposExercicios(),
      ]);
      if (exData) setExercicio(exData);
      setTipos(tiposData);
    }
    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await atualizarExercicio(id, formData);
    if (res.success) {
      alert('Exercício atualizado com sucesso!');
      router.push('/exercicios');
    } else {
      alert(res.error || 'Erro ao atualizar o exercício.');
    }
  }

  if (!exercicio) return <p className="p-4">Carregando dados...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Exercício #{id}</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Exercício</label>
        <select
          name="tipoExercicioId"
          defaultValue={exercicio.tipoExercicioId || ''}
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

      <CampoInput label="Séries" name="series" type="number" defaultValue={exercicio.series} />
      <CampoInput label="Repetições" name="repeticoes" type="number" defaultValue={exercicio.repeticoes} />
      <CampoInput label="Carga (kg)" name="carga" type="number" step="0.5" defaultValue={exercicio.carga} />
      <CampoInput label="Descanso (segundos)" name="descansoSegundos" type="number" defaultValue={exercicio.descansoSegundos} />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Salvar Alterações
      </button>
    </form>
  );
}