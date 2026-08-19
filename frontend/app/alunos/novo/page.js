'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CampoInput from '@/components/CampoInput';

export default function NovoAlunoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    matricula: '',
    dataMatricula: '',
    statusMatricula: 'ATIVO'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8081/alunos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Aluno cadastrado com sucesso!');
      router.push('/alunos');
    } else {
      alert('Erro ao cadastrar aluno.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Aluno</h1>
      
      <CampoInput label="Nome Completo" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" />
      <CampoInput label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" />
      <CampoInput label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
      <CampoInput label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" />
      <CampoInput label="Matrícula" name="matricula" value={formData.matricula} onChange={handleChange} placeholder="Matrícula" />
      <CampoInput label="Data de Matrícula" name="dataMatricula" type="date" value={formData.dataMatricula} onChange={handleChange} />
      
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select name="statusMatricula" value={formData.statusMatricula} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
          <option value="PENDENTE">Pendente</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Salvar Aluno
      </button>
    </form>
  );
}