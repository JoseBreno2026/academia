'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CampoInput from '@/components/CampoInput';

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
      
      <CampoInput label="Nome Completo" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" />
      <CampoInput label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" />
      <CampoInput label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
      <CampoInput label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" />
      <CampoInput label="CREF" name="cref" value={formData.cref} onChange={handleChange} placeholder="CREF" />
      <CampoInput label="Especialidade" name="especialidade" value={formData.especialidade} onChange={handleChange} placeholder="Especialidade" />
      <CampoInput label="Salário" name="salario" type="number" value={formData.salario} onChange={handleChange} placeholder="Salário" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Salvar Instrutor
      </button>
    </form>
  );
}