'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditarInstrutorPage({ params }) {
  const { id } = use(params);
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

  useEffect(() => {
    fetch(`http://localhost:8081/instrutores/id/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'salario' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8081/instrutores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Instrutor atualizado com sucesso!');
      router.push('/instrutores');
    } else {
      alert('Erro ao atualizar instrutor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Instrutor #{id}</h1>
      
      <input name="nome" value={formData.nome || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="cpf" value={formData.cpf || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="email" type="email" value={formData.email || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="telefone" value={formData.telefone || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="cref" value={formData.cref || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="especialidade" value={formData.especialidade || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="salario" type="number" step="0.01" value={formData.salario || 0} onChange={handleChange} required className="w-full border p-2 rounded" />

      <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700">
        Atualizar Instrutor
      </button>
    </form>
  );
}