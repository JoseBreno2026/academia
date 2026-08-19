'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import CampoInput from '@/components/CampoInput';

export default function EditarAlunoPage({ params }) {
  const { id } = use(params);
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

  useEffect(() => {
    fetch(`http://localhost:8081/alunos/id/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8081/alunos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Aluno atualizado com sucesso!');
      router.push('/alunos');
    } else {
      alert('Erro ao atualizar aluno.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Aluno #{id}</h1>
      
      <CampoInput label="Nome Completo" name="nome" value={formData.nome || ''} onChange={handleChange} />
      <CampoInput label="CPF" name="cpf" value={formData.cpf || ''} onChange={handleChange} />
      <CampoInput label="E-mail" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
      <CampoInput label="Telefone" name="telefone" value={formData.telefone || ''} onChange={handleChange} />
      <CampoInput label="Matrícula" name="matricula" value={formData.matricula || ''} onChange={handleChange} />
      <CampoInput label="Data de Matrícula" name="dataMatricula" type="date" value={formData.dataMatricula || ''} onChange={handleChange} />
      
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select name="statusMatricula" value={formData.statusMatricula || 'ATIVO'} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
          <option value="PENDENTE">Pendente</option>
        </select>
      </div>

      <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 w-full">
        Atualizar Aluno
      </button>
    </form>
  );
}