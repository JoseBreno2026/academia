import { redirect } from 'next/navigation';
import { criarPlano } from '@/app/actions/planos';
import CampoInput from '@/components/CampoInput';

export default function NovoPlanoPage() {
  async function handleSubmit(formData) {
    'use server';
    const res = await criarPlano(formData);
    if (res.success) redirect('/planos');
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Plano</h1>
      <form action={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <CampoInput label="Nome do Plano" name="nomePlano" required />
        <CampoInput label="Preço (R$)" name="preco" type="number" step="0.01" required />
        <CampoInput label="Modalidade" name="modalidade" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}