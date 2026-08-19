'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      
      <input name="nome" placeholder="Nome Completo" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="cpf" placeholder="CPF" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="telefone" placeholder="Telefone" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="matricula" placeholder="Matrícula" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="dataMatricula" type="date" onChange={handleChange} required className="w-full border p-2 rounded" />
      
      <select name="statusMatricula" onChange={handleChange} className="w-full border p-2 rounded">
        <option value="ATIVO">Ativo</option>
        <option value="INATIVO">Inativo</option>
        <option value="PENDENTE">Pendente</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Salvar Aluno
      </button>
    </form>
  );
}