'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoInstrutorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cref: '',
    especialidade: '',
    salario: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'salario' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8081/instrutores/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Instrutor cadastrado com sucesso!');
      router.push('/instrutores');
    } else {
      alert('Erro ao cadastrar instrutor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Instrutor</h1>
      
      <input name="nome" placeholder="Nome Completo" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="cpf" placeholder="CPF" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="telefone" placeholder="Telefone" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="cref" placeholder="CREF" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="especialidade" placeholder="Especialidade" onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="salario" type="number" step="0.01" placeholder="Salário" onChange={handleChange} required className="w-full border p-2 rounded" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Salvar Instrutor
      </button>
    </form>
  );
}