'use client';

import { useRouter } from 'next/navigation';
import { criarTipoExercicio } from '@/app/actions/tiposExercicios';
import CampoInput from '@/components/CampoInput';

export default function NovoTipoExercicioPage() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await criarTipoExercicio(formData);
    if (res.success) {
      alert('Tipo de Exercício cadastrado com sucesso!');
      router.push('/tipos-exercicios');
    } else {
      alert('Erro ao cadastrar tipo de exercício. Verifique o console do VS Code.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Tipo de Exercício</h1>

      <CampoInput label="Nome do Tipo de Exercicio (ex: Supino Reto)" name="nome" placeholder="Nome" />
      <CampoInput label="Grupo Muscular (ex: Peitoral)" name="grupoMuscular" placeholder="Grupo Muscular" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Salvar Tipo de Exercício
      </button>
    </form>
  );
}