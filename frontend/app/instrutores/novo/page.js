'use client';

import { useRouter } from 'next/navigation';
import { criarInstrutor } from '@/app/actions/instrutores';
import CampoInput from '@/components/CampoInput';

export default function NovoInstrutorPage() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await criarInstrutor(formData);
    if (res.success) {
      alert('Instrutor cadastrado com sucesso!');
      router.push('/instrutores');
    } else {
      alert('Erro ao cadastrar instrutor. Verifique o console do VS Code.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Instrutor</h1>
      
      <CampoInput label="Nome Completo" name="nome" placeholder="Nome Completo" />
      <CampoInput label="CPF" name="cpf" placeholder="CPF" />
      <CampoInput label="E-mail" name="email" type="email" placeholder="E-mail" />
      <CampoInput label="Telefone" name="telefone" placeholder="Telefone" />
      <CampoInput label="CREF" name="cref" placeholder="CREF" />
      <CampoInput label="Especialidade" name="especialidade" placeholder="Especialidade" />
      <CampoInput label="Salário" name="salario" type="number" placeholder="Salário" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Salvar Instrutor
      </button>
    </form>
  );
}