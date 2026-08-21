'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getInstrutorById, atualizarInstrutor } from '@/app/actions/instrutores';
import CampoInput from '@/components/CampoInput';

export default function EditarInstrutorPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [instrutor, setInstrutor] = useState(null);

  useEffect(() => {
    getInstrutorById(id).then((data) => {
      setInstrutor(data);
      setCarregando(false);
    });
  }, [id]);

  async function handleAction(formData) {
    const res = await atualizarInstrutor(id, formData);
    if (res.success) {
      alert('Instrutor atualizado com sucesso!');
      router.push('/instrutores');
    } else {
      alert('Erro ao atualizar instrutor.');
    }
  }

  if (carregando) return <p>Carregando dados do instrutor...</p>;
  if (!instrutor) return <p className="text-red-500">Instrutor não encontrado.</p>;

  return (
    <form action={handleAction} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Instrutor #{id}</h1>
      
      <CampoInput label="Nome Completo" name="nome" defaultValue={instrutor.nome} />
      <CampoInput label="CPF" name="cpf" defaultValue={instrutor.cpf} />
      <CampoInput label="E-mail" name="email" type="email" defaultValue={instrutor.email} />
      <CampoInput label="Telefone" name="telefone" defaultValue={instrutor.telefone} />
      <CampoInput label="CREF" name="cref" defaultValue={instrutor.cref} />
      <CampoInput label="Especialidade" name="especialidade" defaultValue={instrutor.especialidade} />
      <CampoInput label="Salário" name="salario" type="number" defaultValue={instrutor.salario} />

      <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 w-full">
        Atualizar Instrutor
      </button>
    </form>
  );
}