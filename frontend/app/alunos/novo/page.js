'use client';

import { useRouter } from 'next/navigation';
import { criarAluno } from '@/app/actions/alunos';
import CampoInput from '@/components/CampoInput';

export default function NovoAlunoPage() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await criarAluno(formData);
    if (res.success) {
      alert('Aluno cadastrado com sucesso!');
      router.push('/alunos');
    } else {
      alert('Erro ao cadastrar aluno. Verifique o console ou o backend.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow border border-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Cadastrar Novo Aluno</h1>
      
      <CampoInput label="Nome Completo" name="nome" placeholder="Nome Completo" />
      <CampoInput label="CPF" name="cpf" placeholder="CPF" />
      <CampoInput label="E-mail" name="email" type="email" placeholder="E-mail" />
      <CampoInput label="Telefone" name="telefone" placeholder="Telefone" />
      <CampoInput label="Matrícula" name="matricula" placeholder="Matrícula" />
      <CampoInput label="Data de Matrícula" name="dataMatricula" type="date" />
      
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select name="statusMatricula" defaultValue="ATIVO" className="w-full border border-gray-300 p-2 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
          <option value="PENDENTE">Pendente</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full font-medium transition">
        Salvar Aluno
      </button>
    </form>
  );
}