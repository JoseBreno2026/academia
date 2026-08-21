'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAlunoById, atualizarAluno } from '@/app/actions/alunos';
import CampoInput from '@/components/CampoInput';

export default function EditarAlunoPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    getAlunoById(id).then((data) => {
      setAluno(data);
      setCarregando(false);
    });
  }, [id]);

  async function handleAction(formData) {
    const res = await atualizarAluno(id, formData);
    if (res.success) {
      alert('Aluno atualizado com sucesso!');
      router.push('/alunos');
    } else {
      alert('Erro ao atualizar aluno.');
    }
  }

  if (carregando) return <p>Carregando dados do aluno...</p>;
  if (!aluno) return <p className="text-red-500">Aluno não encontrado.</p>;

  return (
    <form action={handleAction} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Aluno #{id}</h1>
      
      <CampoInput label="Nome Completo" name="nome" defaultValue={aluno.nome} />
      <CampoInput label="CPF" name="cpf" defaultValue={aluno.cpf} />
      <CampoInput label="E-mail" name="email" type="email" defaultValue={aluno.email} />
      <CampoInput label="Telefone" name="telefone" defaultValue={aluno.telefone} />
      <CampoInput label="Matrícula" name="matricula" defaultValue={aluno.matricula} />
      <CampoInput label="Data de Matrícula" name="dataMatricula" type="date" defaultValue={aluno.dataMatricula} />
      
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select name="statusMatricula" defaultValue={aluno.statusMatricula} className="w-full border p-2 rounded">
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
          <option value="PENDENTE">Pendente</option>
        </select>
      </div>

      <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 w-full">
        Salvar Alterações
      </button>
    </form>
  );
}