'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getTipoExercicioById, atualizarTipoExercicio } from '@/app/actions/tiposExercicios';
import CampoInput from '@/components/CampoInput';

export default function EditarTipoExercicioPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [tipo, setTipo] = useState(null);

  useEffect(() => {
    async function carregar() {
      const data = await getTipoExercicioById(id);
      if (data) setTipo(data);
    }
    carregar();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await atualizarTipoExercicio(id, formData);
    if (res.success) {
      alert('Tipo de exercício atualizado com sucesso!');
      router.push('/tipos-exercicios');
    } else {
      alert(res.error || 'Erro ao atualizar o tipo de exercício.');
    }
  }

  if (!tipo) return <p className="p-4">Carregando dados...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Tipo de Exercício #{id}</h1>

      <CampoInput label="Nome" name="nome" defaultValue={tipo.nome} placeholder="Nome" />
      <CampoInput label="Grupo Muscular" name="grupoMuscular" defaultValue={tipo.grupoMuscular} placeholder="Grupo Muscular" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Salvar Alterações
      </button>
    </form>
  );
}